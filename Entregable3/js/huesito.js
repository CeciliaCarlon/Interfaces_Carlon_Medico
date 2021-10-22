"use strict";

class Huesito {
    //Constructor
    constructor(positionX, positionY){
        this.positionX = positionX;
        this.positionY = positionY;
    }

    getPosX(){
        return this.positionX;
    }
    setPosX(x){
        this.positionX = x;
    }
    getPosY(){
        return this.positionY;
    }
}