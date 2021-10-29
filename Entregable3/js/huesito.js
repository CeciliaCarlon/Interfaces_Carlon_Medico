"use strict";

class Huesito {
    //Constructor
    constructor(positionX, positionY){
        this.positionX = positionX;
        this.positionY = positionY;
    }

    //Getter y Setters
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
        //Checkeo la posición x e y del jugador y si esta dentro de los valores del muñeco retorno true
        if(jugador.getPositionX() < this.positionX && jugador.getPositionX() + 135 > this.positionX && 
        (jugador.getPositionY() == 375 || jugador.getPositionY() == 420)){
            return true;     
        } else {
            //Si la posicón es mayor a 0 resto 46.6 y sino la seteo de nuevo en 1400
            if(this.positionX > 0){
                this.positionX = this.positionX - 46.6;
            } else this.positionX = 1400;
            return false;
        }
    }
}