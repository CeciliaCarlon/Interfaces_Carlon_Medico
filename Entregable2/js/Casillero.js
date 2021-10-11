"use strict";
//Imagen del casillero
let imgCasillero = document.getElementById("imgCasillero");

class Casillero {
    //Constructor
    constructor(ctx, Xpos, Ypos){
        this.ctx = ctx;
        this.Xpos = Xpos;
        this.Ypos = Ypos;
        this.posXParaFicha = this.Xpos + 11;
        this.posYParaFicha = this.Ypos + 11;
        this.duenioCasillero = 0;
        this.i = 0;
        this.j = 0;
    }
    //Getter y setters
    setI(i){
        this.i = i;
    }
    setJ(j){
        this.j = j;
    }
    getI(){
        return this.i;
    }
    getJ(){
        return this.j;
    }
    setDuenio(duenio){
        this.duenioCasillero = duenio;
    }
    getDuenio(){
        return this.duenioCasillero;
    }
    getX(){
        return this.Xpos; 
    }
    getY(){ 
        return this.Ypos; 
    }
    getPosXParaFicha(){
        return this.posXParaFicha;
    }
    getPosYParaFicha(){
        return this.posYParaFicha;
    }
    //Función que dibuja el casillero.
    draw(SQUARE_SIZE){
        this.ctx.beginPath();
        this.ctx.drawImage(imgCasillero, this.Xpos, this.Ypos, SQUARE_SIZE, SQUARE_SIZE);
        this.ctx.closePath();
    }
    //Función que pregunta si tiene dueño
    hasDuenio(){
        if(this.duenioCasillero == 0) return false;
        else return true;
    }
}
