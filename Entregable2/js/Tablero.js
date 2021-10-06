"use strict";

const yValueIncial = 100;
let posicionesTablero = [];
//let imgCasillero = document.getElementById("imgCasillero");
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

    setNumberOfRows(newNumber){
        this.NUMBER_OF_ROWS = newNumber;
    }

    setNumberOfCols(newNumber){
        this.NUMBER_OF_COLS = newNumber;
    }

    drawTablero(){
        let xValueCambiante = this.xValue;
        let yValue = yValueIncial;
        let nroColumna = 0;
        for (let i = 0; i < this.NUMBER_OF_ROWS; i++) {
            let casilleros = [];
            for (let j = 0; j < this.NUMBER_OF_COLS; j++) {
                let casillero = new Casillero(this.ctx, xValueCambiante, yValue);
                casillero.draw(this.SQUARE_SIZE);
                casilleros.push(casillero)/*
                this.ctx.beginPath();
                this.ctx.drawImage(imgCasillero, xValueCambiante, yValue, this.SQUARE_SIZE, this.SQUARE_SIZE);
                this.ctx.closePath();*/

                posicionesTablero.push(xValueCambiante);
                xValueCambiante += this.SQUARE_SIZE;
            }
            if(!tableroYaCreado){
                this.crearFilas(nroColumna, casilleros);
            }
            yValue += this.SQUARE_SIZE;
            xValueCambiante = this.xValue;
            nroColumna = nroColumna + 1;
        }    
        if(!tableroYaCreado){ tableroYaCreado = true; }
    }

    crearFilas(nroColumna, casilleros){
        columnas[nroColumna] = new Array(   );
        casilleros.forEach(function(casillero) {
            columnas[nroColumna].push(casillero);
        });
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
        let casillero = null;
        let casilleroActual = casillero;
        for(let i=0; i < NUMBER_OF_ROWS; i++){
            casilleroActual = columnas[nroColumna][i]; 
            if(casilleroActual.hasDuenio()){
                casillero = casilleroActual;
                casillero.setDuenio(1);//Se le pasa el 1 para jugador1 y 2 para jugador2
                return casillero;
            }
            else{
                casillero = casilleroActual;
            }
            ultimaFila = i;
        }
        casillero.setDuenio(1);//Se le pasa el 1 para jugador1 y 2 para jugador2
        return casillero;
    }
}
