"use strict";

let turno = false;
let cont = 0;

class Jugador{
    constructor(nombre, imgFicha, fichas){
        this.nombre = nombre;
        this.imgFicha = imgFicha;
        this.fichas = [];
    }

    setTurno(valor){
        turno = valor;
    }

    //dibujo las fichas en pantalla
    /*drawFichas(){
        cont = 0;
        for(let i=0; i < this.fichas.length; i++){
            ctx.beginPath();
            if( this.fichaX < this.MAX_FICHA_X && this.fichaY < MAX_FICHA_Y){
                ctx.drawImage(this.imgFicha, this.fichaX, this.fichaY, 50, 50);
                //ctx.arc(minFichaP1X, fichaP1Y, RADIO, 0, 2 * Math.PI);
                if( i < (this.CANT_FICHAS / 3) - 1){
                    this.fichaY = this.fichaY + 60;
                } else if(i < ((this.CANT_FICHAS / 3) * 2) - 1) {
                    if(cont == 0){
                        this.fichaY = 100;
                        cont++;
                    } else {
                        this.fichaY = this.fichaY + 60;
                    }
                    this.fichaX =  this.MIN_FICHA_X + 95;
                } else {
                    if(cont == 1){
                        this.fichaY = 100;
                        cont++;
                    } else {
                        this.fichaY = this.fichaY + 60;
                    }
                    this.fichaX =  this.MIN_FICHA_X + 160;
                }
            }
            ctx.stroke();
        }
    }*/

}