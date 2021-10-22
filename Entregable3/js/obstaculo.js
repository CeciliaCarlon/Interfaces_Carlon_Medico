"use strict";

class Obstaculo {
    //Constructor
    constructor(positionX, positionY){
        this.positionX = positionX;
        this.positionY = positionY;
    }
    //Getters y setters
    getPositionX(){
        return this.positionX;
    }

    getPositionY(){
        return this.positionY;
    }

    setPositionX(posX){
        this.positionX = posX;
    }
    //Función que se fija dada la posición X del jugador si coincide con la posX del Obstaculo
    isColision(posXJ){
        if(posXJ == this.positionX || posXJ == (this.positionX - posXJ)){
            return true;
        } else return false;
    }
}