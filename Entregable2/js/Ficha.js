"use strict";

class Ficha {
    constructor(ctx, imgFicha){
        this.ctx = ctx;
        this.imgFicha = imgFicha;
        this.radio = 35;
    }

    draw(fichaX, fichaY){
        this.ctx.beginPath();
        this.ctx.arc(fichaX + this.radio, fichaY + this.radio, this.radio, 0, Math.PI * 2);
        this.ctx.drawImage(this.imgFicha, fichaX, fichaY, this.radio*2, this.radio*2);
        this.ctx.closePath();
    }

    isPointInside(x, y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
}
