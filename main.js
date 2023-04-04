// JavaScript source code
"use strict;"


let centralMessage;


document.addEventListener('keydown', function (event) {
    if (event.key == "ArrowLeft") {
        centralMessage = 'Left was pressed';
        document.getElementById("message").innerHTML = centralMessage;
    }
    else if (event.key == "ArrowRight") {
        if (centralMessage != 'Right was pressed' && centralMessage != 'Right was pressed again') {
            centralMessage = 'Right was pressed';
        }
        else {
            centralMessage = 'Right was pressed again';
        }
        document.getElementById("message").innerHTML = centralMessage;
    }
});


const matrix = () => new Array(game.global.mapHeight).fill().map((o) => new Array(game.global.mapWidth).fill("wall"))

gamemap = matrix();

function makePath(map) {
   /* debugger*/
    var row = Math.floor(game.global.mapHeight / 2);
    var col = 0;
    map[row][col] = 'path';
    var dir = Math.floor(Math.random() * 4) + 1;

    while (col != game.global.mapWidth - 1) {
        if (dir == 1) {
            if (row != 0 && (row>0&&map[row-1][col]!='path' ) && (row == 1 || (row > 1 && map[row - 2][col] != 'path')) && (col == 0 || col > 0 && map[row - 1][col - 1] != 'path') && (col < game.global.mapWidth - 1 && map[row - 1][col + 1] != 'path')) {
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
            if (row != game.global.mapHeight - 1&&(row<game.global.mapHeight-1 && map[row+1][col]!='path') && (row == game.global.mapHeight - 2 || (row < game.global.mapHeight - 2 && map[row + 2][col] != 'path')) && (col==0||(col > 1 && map[row + 1][col - 1] != 'path')) && (col < game.global.mapWidth - 1 && map[row + 1][col + 1] != 'path')) {
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
            if (row > 2 && row < game.global.mapHeight - 2 && col != 0 && (col == 1 || (col > 1 && map[row][col - 2] != 'path')) && (map[row - 1][col - 1] != 'path') && (map[row + 1][col - 1] != 'path') && map[row][col-1]!='path' ) {
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
            if (col != game.global.mapWidth - 1 && (row==0||(row > 1 && map[row - 1][col + 1] != 'path')) && (row==game.global.mapHeight-1||(row < game.global.mapHeight - 1 && map[row + 1][col + 1] != 'path'))) {
                col++;
                map[row][col] = 'path';
            }
            else continue;
        }
        console.log(map);
    }
}
makePath(gamemap);

function displayMap() {
    var grid = document.getElementById("grid");
    grid.innerHTML = "";
    var className = "magma";
    grid.className = className;



}
console.log(gamemap);
