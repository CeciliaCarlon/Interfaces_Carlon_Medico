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
        //Tipo 0 son las lapidas y tipo 1 son los cuervos
        if(this.tipo == 0){
            //Checkeo la posición del jugador en x e y y si esta dentro de los valores del personaje retorno true
            if(jugador.getPositionX() < this.positionX && jugador.getPositionX() + 50 > this.positionX 
                && jugador.getPositionY() == this.positionY){
                return true;
            } else {
                //Si la posicón es mayor a 0 resto 20 y sino la seteo de nuevo en 1400
                if(this.positionX > 0){
                    this.positionX = this.positionX - 20;
                } else this.positionX = 1400;
                return false;
            }
        } else {
            //Checkeo la posición del jugador en x e y y si esta dentro de los valores del personaje retorno true
            if(jugador.getPositionX() < this.positionX && jugador.getPositionX() + 50 > this.positionX 
                && (jugador.getPositionY() == 375 || jugador.getPositionY() == 250)){
                return true;
            } else {
                //Si la posicón es mayor a 0 resto 20 y sino la seteo de nuevo en 1400
                if(this.positionX > 0){
                    this.positionX = this.positionX - 20;
                } else this.positionX = 1400;
                return false;
            }
        }
    }
}