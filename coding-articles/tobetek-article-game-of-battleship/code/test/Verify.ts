import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Coordinate, signCoordinate } from "../utils/game";

describe("SigVerifier", function () {
    async function deploySigVerifierFixture() {
        const [owner, otherAccount] = await ethers.getSigners();
        const SigVerifier = await ethers.getContractFactory("SigVerifier");
        const sigVerifier = await SigVerifier.deploy();
        return { sigVerifier, owner, otherAccount };
    }


    it("Should recover the right signer address from signed string", async function () {
        const { sigVerifier, owner } = await loadFixture(deploySigVerifierFixture);

        let message = "Hello World";
        let hashedMessage = ethers.utils.solidityKeccak256(['string'], [message]);
        hashedMessage = ethers.utils.arrayify(hashedMessage);

        let flatSig = await owner.signMessage(hashedMessage);
        let sig = ethers.utils.splitSignature(flatSig);

        // Locally recovered
        const recoveredAddress = ethers.utils.verifyMessage(hashedMessage, flatSig);
        expect(await sigVerifier.RecoverSigner(hashedMessage, sig.v, sig.r, sig.s)).to.equals(owner.address).to.equals(recoveredAddress);
    });
    it("Should recover the right signer address from signed Coordinate", async function () {
        const { sigVerifier, owner } = await loadFixture(deploySigVerifierFixture);
        let message: Coordinate = {
            x: 10,
            y: 20
        }
        let { flatSig, hashedCoord } = await signCoordinate(message, owner);
        let sig = ethers.utils.splitSignature(flatSig);

        // Locally recovered
        const recoveredAddress = ethers.utils.verifyMessage(hashedCoord, flatSig);
        expect(await sigVerifier.RecoverSigner(hashedCoord, sig.v, sig.r, sig.s)).to.equals(owner.address).to.equals(recoveredAddress);
    });

    it("Should split signature correctly", async function () {
        const { sigVerifier, owner } = await loadFixture(deploySigVerifierFixture);
        let message = "Hello World";
        let hashedMessage = ethers.utils.solidityKeccak256(['string'], [message]);
        hashedMessage = ethers.utils.arrayify(hashedMessage);
        let flatSig = await owner.signMessage(hashedMessage);

        // Ether.js split signature
        let splitSig = ethers.utils.splitSignature(flatSig);
        // Contract Split Signature
        let ctSplitSig = await sigVerifier.SplitSignature(flatSig);

        expect(ctSplitSig.v).to.equal(splitSig.v);
        expect(ctSplitSig.r).to.equal(splitSig.r);
        expect(ctSplitSig.s).to.equal(splitSig.s);
    });

});
