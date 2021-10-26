"use strict";

class Huesito {
    //Constructor
    constructor(positionX, positionY){
        this.positionX = positionX;
        this.positionY = positionY;
    }

    //Getters y Setters
    getPosX(){
        return this.positionX;
    }
    setPosX(x){
        this.positionX = x;
    }
    getPosY(){
        return this.positionY;
    }

    //Función que se fija dada la posición X del jugador si coincide con la posX del Huesito
    isColision(jugador){
        if(jugador.getPositionX() < this.positionX && jugador.getPositionX() + 135 > this.positionX){
            return true;
            
        } else {
            if(this.positionX > 0){
                this.positionX = this.positionX - 38;
            } else this.positionX = 1920;
            return false;
        }
    }
}