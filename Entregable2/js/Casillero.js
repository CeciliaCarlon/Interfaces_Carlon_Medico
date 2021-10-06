"use strict";

let imgCasillero = document.getElementById("imgCasillero");


class Casillero {
    constructor(ctx, Xpos, Ypos){
        this.ctx = ctx;
        this.Xpos = Xpos;
        this.Ypos = Ypos;
        this.posXParaFicha = this.Xpos + 11;
        this.posYParaFicha = this.Ypos + 11;
        this.duenioCasillero = 0;
    }

    draw(SQUARE_SIZE){
        this.ctx.beginPath();
        this.ctx.drawImage(imgCasillero, this.Xpos, this.Ypos, SQUARE_SIZE, SQUARE_SIZE);
        this.ctx.closePath();
    }
    hasDuenio(){
        if(this.duenioCasillero == 0) return false;
        else return true;
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
    
}
