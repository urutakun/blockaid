async function main (){
    const [admin] = await ethers.getSigners();

    console.log("Deploying contract with the account: ", admin.address);

    const ReliefShipment = await ethers.getContractFactory("ReliefShipment");
    const reliefShipment = await ReliefShipment.deploy();

    console.log("ReliefShipment contract deployed at: ", reliefShipment.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })
