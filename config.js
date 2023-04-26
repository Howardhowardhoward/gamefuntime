function newGame() {
    var toReturn = {
        global: {
            //version Number:
            version: "0.0.3",
            // Global variables
            mapWidth: 10,
            mapHeight: 5,
            newMapWidth: 10,
            newMapHeight: 5,

            startX: 3,
            startY: 0,

            // Game variables
            map: [],
            deadMap: true,
            playerPosition: -1,
            gotArtifact: false,
            artifacts: 0,
            artifactRate: 0,

            //Money variables
            money: 100000,
            interestRate: 1.00,
            bankOpen: false,
            // Interest rate is 1.00 for now, but will be changed later
            pricePerArtifact: 1,

            // upgrade variables
            mapSizeUpgradeCost: 50,
            showBankUpgrade: false,
            showMapSizeUpgrade: false,
            mapSizePriceScale: 2,

            drillUpgradeCost: 200,
            drillLevel: 0,
            showDrillUpgrade: false,
            drillPriceScale: 2,




        },




    };

    return toReturn;

}

var game = newGame();