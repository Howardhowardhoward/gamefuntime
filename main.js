// JavaScript source code
"use strict;"


let centralMessage;




const matrix = () => new Array(game.global.mapHeight).fill().map((o) => new Array(game.global.mapWidth).fill("wall"))

gamemap = matrix();

function makePath(map) {
    /* debugger*/
    var row = Math.floor(game.global.mapHeight / 2);
    var col = 0;
    map[row][col] = 'path';
    game.global.playerPosition = [row, col];
    console.log(game.global.playerPosition)
    var dir = Math.floor(Math.random() * 4) + 1;

    while (col != game.global.mapWidth - 1) {
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
                cell.className = "player";
            }
            else if (gamemap[x][y] == "shadow") {
                cell.className ="shadow";
            }

            row.appendChild(cell);
            cell.style.width = (100 / game.global.mapWidth) + "%";

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
        }

        console.log(game)

    }
    catch (e) {
        console.log(e);

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


window.setInterval(function () {

    save();

}, 1000);

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
    if (shadow) {
        game.global.map[playerRow][playerCol] = 'shadow';
    }
    updateMap();
});

function updateMap() {
    game.global.map[game.global.playerPosition[0]][game.global.playerPosition[1]] = 'player';
    displayMap(game.global.map);
}


