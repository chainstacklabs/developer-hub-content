import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, Signer } from "hardhat";
import {
    Coordinate,
    generateShipShotProof,
    Ship,
    ShipShotProof,
    signCoordinate,
    signShipCoordinates,
} from "../utils/game";

// Layout:
// Test Gameplay - Game Start
// Test Gameplay - Turn Over
// Test Gameplay - Turn Ongoing
// Test Gameplay - Game Over

describe("Battleship", function() {
    let ownerShipCoords: Array<Ship> = [
        [
            { x: 1, y: 2 },
            { x: 1, y: 3 },
            { x: 1, y: 4 },
        ],
        [
            { x: 2, y: 2 },
            { x: 2, y: 3 },
            { x: 2, y: 4 },
            { x: 2, y: 5 },
        ],
        [
            { x: 10, y: 2 },
            { x: 10, y: 3 },
            { x: 10, y: 4 },
        ],
    ];
    let otherAccountShipCoords: Array<Ship> = [
        [
            { x: 11, y: 2 },
            { x: 11, y: 3 },
            { x: 11, y: 4 },
            { x: 11, y: 5 },
        ],
        [
            { x: 12, y: 3 },
            { x: 12, y: 4 },
            { x: 12, y: 5 },
        ],
        [
            { x: 20, y: 2 },
            { x: 20, y: 3 },
            { x: 20, y: 4 },
        ],
    ];

    let gameOverShots = [
        [
            { x: 0, y: 2 },
            { x: 1, y: 2 },
        ],
        [
            { x: 0, y: 3 },
            { x: 1, y: 3 },
        ],
        [
            { x: 0, y: 4 },
            { x: 1, y: 4 },
        ],
        [
            { x: 0, y: 2 },
            { x: 2, y: 2 },
        ],
        [
            { x: 0, y: 3 },
            { x: 2, y: 3 },
        ],
        [
            { x: 0, y: 4 },
            { x: 2, y: 4 },
        ],
        [
            { x: 0, y: 5 },
            { x: 2, y: 5 },
        ],
        [
            { x: 20, y: 2 },
            { x: 10, y: 2 },
        ],
        [
            { x: 20, y: 3 },
            { x: 10, y: 3 },
        ],
        [
            { x: 20, y: 4 },
            { x: 10, y: 4 },
        ],
    ];

    let gameOverDrawShots = [
        [
            { x: 11, y: 2 },
            { x: 1, y: 2 },
        ],
        [
            { x: 11, y: 3 },
            { x: 1, y: 3 },
        ],
        [
            { x: 11, y: 4 },
            { x: 1, y: 4 },
        ],
        [
            { x: 11, y: 5 },
            { x: 2, y: 2 },
        ],
        [
            { x: 12, y: 3 },
            { x: 2, y: 3 },
        ],
        [
            { x: 12, y: 4 },
            { x: 2, y: 4 },
        ],
        [
            { x: 12, y: 5 },
            { x: 2, y: 5 },
        ],
        [
            { x: 20, y: 2 },
            { x: 10, y: 2 },
        ],
        [
            { x: 20, y: 3 },
            { x: 10, y: 3 },
        ],
        [
            { x: 20, y: 4 },
            { x: 10, y: 4 },
        ],
    ];

    async function deployBattleShipGameWithGameStart() {
        const [owner, otherAccount, otherAccount2] = await ethers.getSigners();
        let ownerShips = await signShipCoordinates(ownerShipCoords, owner);
        ownerShips = ownerShips.flat();
        let otherAccountShips = await signShipCoordinates(
            otherAccountShipCoords,
            otherAccount
        );
        otherAccountShips = otherAccountShips.flat();
        const Battleship = await ethers.getContractFactory("BattleShipGame");
        const battleship = await Battleship.deploy([
            owner.address,
            otherAccount.address,
        ]);
        return {
            battleship,
            ownerShips,
            otherAccountShips,
            owner,
            otherAccount,
            otherAccount2,
        };
    }

    // Game In Progress - Turn In Progress
    // Only one player has played
    async function deployBattleShipGameWithTurnInProgress() {
        // Player 1 has taken a shot, what will Player 2 do?
        const ONE_GWEI = 1_000_000_000;
        const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

        const Battleship = await ethers.getContractFactory("BattleShipGame");
        const battleship = await Battleship.deploy([
            owner.address,
            otherAccount.address,
        ]);

        let ownerShot: Coordinate = {
            x: 20,
            y: 2,
        };
        let otherAccountShot: Coordinate = {
            x: 1,
            y: 2,
        };
        let ownerShips = await signShipCoordinates(ownerShipCoords, owner);
        ownerShips = ownerShips.flat();
        let otherAccountShips = await signShipCoordinates(
            otherAccountShipCoords,
            otherAccount
        );
        otherAccountShips = otherAccountShips.flat();
        // Join Game
        await battleship.joinGame(ownerShips);
        await battleship.connect(otherAccount).joinGame(otherAccountShips);

        // Player1, Fire at will!
        await battleship.takeAShot(ownerShot);

        return {
            battleship,
            ownerShips,
            otherAccountShips,
            ownerShot,
            otherAccountShot,
            owner,
            otherAccount,
            otherAccount2,
        };
    }

    async function deployBattleShipGameWithTurnOver() {
        const {
            battleship,
            owner,
            otherAccount,
            ownerShips,
            ownerShot,
            otherAccountShips,
            otherAccountShot,
        } = await deployBattleShipGameWithTurnInProgress();
        // Player2, Fire at will!
        await battleship.connect(otherAccount).takeAShot(otherAccountShot);

        return {
            battleship,
            ownerShips,
            otherAccountShips,
            ownerShot,
            otherAccountShot,
            owner,
            otherAccount,
        };
    }

    async function deployBattleShipGameWithGameOver() {
        const [owner, otherAccount, otherAccount2] = await ethers.getSigners();
        let ownerShips = await signShipCoordinates(ownerShipCoords, owner);
        ownerShips = ownerShips.flat();
        let otherAccountShips = await signShipCoordinates(
            otherAccountShipCoords,
            otherAccount
        );
        otherAccountShips = otherAccountShips.flat();
        const Battleship = await ethers.getContractFactory("BattleShipGame");
        const battleship = await Battleship.deploy([
            owner.address,
            otherAccount.address,
        ]);

        let ownerShot: Coordinate = {
            x: 20,
            y: 20,
        };
        let otherAccountShot: Coordinate = {
            x: 1,
            y: 2,
        };

        // Join Game
        await battleship.joinGame(ownerShips);
        await battleship.connect(otherAccount).joinGame(otherAccountShips);

        await playTurns(
            gameOverShots,
            [owner, otherAccount],
            battleship
        );

        return {
            battleship,
            ownerShips,
            otherAccountShips,
            ownerShot,
            otherAccountShot,
            owner,
            otherAccount,
            otherAccount2,
        };
    }

    describe("Game Start", function() {
        it("Should set the right owner", async function() {
            const { battleship, owner } = await loadFixture(
                deployBattleShipGameWithGameStart
            );
            expect(await battleship.owner()).to.equal(owner.address);
        });
        it("Should prevent players from taking shots", async function() {
            const { battleship, owner, ownerShips } = await loadFixture(
                deployBattleShipGameWithGameStart
            );
            let ownerShot: Coordinate = {
                x: 20,
                y: 20,
            };
            await expect(battleship.takeAShot(ownerShot)).to.be.revertedWith(
                "Game hasn't started"
            );
        });
        it("Should prevent players from reporting hits", async function() {
            const { battleship, otherAccount, owner, ownerShips, ownerShot } =
                await loadFixture(deployBattleShipGameWithGameStart);
            let { flatSig } = await signCoordinate(ownerShipCoords[0][0], owner);
            let report: Array<ShipShotProof> = [
                {
                    signature: flatSig,
                    shotBy: otherAccount.address,
                },
            ];
            await expect(battleship.reportHits(report)).to.be.revertedWith(
                "Game hasn't started"
            );
        });
        it("Should prevent players from ending turn", async function() {
            const { battleship, otherAccount, owner, ownerShips, ownerShot } =
                await loadFixture(deployBattleShipGameWithGameStart);
            await expect(battleship.endTurn()).to.be.reverted;
        });
        describe("Join Game", function() {
            it("Should allow players can call joinGame", async function() {
                const {
                    battleship,
                    owner,
                    ownerShips,
                    otherAccount,
                    otherAccountShips,
                } = await loadFixture(deployBattleShipGameWithGameStart);
                await expect(battleship.joinGame(ownerShips)).to.be.ok;

                // Players can't call joinGame twice
                await expect(battleship.joinGame(ownerShips)).to.be.revertedWith(
                    "Player has already placed ships"
                );
            });
            it("Should ensure players add the right number of ship pieces", async function() {
                const {
                    battleship,
                    owner,
                    ownerShips,
                    otherAccount,
                    otherAccountShips,
                } = await loadFixture(deployBattleShipGameWithGameStart);
                let invalidShips = ownerShips.slice(0, 2);
                await expect(battleship.joinGame(invalidShips)).to.be.revertedWith(
                    "Number of ship pieces does not match the expected value"
                );
            });
            it("Should ensure unknown address can't place ships", async function() {
                const {
                    otherAccount2,
                    battleship,
                    owner,
                    ownerShips,
                    otherAccount,
                    otherAccountShips,
                } = await loadFixture(deployBattleShipGameWithGameStart);
                await expect(
                    battleship.connect(otherAccount2).joinGame(ownerShips)
                ).to.be.revertedWith("Address is not a part of this game");
            });
            it("Should ensure players can't place two ship pieces on the same tile", async function() {
                const {
                    battleship,
                    owner,
                    ownerShips,
                    otherAccount,
                    otherAccountShips,
                } = await loadFixture(deployBattleShipGameWithGameStart);
                let invalidShips = ownerShips;
                // Duplicate ship piece
                invalidShips[0] = invalidShips[1];

                await expect(battleship.joinGame(invalidShips)).to.be.revertedWith(
                    "User has already placed a ship on this tile."
                );
            });
        });
        describe("Players State", function() {
            it("Should set the right player addresses", async function() {
                const { battleship, owner, otherAccount } = await loadFixture(
                    deployBattleShipGameWithGameStart
                );

                expect(await battleship.playersAddress(0)).to.equal(owner.address);
                expect(await battleship.playersAddress(1)).to.equal(
                    otherAccount.address
                );
                // Non-existent address should raise an error (Only 2 players were created)
                await expect(battleship.playersAddress(2)).to.be.reverted;
            });
            it("Should set all players as alive (not destroyed)", async function() {
                const { battleship, owner, otherAccount } = await loadFixture(
                    deployBattleShipGameWithGameStart
                );
                expect(await battleship.destroyedPlayers(owner.address)).to.be.false;
                expect(await battleship.destroyedPlayers(otherAccount.address)).to.be
                    .false;
            });
            it("Should be impossible to add more/less players than expected", async function() {
                const { owner, otherAccount, otherAccount2 } = await loadFixture(
                    deployBattleShipGameWithGameStart
                );
                const Battleship = await ethers.getContractFactory("BattleShipGame");
                await expect(
                    Battleship.deploy([
                        owner.address,
                        otherAccount.address,
                        otherAccount2.address,
                    ])
                ).to.be.revertedWith(
                    "_playersAddress does not match the number of expected players"
                );
            });
        });
        describe("Game State", function() {
            it("isGameStarted should return false", async function() {
                const { battleship, owner } = await loadFixture(
                    deployBattleShipGameWithGameStart
                );
                expect(await battleship.isGameStarted()).to.be.false;
            });
            it("isGameOver should return false", async function() {
                const { battleship, owner } = await loadFixture(
                    deployBattleShipGameWithGameStart
                );
                expect(await battleship.isGameOver()).to.be.false;
            });
            it("isTurnOver should return false", async function() {
                const { battleship, owner } = await loadFixture(
                    deployBattleShipGameWithGameStart
                );
                expect(await battleship.isTurnOver()).to.be.false;
            });
            it("hasReportedShots should return false", async function() {
                const { battleship, owner } = await loadFixture(
                    deployBattleShipGameWithGameStart
                );
                expect(await battleship.hasReportedShots()).to.be.false;
            });
            it("getWinner should return error", async function() {
                const { battleship, owner } = await loadFixture(
                    deployBattleShipGameWithGameStart
                );
                await expect(battleship.getWinner()).to.be.revertedWith(
                    "The game isn't over yet"
                );
            });
        });
    });

    describe("Game In Progress", function() {

        describe("Turn Ongoing", function() {
            it("Should prevent players from joining the game", async function() {
                const { battleship, owner, ownerShips, otherAccount, otherAccountShips } =
                    await loadFixture(deployBattleShipGameWithTurnInProgress);
                await expect(battleship.joinGame(ownerShips)).to.be.reverted;
            });
            it("Should return false isTurnOver", async function() {
                const { battleship, owner, otherAccount } = await loadFixture(
                    deployBattleShipGameWithTurnInProgress
                );
                expect(await battleship.isTurnOver()).to.be.false;
            });
            it("Should return false hasReportedShots", async function() {
                const { battleship, owner, otherAccount } = await loadFixture(
                    deployBattleShipGameWithTurnInProgress
                );
                expect(await battleship.hasReportedShots()).to.be.false;
            });
            it("Should mark player as played", async function() {
                const { battleship, owner, otherAccount } = await loadFixture(
                    deployBattleShipGameWithTurnInProgress
                );
                expect(await battleship.playerHasPlayed(owner.address)).to.be.true;
                expect(await battleship.playerHasPlayed(otherAccount.address)).to.be
                    .false;
            });
            it("Should not allow player report hits", async function() {
                const { battleship, owner, otherAccount, otherAccountShot } =
                    await loadFixture(deployBattleShipGameWithTurnInProgress);
                let shotReports = await generateShipShotProof(
                    owner,
                    [owner.address, otherAccount.address],
                    battleship
                );
                await expect(battleship.reportHits(shotReports)).to.be.revertedWith(
                    "All players have not played for this turn."
                );
            });
            it("Should not allow player shoot twice", async function() {
                const { battleship, owner, otherAccount, otherAccountShot, ownerShot } =
                    await loadFixture(deployBattleShipGameWithTurnInProgress);
                await expect(battleship.takeAShot(ownerShot)).to.be.revertedWith(
                    "Player has made a move for this turn"
                );
            });
            it("Should allow player take a shot", async function() {
                const { battleship, owner, otherAccount, otherAccountShot, ownerShot } =
                    await loadFixture(deployBattleShipGameWithTurnInProgress);
                await expect(battleship.connect(otherAccount).takeAShot(otherAccountShot)).to.be.ok;
            });
        });

        describe("Turn Over", function() {
            it("Should prevent players from joining the game", async function() {
                const { battleship, owner, ownerShips, otherAccount, otherAccountShips } =
                    await loadFixture(deployBattleShipGameWithTurnOver);
                await expect(battleship.joinGame(ownerShips)).to.be.reverted;
            });

            it("Should return true isTurnOver", async function() {
                const { battleship, owner, otherAccount } = await loadFixture(
                    deployBattleShipGameWithTurnOver
                );
                expect(await battleship.isTurnOver()).to.be.true;
            });
            it("Should mark player as played", async function() {
                const { battleship, owner, otherAccount } = await loadFixture(
                    deployBattleShipGameWithTurnOver
                );

                expect(await battleship.playerHasPlayed(owner.address)).to.be.true;
                expect(await battleship.playerHasPlayed(otherAccount.address)).to.be
                    .true;
            });
            it("Should allow player report hits", async function() {
                const { battleship, owner, otherAccount, otherAccountShot, ownerShot } =
                    await loadFixture(deployBattleShipGameWithTurnInProgress);
                await battleship.connect(otherAccount).takeAShot(otherAccountShot);
                let shotReports = await generateShipShotProof(
                    owner,
                    [owner.address, otherAccount.address],
                    battleship
                );

                await expect(battleship.reportHits(shotReports)).to.emit(
                    battleship,
                    "ShotReport"
                ).withArgs([ownerShot.x, ownerShot.y], owner.address, owner.address, false).withArgs([otherAccountShot.x, otherAccountShot.y], owner.address, otherAccount.address, true);
            });
            it("Should detect and revert ShipShotProofs for invalid coordinates or signatures", async function() {
                const { battleship, owner, otherAccount } = await loadFixture(
                    deployBattleShipGameWithTurnOver
                );
                let shotReports = await generateShipShotProof(
                    owner,
                    [owner.address, otherAccount.address],
                    battleship
                );
                await expect(battleship.reportHits(shotReports)).to.emit(
                    battleship,
                    "ShotReport"
                );
            });

        });
    });

    describe("Game Over", function() {
        it("Should set the right owner", async function() {
            const { battleship, owner } = await loadFixture(
                deployBattleShipGameWithGameOver
            );
            expect(await battleship.owner()).to.equal(owner.address);
        });
        it("Should prevent players from taking shots", async function() {
            const { battleship, owner, ownerShips } = await loadFixture(
                deployBattleShipGameWithGameOver
            );
            let ownerShot: Coordinate = {
                x: 20,
                y: 20,
            };
            await expect(battleship.takeAShot(ownerShot)).to.be.revertedWith(
                "Game is over"
            );
        });
        it("Should prevent players from reporting hits", async function() {
            const { battleship, otherAccount, owner, ownerShips, ownerShot } =
                await loadFixture(deployBattleShipGameWithGameOver);
            let { flatSig } = await signCoordinate(ownerShipCoords[0][0], owner);
            let report: Array<ShipShotProof> = [
                {
                    signature: flatSig,
                    shotBy: otherAccount.address,
                },
            ];
            await expect(battleship.reportHits(report)).to.be.revertedWith(
                "Game is over"
            );
        });
        it("Should prevent players from ending turn", async function() {
            const { battleship, otherAccount, owner, ownerShips, ownerShot } =
                await loadFixture(deployBattleShipGameWithGameOver);
            await expect(battleship.endTurn()).to.be.reverted;
        });
        it("Should prevent players from joining the game", async function() {
            const { battleship, owner, ownerShips, otherAccount, otherAccountShips } =
                await loadFixture(deployBattleShipGameWithGameOver);
            await expect(battleship.joinGame(ownerShips)).to.be.revertedWith(
                "Game is over"
            );
        });

        describe("Players State", function() {
            it("Should set the right player addresses", async function() {
                const { battleship, owner, otherAccount } = await loadFixture(
                    deployBattleShipGameWithGameStart
                );

                expect(await battleship.playersAddress(0)).to.equal(owner.address);
                expect(await battleship.playersAddress(1)).to.equal(
                    otherAccount.address
                );
                // Non-existent address should raise an error (Only 2 players were created)
                await expect(battleship.playersAddress(2)).to.be.reverted;
            });
            it("Should mark the right players as destroyed", async function() {
                const { battleship, owner, otherAccount } = await loadFixture(
                    deployBattleShipGameWithGameOver
                );
                expect(await battleship.destroyedPlayers(owner.address)).to.be.true;
                expect(await battleship.destroyedPlayers(otherAccount.address)).to.be
                    .false;
            });
        });
        describe("Game State", function() {
            it("isGameStarted should return true", async function() {
                const { battleship, owner } = await loadFixture(
                    deployBattleShipGameWithGameOver
                );
                expect(await battleship.isGameStarted()).to.be.true;
            });
            it("isGameOver should return true", async function() {
                const { battleship, owner } = await loadFixture(
                    deployBattleShipGameWithGameOver
                );
                expect(await battleship.isGameOver()).to.be.true;
            });
            it("isTurnOver should return false", async function() {
                const { battleship, owner } = await loadFixture(
                    deployBattleShipGameWithGameOver
                );
                expect(await battleship.isTurnOver()).to.be.false;
            });
            it("hasReportedShots should return false", async function() {
                const { battleship, owner } = await loadFixture(
                    deployBattleShipGameWithGameOver
                );
                expect(await battleship.hasReportedShots()).to.be.false;
            });
            it("getWinner should return winner", async function() {
                const { battleship, owner, otherAccount } = await loadFixture(
                    deployBattleShipGameWithGameOver
                );
                expect(await battleship.getWinner()).to.be.equal(otherAccount.address);
            });
        });

        it("Should handle draws properly", async function() {
            // When both players destroy each others ships at the same time
            const [owner, otherAccount, otherAccount2] = await ethers.getSigners();
            let ownerShips = await signShipCoordinates(ownerShipCoords, owner);
            ownerShips = ownerShips.flat();
            let otherAccountShips = await signShipCoordinates(
                otherAccountShipCoords,
                otherAccount
            );
            otherAccountShips = otherAccountShips.flat();
            const Battleship = await ethers.getContractFactory("BattleShipGame");
            const battleship = await Battleship.deploy([
                owner.address,
                otherAccount.address,
            ]);

            // Join Game
            await battleship.joinGame(ownerShips);
            await battleship.connect(otherAccount).joinGame(otherAccountShips);
            await playTurns(
                gameOverDrawShots,
                [owner, otherAccount],
                battleship
            );
            expect(await battleship.getWinner()).to.be.equals(ethers.constants.AddressZero);
        });
    });
});

// Play the game through till this point
async function playTurns(
    shots: Array<Array<Coordinate>>,
    players: Array<Signer>,
    battleshipGame: any
) {
    let playersAddress = players.map((player) => player.address);
    for (const playerShots of shots) {
        for (let index = 0; index < players.length; index++) {
            const player = players[index];
            const playerShot = playerShots[index];
            await battleshipGame.connect(player).takeAShot(playerShot);
        }
        for (let index = 0; index < players.length; index++) {
            const player = players[index];
            let shotReports = await generateShipShotProof(
                player,
                playersAddress,
                battleshipGame
            );
            await battleshipGame.connect(player).reportHits(shotReports);
        }
        await battleshipGame.endTurn();
    }

    return battleshipGame;
}
