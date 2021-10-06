"use strict";

class Ficha {
    constructor(ctx, imgFicha, posx, posy){
        this.ctx = ctx;
        this.imgFicha = imgFicha;
        this.radio = 35;
        this.posX = posx;
        this.posY = posy;
        this.bloqueado = false;
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    setImgFicha(imgFicha){
        this.imgFicha = imgFicha;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2);      
        //let cargarImg = function () {
            this.ctx.drawImage(this.imgFicha, this.posX, this.posY, this.radio * 2, this.radio * 2);
        //};
        //this.imgFicha.onload = cargarImg.bind(this);
        this.ctx.closePath();
    }

    isPointInside(x, y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radio*2;
    }

    setPosition(x, y){
        this.posX = x;
        this.posY = y;
    }

    getEstado(){
        return this.bloqueado;
    }
    setEstado(estado){
        this.bloqueado = estado;
    }
}
