import { expect } from "chai";

const shipmentId = "SP_189942";
const totalSent = 100;
const totalReceived = 100;
const shipmentKey = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(shipmentId));
console.log(`SHIPMENT KEY: ${shipmentKey}`);

describe("ReliefShipment", () => {
    let ReliefShipment, reliefShipment, admin, otherUser;

    before(async function (){
        ReliefShipment = await ethers.getContractFactory("ReliefShipment");
        [admin, otherUser] = await ethers.getSigners();

        reliefShipment = await ReliefShipment.deploy();
        await reliefShipment.deployed();

        const transaction = await reliefShipment.connect(admin).recordShipment(shipmentId, totalSent);
        await transaction.wait();
        // await expect(transaction).to.emit(reliefShipment, "ShipmentRecorded").withArgs(shipmentId, 100);
    });

    it("Should record a shipment successfully", async function () {

        expect((await reliefShipment.shipmentCount()).toNumber()).to.equal(1);
    });

    it("Should update the total Sent", async function () {
        const shipment = await reliefShipment.shipments(shipmentKey);

        expect(shipment.totalSent.toNumber()).to.equal(100);

    });

    it("Should update the total Received", async function () {
        const tx = await reliefShipment.connect(admin).recordReceived(shipmentId, 100);
        await tx.wait();

        const shipment = await reliefShipment.shipments(shipmentKey);
        expect(shipment.totalReceived.toNumber()).to.equal(100);

    })

    it("Should update the distribution", async function () {
        const tx = await reliefShipment.connect(admin).recordDistribution(shipmentId, 100);
        await tx.wait();
        const shipment = await reliefShipment.shipments(shipmentKey);

        expect(shipment.totalDistributed.toNumber()).to.equal(100);
        expect(shipment.isCompleted).to.equal(true);
    })
})
