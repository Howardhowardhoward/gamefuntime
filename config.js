function newGame() {
    var toReturn = {
        global: {
            //version Number:
            version: "0.0.3",
            // Global variables
            mapWidth: 9,
            mapHeight: 4,
            newMapWidth: 9,
            newMapHeight: 4,

            startY: 3,
            newStartY: 3,
            startX: 0,

            // Game variables
            map: [],
            deadMap: true,
            playerPosition: -1,
            gotArtifact: false,
            artifacts: 0,
            artifactsSold:0,
            artifactRate: 0,
            mapsCompleted: 0,

            //Money variables
            money: 0,
            interestRate: 1.00,
            bankOpen: false,
            // Interest rate is 1.00 for now, but will be changed later
            pricePerArtifact: 1,

            // upgrade variables
            mapSizeUpgradeCost: 25,
            showBankUpgrade: false,
            showMapSizeUpgrade: false,
            mapSizePriceScale: 2,

            drillUpgradeCost: 200,
            drillLevel: 0,
            showDrillUpgrade: false,
            drillPriceScale: 2,

            ratUnlocked:false,
            ratLevel:0,
            ratFoodCost: 25,

            //prompt variables
            promptBGColor: "indianred",
            ratDiscovery: false,
            sellInstruction:false,




        },




    };

    return toReturn;

}

var game = newGame();