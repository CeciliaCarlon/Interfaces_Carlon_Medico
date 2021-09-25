"use strict";

//posición de las fichas
let RADIO = 40;
let minFichaP1X = 30;
let fichaP1Y = 50;
let fichaP2Y = 50;
let cont = 0;
let imgP1 = document.getElementById('imgP1');
let imgP2 = document.getElementById('imgP2');

class Ficha {
    constructor(c, ctx, width, height, CANT_FICHAS){
        this.c = c;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.CANT_FICHAS = CANT_FICHAS;

        this.MAX_FICHA_P1X = c.width / 4;
        this.MAX_FICHA_Y = height;
        this.MIN_FICHA_P2X = this.MAX_FICHA_P1X * 3;
        this.MAX_FICHA_P2X = width;
        this.fichaP2X = this.MIN_FICHA_P2X + 50;
    }
    
    //dibujo las fichas del jugador 1
    draw(){
        for(let i=0; i < CANT_FICHAS; i++){
            if( minFichaP1X < this.MAX_FICHA_P1X && fichaP1Y < this.MAX_FICHA_Y){
                ctx.drawImage(imgP1, minFichaP1X, fichaP1Y, RADIO, RADIO);
                //ctx.arc(minFichaP1X, fichaP1Y, RADIO, 0, 2 * Math.PI);
                if( i < (CANT_FICHAS / 2) -1 ){
                    fichaP1Y = fichaP1Y + 60;
                } else {
                    if(cont == 0){
                        fichaP1Y = 50;
                        cont++;
                    } else {
                        fichaP1Y = fichaP1Y + 60;
                    }
                    minFichaP1X = 80;
                } 
            }
        }
        //vuelvo al principio algunos parametros para el j2
        cont = 0;
        //dibujo las fichas del jugador 2
        for(let i=0; i < CANT_FICHAS; i++){
            ctx.beginPath();
            if( this.fichaP2X < this.MAX_FICHA_P2X && fichaP2Y < this.MAX_FICHA_Y){
                ctx.drawImage(imgP2, this.fichaP2X, fichaP2Y, RADIO, RADIO);
                //ctx.arc(fichaP2X, fichaP2Y, RADIO, 0, 2 * Math.PI);
                if( i < (CANT_FICHAS / 2) -1 ){
                    fichaP2Y = fichaP2Y + 60;
                } else {
                    if(cont == 0){
                        fichaP2Y = 50;
                        cont++;
                    } else {
                        fichaP2Y = fichaP2Y + 60;
                    }
                    this.fichaP2X = this.MIN_FICHA_P2X + 100;
                } 
            }
            ctx.stroke();
        }
    }
}
