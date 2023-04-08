function newGame() {
    var toReturn = {
        global: {
            //version Number:
            version: "0.0.1",
            // Global variables
            mapWidth: 10,
            mapHeight: 7,

            // Game variables
            map:[], 
            deadMap: true,
            playerPosition: -1,


            
        },




    };

    return toReturn;

}

var game = newGame();