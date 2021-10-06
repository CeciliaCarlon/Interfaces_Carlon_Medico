"use strict";

const yValueIncial = 550;
let posicionesTablero = [];
//let imgCasillero = document.getElementById("imgCasillero");
let filas = [];
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
                casillero.setI(i);
                casillero.setJ(j);
                casilleros.push(casillero);/*
                this.ctx.beginPath();
                this.ctx.drawImage(imgCasillero, xValueCambiante, yValue, this.SQUARE_SIZE, this.SQUARE_SIZE);
                this.ctx.closePath();*/

                if(i == 0){
                    posicionesTablero.push(xValueCambiante);
                }
                xValueCambiante += this.SQUARE_SIZE;
                
            }
            //console.log(casilleros);
            if(!tableroYaCreado){
                this.crearFilas(i, casilleros);
            }
            yValue -= this.SQUARE_SIZE;
            xValueCambiante = this.xValue;
        }    
        if(!tableroYaCreado){ tableroYaCreado = true; }
    }

    crearFilas(nroFilas, casilleros){
        filas[nroFilas] = new Array(   );
        casilleros.forEach(function(casillero) {
            filas[nroFilas].push(casillero);
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

    obtenerFila(nroColumna, jugador){
        let casillero = null; 
        for(let i=0; i < this.NUMBER_OF_ROWS; i++){
            casillero = filas[i][nroColumna]; 
            if(!casillero.hasDuenio()){
                casillero.setDuenio(jugador);
                return casillero;
            }
        }
        return null;
    }

    getFilas(){
        return filas;
    }
}