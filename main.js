// JavaScript source code
"use strict;"

let centralMessage;


document.addEventListener('keydown', function (event) {
    if (event.key=="ArrowLeft") {
        centralMessage = 'Left was pressed';
        document.getElementById("message").innerHTML = centralMessage;
    }
    else if (event.key == "ArrowRight") {
        if (centralMessage != 'Right was pressed'&&centralMessage!='Right was pressed again') {
            centralMessage = 'Right was pressed';
        }
        else {
            centralMessage  ='Right was pressed again';
        }
        document.getElementById("message").innerHTML = centralMessage;
    }
}); 


const matrix = (rows, cols) => new Array(cols).fill(0).map((o, i) => new Array(rows).fill(1))

gamemap = matrix(7, 10);
console.log(gamemap);