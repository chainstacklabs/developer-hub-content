import { ethers, Signer } from "hardhat";

export type ShipShotProof = {
    signature: string
    // The address of the player that shot
    // at this coordinate
    shotBy: string
}

export type Coordinate = {
    x: number
    y: number
}
export type Ship = Array<Coordinate>


export async function signShipCoordinates(ships: Array<Ship>, signer) {
    let signedShips = [];

    for (const ship of ships) {
        let signedShip = [];
        for (const coord of ship) {
            let { flatSig } = await signCoordinate(coord, signer);
            signedShip.push(flatSig);
        }
        signedShips.push(signedShip);
    }
    return signedShips;
}

export async function signCoordinate(coord: Coordinate, signer: Signer) {
    let hashedCoord = ethers.utils.solidityKeccak256(['uint8', 'uint8'], [coord.x, coord.y]);
    hashedCoord = ethers.utils.arrayify(hashedCoord);
    let flatSig = await signer.signMessage(hashedCoord);
    return { flatSig, hashedCoord };
}

export async function generateShipShotProof(
    player: Signer,
    allPlayers: Array<string>,
    battleshipGame: any
) {
    let shotReports = [];
    for (const playerAddress of allPlayers) {
        let playerShot = await battleshipGame.playerShots(playerAddress);
        let { flatSig } = await signCoordinate(playerShot, player);
        let report: ShipShotProof = {
            signature: flatSig,
            shotBy: playerAddress,
        };
        shotReports.push(report);
    }

    return shotReports;
}