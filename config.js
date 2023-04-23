function newGame() {
    var toReturn = {
        global: {
            //version Number:
            version: "0.0.1",
            // Global variables
            mapWidth: 10,
            mapHeight: 7,
            startX: 3,
            startY: 0,

            // Game variables
            map:[], 
            deadMap: true,
            playerPosition: -1,
            gotArtifact: false,
            artifacts: 0,
            artifactRate: 0,

            //Money variables
            money: 0,
            interestRate: 1.00,
            bankOpen: false,
            // Interest rate is 1.00 for now, but will be changed later
            pricePerArtifact: 1,

            
        },




    };

    return toReturn;

}

var game = newGame();