"use strict";

let yValue = 100;
let posicionesTablero = [];
let imgCasillero = document.getElementById("imgCasillero");

class Tablero{
    constructor(ctx, width, height, NUMBER_OF_ROWS, NUMBER_OF_COLS){
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.NUMBER_OF_ROWS = NUMBER_OF_ROWS;
        this.NUMBER_OF_COLS = NUMBER_OF_COLS;

        this.SQUARE_SIZE = 90;//this.height / this.NUMBER_OF_ROWS;
        this.NUMBER_OF_SQUARES = 42;//this.NUMBER_OF_ROWS * this.NUMBER_OF_COLS;
        this.xValue = width / 4.5;
    }

    drawTablero(){
        let xValueCambiante = this.xValue;
        for (let i = 0; i < this.NUMBER_OF_ROWS; i++) {
            for (let j = 0; j < this.NUMBER_OF_COLS; j++) {
                this.ctx.beginPath();
                this.ctx.fillStyle = ["#FF8D8D", "#8DA9FF"][(i + j) % 2];
                this.ctx.drawImage(imgCasillero, xValueCambiante, yValue, this.SQUARE_SIZE, this.SQUARE_SIZE);
                this.ctx.fill();
                this.ctx.closePath();

                posicionesTablero.push(xValueCambiante);
                xValueCambiante += this.SQUARE_SIZE;
            }
            yValue += this.SQUARE_SIZE;
            xValueCambiante = this.xValue;
        }    
    }

    isPointInside(x, y){
        if((y > (100 - 90)) && (y < 100)){
            if((x > posicionesTablero[0]) && (x < posicionesTablero[1]))return 1;
            else if((x > posicionesTablero[1]) && (x < posicionesTablero[2]))return 2;
            else if((x > posicionesTablero[2]) && (x < posicionesTablero[3]))return 3;
            else if((x > posicionesTablero[3]) && (x < posicionesTablero[4]))return 4;
            else if((x > posicionesTablero[4]) && (x < posicionesTablero[5]))return 5;
            else if((x > posicionesTablero[5]) && (x < posicionesTablero[6]))return 6;
            else if((x > posicionesTablero[6]) && (x < (posicionesTablero[6] + 90)))return 7;
        }
    }
}
