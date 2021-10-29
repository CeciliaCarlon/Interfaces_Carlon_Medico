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
            if(jugador.getPositionX() < this.positionX && jugador.getPositionX() + 50 > this.positionX 
                && jugador.getPositionY() == this.positionY){
                return true;
            } else {
                if(this.positionX > 0){
                    this.positionX = this.positionX - 20;
                } else this.positionX = 1400;
                return false;
            }
        } else {
            console.log("po: " + this.positionX + " pj: " + jugador.getPositionX());
            if(jugador.getPositionX() < this.positionX && jugador.getPositionX() + 50 > this.positionX 
                && jugador.getPositionY() == 375){
                return true;
            } else {
                if(this.positionX > 0){
                    this.positionX = this.positionX - 20;
                } else this.positionX = 1400;
                return false;
            }
        }
    }
}