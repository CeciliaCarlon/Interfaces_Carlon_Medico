"use strict";

class Jugador {
    //Constructor
    constructor(positionX, positionY, personaje){
        this.positionX = positionX;
        this.positionY = positionY;
        this.personaje = personaje;
    }
    //Getters
    getPositionX(){
        return this.positionX;
    }

    getPositionY(){
        return this.positionY;
    }
    //Función que se encarga de cambiar el spritesheet y el top cuando salta
    jump(){
        this.personaje.style.background = "url(img/personaje/spritesheetsJUMPsmaller.png) repeat-x"
        this.personaje.style.top = "320px";
    }
    //Función que se encarga de cambiar el spritesheet y el top cuando corre
    run(){
        this.personaje.style.background = "url(img/personaje/spritesheetsRUNsmaller.png) repeat-x";
        this.personaje.style.top = "400px";
    }
    //Función que se encarga de cambiar el spritesheet cuando muere
    dead(){
        this.personaje.style.background = "url(img/personaje/spritesheetsDIEsmaller.png) repeat-x";
    }
    //Función que se encarga de cambiar el spritesheet cuando se desliza
    slide(){
        this.personaje.style.background = "url(img/personaje/spritesheetsSLIDEsmaller.png) repeat-x";
    }
}