"use strict";

let turno = false;
let cont = 0;

class Jugador{
    constructor(nombre, imgFicha, fichas, CANT_FICHAS, fichaX, fichaY, MIN_FICHA_X, MAX_FICHA_X, MAX_FICHA_Y){
        this.nombre = nombre;
        this.imgFicha = imgFicha;
        this.fichas = fichas;
        this.CANT_FICHAS = CANT_FICHAS;
        this.fichaX = fichaX;
        this.fichaY = fichaY;
        this.MIN_FICHA_X = MIN_FICHA_X;
        this.MAX_FICHA_X = MAX_FICHA_X;
        this.MAX_FICHA_Y = MAX_FICHA_Y;
    }

    setTurno(valor){
        turno = valor;
    }
    //agrego las fichas al jugador
    addFichas(){
        while(this.fichas.length < this.CANT_FICHAS){
            this.addFicha();
        }
    }
    addFicha(){
        let ficha = new Ficha(c, ctx, width, height, CANT_FICHAS);
        this.fichas.push(ficha);
    }
    //dibujo las fichas en pantalla
    drawFichas(){
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
    }

}