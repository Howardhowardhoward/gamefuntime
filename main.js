// JavaScript source code
"use strict;"


let centralMessage;




const matrix = (y,x) => new Array(y).fill().map((o) => new Array(x).fill("wall"))

gamemap = matrix(game.global.mapHeight, game.global.mapWidth);

function makePath(map) {
    /* debugger*/
    var iter = 0;
    var row = game.global.startX;
    var col = game.global.startY;
    map[row][col] = 'path'; 
    game.global.playerPosition = [row, col];
    console.log(game.global.playerPosition)
    var dir = Math.floor(Math.random() * 4) + 1;

    while (col != game.global.mapWidth - 1) {
        iter++;
        if (iter > 10000) {
            row = game.global.startX;
            col = game.global.startY;
            map = matrix();
            map[row][col] = 'path';
            game.global.playerPosition = [row, col];
        }
        if (dir == 1) {
            if (row != 0 && (row > 0 && map[row - 1][col] != 'path') && (row == 1 || (row > 1 && map[row - 2][col] != 'path')) && (col == 0 || col > 0 && map[row - 1][col - 1] != 'path') && (col < game.global.mapWidth - 1 && map[row - 1][col + 1] != 'path')) {
                row--;
                map[row][col] = 'path';
                dir = Math.floor(Math.random() * 4) + 1;
            }
            else {
                dir = dir + 1;
                continue;
            }
        }
        else if (dir == 2) {
            if (row != game.global.mapHeight - 1 && (row < game.global.mapHeight - 1 && map[row + 1][col] != 'path') && (row == game.global.mapHeight - 2 || (row < game.global.mapHeight - 2 && map[row + 2][col] != 'path')) && (col == 0 || (col > 0 && map[row + 1][col - 1] != 'path')) && (col < game.global.mapWidth - 1 && map[row + 1][col + 1] != 'path')) {
                row++;
                map[row][col] = 'path';
                dir = Math.floor(Math.random() * 4) + 1;
            }
            else {
                dir = dir + 1;
                continue;
            }
        }
        else if (dir == 3) {
            if (row > 2 && row < game.global.mapHeight - 2 && col != 0 && (col == 1 || (col > 1 && map[row][col - 2] != 'path')) && (map[row - 1][col - 1] != 'path') && (map[row + 1][col - 1] != 'path') && map[row][col - 1] != 'path') {
                col--;
                map[row][col] = 'path';
                dir = Math.floor(Math.random() * 4) + 1;
            }
            else {
                dir = dir + 1;
                continue;
            }
        }

        else if (dir == 4) {
            dir = Math.floor(Math.random() * 4) + 1;
            if (col != game.global.mapWidth - 1 && (row == 0 || (row > 0 && map[row - 1][col + 1] != 'path')) && (row == game.global.mapHeight - 1 || (row < game.global.mapHeight - 1 && map[row + 1][col + 1] != 'path')) && map[row][col + 1] != 'path') {
                col++;
                map[row][col] = 'path';
            }
            else continue;
        }
        console.log(map);
    }
    map[row][col] = "goal";
    map[game.global.playerPosition[0]][game.global.playerPosition[1]] = "player";
}


function displayMap(gamemap) {
    var grid = document.getElementById("grid");
    grid.innerHTML = "";
    var className = "magma";
    grid.className = className;

    for (var x = 0; x <= game.global.mapHeight - 1; x++) {
        var row = document.createElement("row");
        grid.insertBefore(row, grid.childNodes[0]);
        row.setAttribute("id", "row" + x);
        row.className = "row";
        row.style.height = (100 / game.global.mapHeight) + "%";
        for (var y = 0; y <= game.global.mapWidth - 1; y++) {
            var cell = document.createElement("block");
            cell.setAttribute("id", x + ', ' + y)
            if (gamemap[x][y] == 'wall') {

                cell.className = "wall";
            }
            else if (gamemap[x][y] == 'path') {

                cell.className = "path";
            }
            else if (gamemap[x][y] == 'goal') {
                cell.className = "goal";
            }
            else if (gamemap[x][y] == 'player') {
                cell.className = (game.global.gotArtifact) ? "playerLoaded" : "player";
            }
            else if (gamemap[x][y] == "shadow") {
                cell.className = "shadow";
            }

            row.appendChild(cell);
            cell.style.width = (100 / game.global.mapWidth) + "%";

            if (game.global.gotArtifact && x == game.global.startX && y == game.global.startY) {
                cell.className = "return"
            }
        }
    }


}

function deleteSave() {
    localStorage.removeItem("gameFuntimeSave")
}

function save() {
    try {
        localStorage.setItem("gameFuntimeSave", JSON.stringify(game));
    }
    catch (e) {
        message("sorry, it no work");
    }
}

function load() {
    try {
        var savegame = JSON.parse(localStorage.getItem("gameFuntimeSave"));
        console.log(savegame);
        if (savegame != null && typeof savegame.global !== 'undefined') {
            for (var item in game.global) {
                if (typeof savegame.global[item] !== 'undefined') game.global[item] = savegame.global[item];
            }
            if (game.global.interestRate != 1) {
                game.global.bankOpen = true;
            }
           
        }

        console.log(game)
        updateMoney();
    }
    catch (e) {
        console.log(e);

    }



}





document.addEventListener('keydown', function (event) {
    playerRow = game.global.playerPosition[0];
    playerCol = game.global.playerPosition[1];
    shadow = false;
    if (event.key == "ArrowLeft") {
        centralMessage = 'Left was pressed';
        document.getElementById("message").innerHTML = centralMessage;
        if (playerCol > 0 && game.global.map[playerRow][playerCol - 1] != 'wall') {
            game.global.playerPosition[1] = playerCol - 1;
            shadow = true;
        }

    }
    else if (event.key == "ArrowRight") {
        centralMessage = 'Right was pressed';
        document.getElementById("message").innerHTML = centralMessage;
        if (playerCol < game.global.mapWidth - 1 && game.global.map[playerRow][playerCol + 1] != 'wall')
            game.global.playerPosition[1] = playerCol + 1;
        shadow = true;
    }
    else if (event.key == "ArrowDown") {
        centralMessage = 'Down was pressed';
        document.getElementById("message").innerHTML = centralMessage;
        if (playerRow > 0 && game.global.map[playerRow - 1][playerCol] != "wall") {
            game.global.playerPosition[0] = playerRow - 1;
            shadow = true;
        }
    }
    else if (event.key == "ArrowUp") {
        centralMessage = 'Up was pressed';
        document.getElementById("message").innerHTML = centralMessage;
        if (playerRow < game.global.mapHeight - 1 && game.global.map[playerRow + 1][playerCol] != "wall")
            game.global.playerPosition[0] = playerRow + 1;
        shadow = true;
    }
    if (game.global.map[game.global.playerPosition[0]][game.global.playerPosition[1]] == 'goal') {
        game.global.gotArtifact = true;

    }

    if (shadow) {
        game.global.map[playerRow][playerCol] = 'shadow';
    }
    if (game.global.gotArtifact && game.global.playerPosition[0] == game.global.startX && game.global.playerPosition[1] == game.global.startY) {
        game.global.artifacts++;
        game.global.gotArtifact = false;
        if (game.global.newMapHeight != game.global.mapHeight) {
            game.global.mapHeight = game.global.newMapHeight;
        }
        if (game.global.newMapWidth != game.global.mapWidth) {
            game.global.mapWidth = game.global.newMapWidth;
        }
        game.global.map = matrix(game.global.mapHeight, game.global.mapWidth);
        makePath(game.global.map);
        updateMap();
        showMoney();
    }

    updateMap();

});

function updateMap() {
    game.global.map[game.global.playerPosition[0]][game.global.playerPosition[1]] = 'player';
    displayMap(game.global.map);
}

function updateMoney() {
    document.getElementById("artifacts").innerHTML =game.global.artifacts;
    game.global.money *= game.global.interestRate;
    document.getElementById("money").innerHTML = game.global.money.toFixed(2);
    
}
function showMoney() {
    document.getElementById("money").innerHTML = game.global.money.toFixed(2);
    if (game.global.interestRate > 1) {
        document.getElementById("money").style.color = "green";
    }
    if (game.global.interestRate < 1) {
        document.getElementById("money").style.color = "red";
    }
    if (game.global.bankOpen){
        document.getElementById("interestRate").style.display = "table";
        document.getElementById("interestRate").innerHTML = "Interest Rate: " +(game.global.interestRate * 100 - 100).toFixed(2) + "%";
        if(game.global.interestRate>1){
            document.getElementById("interestRate").style.color = "green";
        }
        if (game.global.interestRate < 1) {
            document.getElementById("interestRate").style.color = "red";
        }
        if (game.global.interestRate == 1) {
            document.getElementById("interestRate").style.color= "black";
        }
        if (game.global.artifactRate == 0) {
            document.getElementById("artifactRate").innerHTML = "Price per Artifact: $"+ (game.global.pricePerArtifact).toFixed(2);
        }
    }

    document.getElementById("artifacts").innerHTML = game.global.artifacts;
    checkUpgrades();
}

function sellArtifacts() {
    game.global.money += game.global.artifacts * game.global.pricePerArtifact;
    game.global.artifacts = 0;
    showMoney();
    
}


function checkUpgrades() {
    if ((game.global.money > 80 && !game.global.bankOpen)||game.global.showBankUpgrade) {
        document.getElementById("openBank").style.display = "table";
        game.global.showBankUpgrade = true;
    }

    if ((game.global.money >= 0.6 * game.global.mapSizeUpgradeCost && game.global.mapHeight<11)||game.global.showMapSizeUpgrade) {
        document.getElementById("mapSizeUpgrade").style.display = "table";
        document.getElementById("mapSizeUpgradeButton").innerHTML = "$" + game.global.mapSizeUpgradeCost;
        game.global.showMapSizeUpgrade = true;
    }

}

function openBank() {
    if (game.global.money >= 100) {
        game.global.interestRate = 1.0001;
        game.global.money -= 100;
        showMoney();
        document.getElementById("openBank").style.display = "none";
        game.global.bankOpen = true;
        game.global.showBankUpgrade = false;
        showMoney();

    }
}

function mapSizeUpgrade() {
    if (game.global.money >= game.global.mapSizeUpgradeCost) {
        game.global.newMapHeight = game.global.mapHeight+1;
        game.global.newMapWidth = game.global.mapWidth + 1;
        game.global.starty = Math.floor(game.global.newMapHeight / 2);
        game.global.money -= game.global.mapSizeUpgradeCost;
        game.global.mapSizeUpgradeCost *= 2;
        game.global.pricePerArtifact += 0.5;
        document.getElementById("mapSizeUpgrade").style.display = "none";
        showMoney();
        game.global.showMapSizeUpgrade = false;
    }
}


load();
console.log(game);
if (game.global.deadMap) {
    makePath(gamemap);
    game.global.map = gamemap;
    game.global.deadMap = false;
    save();
}

displayMap(game.global.map);
console.log('Done')
showMoney();

window.setInterval(function () {

    save();
    updateMoney();
}, 1000);