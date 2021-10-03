"use strict";

const yValueIncial = 100;
let posicionesTablero = [];
let imgCasillero = document.getElementById("imgCasillero");
let columnas = [];
let tableroYaCreado = false;

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
        let yValue = yValueIncial;
        for (let i = 0; i < this.NUMBER_OF_ROWS; i++) {
            for (let j = 0; j < this.NUMBER_OF_COLS; j++) {
                this.ctx.beginPath();
                this.ctx.drawImage(imgCasillero, xValueCambiante, yValue, this.SQUARE_SIZE, this.SQUARE_SIZE);
                this.ctx.closePath();

                posicionesTablero.push(xValueCambiante);
                xValueCambiante += this.SQUARE_SIZE;
                if(!tableroYaCreado){
                    this.crearFilas(j);
                }
            }
            yValue += this.SQUARE_SIZE;
            xValueCambiante = this.xValue;
        }    
        if(!tableroYaCreado){ tableroYaCreado = true; }
    }

    crearFilas(nroColumna){
        columnas[nroColumna] = new Array(   );
        for(let i=0; i < this.NUMBER_OF_ROWS; i++){
            columnas[nroColumna].push(i*0);
        }
    }

    obtenerColumna(x, y){
        if((y > (100 - 90)) && (y < 100)){
            if((x > posicionesTablero[0]) && (x < posicionesTablero[1]))return 0;
            else if((x > posicionesTablero[1]) && (x < posicionesTablero[2]))return 1;
            else if((x > posicionesTablero[2]) && (x < posicionesTablero[3]))return 2;
            else if((x > posicionesTablero[3]) && (x < posicionesTablero[4]))return 3;
            else if((x > posicionesTablero[4]) && (x < posicionesTablero[5]))return 4;
            else if((x > posicionesTablero[5]) && (x < posicionesTablero[6]))return 5;
            else if((x > posicionesTablero[6]) && (x < (posicionesTablero[6] + 90)))return 6;
        }
    }

    obtenerFila(nroColumna){
        let fila = -1;
        let ultimaFila = 1;
        for(let i=0; i < NUMBER_OF_ROWS; i++){
            if(columnas[nroColumna][i] !== 0){
                columnas[nroColumna][ultimaFila] = 1;
                return fila;
            }
            else{
                fila = fila + 1;
            }
            ultimaFila = i;
        }
        columnas[nroColumna][ultimaFila] = 1;
        return fila;
    }
}
