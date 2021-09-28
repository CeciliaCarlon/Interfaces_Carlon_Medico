"use strict";

class Ficha {
    constructor(c, ctx, width, height, CANT_FICHAS){
        this.c = c;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.CANT_FICHAS = CANT_FICHAS;
    }
    
    //dibujo las fichas del jugador 1
    /*draw(fichas, imgFicha, fichaX, fichaY, MIN_FICHA_X, MAX_FICHA_X, MAX_FICHA_Y){
        for(let i=0; i < fichas.length; i++){
            if( fichaX < MAX_FICHA_X && fichaY < MAX_FICHA_Y){
                ctx.drawImage(imgFicha, fichaX, fichaY, RADIO, RADIO);
                //ctx.arc(minFichaP1X, fichaP1Y, RADIO, 0, 2 * Math.PI);
                if( i < (CANT_FICHAS / 2) -1 ){
                    fichaY = fichaY + 60;
                } else {
                    if(cont == 0){
                        fichaY = 50;
                        cont++;
                    } else {
                        fichaY = fichaY + 60;
                    }
                    fichaX = 80;
                } 
            }
        }
        //vuelvo al principio algunos parametros para el j2
        /*cont = 0;
        //dibujo las fichas del jugador 2
        //for(let i=0; i < CANT_FICHAS; i++){
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
        //}
    }*/
}
