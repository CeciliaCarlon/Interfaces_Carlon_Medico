"use strict";
//Variables de clase
const yValueIncial = 100;
let posicionesTablero = [];
let filas = [];
let tableroYaCreado = false;

class Tablero{
    //Constructor
    constructor(ctx, width, height, NUMBER_OF_ROWS, NUMBER_OF_COLS){
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.NUMBER_OF_ROWS = NUMBER_OF_ROWS;
        this.NUMBER_OF_COLS = NUMBER_OF_COLS;

        this.SQUARE_SIZE = 90;
        this.xValue = width / 3.5;
    }
    //Getter y setters
    getFilas(){
        return filas;
    }

    setNumberOfRows(newNumber){
        this.NUMBER_OF_ROWS = newNumber;
    }

    setNumberOfCols(newNumber){
        this.NUMBER_OF_COLS = newNumber;
    }
    //Función que dibuja el tablero
    drawTablero(){
        let xValueCambiante = this.xValue;
        let yValue = yValueIncial;
        let nroFila = this.NUMBER_OF_ROWS - 1;
        for (let i = 0; i < this.NUMBER_OF_ROWS; i++) {
            let casilleros = [];
            for (let j = 0; j < this.NUMBER_OF_COLS; j++) {
                let casillero = new Casillero(this.ctx, xValueCambiante, yValue);
                casillero.draw(this.SQUARE_SIZE);
                casillero.setI(nroFila);
                casillero.setJ(j);
                casilleros.push(casillero);

                if(i == 0){
                    posicionesTablero.push(xValueCambiante);
                }
                xValueCambiante += this.SQUARE_SIZE;
                
            }
            if(!tableroYaCreado){
                this.crearFilas(nroFila, casilleros);
            }
            yValue += this.SQUARE_SIZE;
            xValueCambiante = this.xValue;
            nroFila--;
        }    
        if(!tableroYaCreado){ tableroYaCreado = true; }
    }
    //Función que obtiene un casillero
    obtenerCasillero(x,y){
        for(let i=0; i < this.NUMBER_OF_ROWS;i++){
            for(let j=0; j < this.NUMBER_OF_COLS; j++){
                let casillero = filas[i][j];
                if(casillero.getPosXParaFicha() == x && casillero.getPosYParaFicha() == y){
                    return casillero;
                }
            }
        }
    }
    //Función que crea el arreglo de filas
    crearFilas(nroFilas, casilleros){
        filas[nroFilas] = new Array(   );
        casilleros.forEach(function(casillero) {
            filas[nroFilas].push(casillero);
        });
    }
    //Función que obtiene una columna según una posición x e y
    obtenerColumna(x, y){
        if((y > (100 - 90)) && (y < 100)){
            for(let i = 0; i < posicionesTablero.length; i++){
                if(posicionesTablero[i+1] != null){
                    if((x > posicionesTablero[i]) && (x < posicionesTablero[i+1])){
                        return i;
                    }
                } else {
                    if((x > posicionesTablero[i]) && (x < posicionesTablero[i]+90)){
                        return this.NUMBER_OF_COLS - 1;
                    }
                } 
            }
        }
    }
    //Función que obtiene una fila
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
}