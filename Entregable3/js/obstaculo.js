"use strict";

class Obstaculo {
    //Constructor
    constructor(positionX, positionY, tipo){
        this.tipo = tipo;
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
    isColision(jugador){
        if(this.tipo == 0){
            if(jugador.getPositionX() < this.positionX && jugador.getPositionX() + 135 > this.positionX 
                && jugador.getPositionY() == this.positionY){
                return true;
            } else {
                if(this.positionX > 0){
                    this.positionX = this.positionX - 28;
                } else this.positionX = 1920;
                return false;
            }
        } else {
            if(jugador.getPositionX() < this.positionX && jugador.getPositionX() + 135 > this.positionX 
                && jugador.getPositionY() > this.positionY - 70 && jugador.getPositionY() < this.positionY){
                return true;
            } else {
                if(this.positionX > 0){
                    this.positionX = this.positionX - 28;
                } else this.positionX = 1920;
                return false;
            }
        }
    }
}