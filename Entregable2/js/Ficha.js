"use strict";

class Ficha {
    //Constructor
    constructor(ctx, imgFicha, posx, posy){
        this.ctx = ctx;
        this.imgFicha = imgFicha;
        this.radio = 35;
        this.posX = posx;
        this.posY = posy;
        this.bloqueado = false;
    }
    //Getter y setters
    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    getEstado(){
        return this.bloqueado;
    }

    setPosition(x, y){
        this.posX = x;
        this.posY = y;
    }
    
    setEstado(estado){
        this.bloqueado = estado;
    }

    setImgFicha(imgFicha){
        this.imgFicha = imgFicha;
    }
    //Función que dibuja la ficha
    draw(){
        this.ctx.beginPath();   
        this.ctx.drawImage(this.imgFicha, this.posX, this.posY, this.radio * 2, this.radio * 2);
        this.ctx.closePath();
    }
    //Función que se fija si el x e y pasados por parametro están dentro del x e y de la ficha
    isPointInside(x, y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radio*2;
    }
}
