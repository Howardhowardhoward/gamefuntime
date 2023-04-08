function newGame() {
    var toReturn = {
        global: {
            //version Number:
            version: "0.0.1",
            // Global variables
            mapWidth: 10,
            mapHeight: 7,

            // Game variables
            map=matrix(),
            deadmap=true;


            
        },




    };

    return toReturn;

}

var game = newGame();