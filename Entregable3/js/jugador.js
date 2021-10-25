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

    setPositionY(posY){
        this.positionY = posY;
    }
    //Función que se encarga de cambiar el spritesheet y la animacion cuando salta
    jump(){
        this.personaje.style.background = "url(img/personaje/spritesheetsJUMPsmaller.png) repeat-x"
        this.setPositionY(250);
        this.personaje.style.top = "250px";
        // this.personaje.style.animation= "jump 3s infinite";
    }
    //Función que se encarga de cambiar el spritesheet y la animacion cuando cae
    // fall(){
    //     this.personaje.style.background = "url(img/personaje/spritesheetsJUMPsmaller.png) repeat-x"
    //     this.personaje.style.top = "200px";
    //     // this.personaje.style.animation= "fall 3s infinite";
    // }
    //Función que se encarga de cambiar el spritesheet y el top cuando corre
    run(){
        this.personaje.style.background = "url(img/personaje/spritesheetsRUNsmaller.png) repeat-x";
        this.personaje.style.top = "350px";
        this.setPositionY(350);
    }
    //Función que se encarga de cambiar el spritesheet cuando muere
    dead(){
        this.personaje.style.background = "url(img/personaje/spritesheetsDIEsmaller.png) repeat-x";
    }
    //Función que se encarga de cambiar el spritesheet cuando se desliza
    slide(){
        this.personaje.style.background = "url(img/personaje/spritesheetsSLIDEsmaller.png) repeat-x";
        this.setPositionY(450);
    }
}