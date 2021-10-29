"use strict";

class Jugador {
    //Constructor
    constructor(positionX, positionY, personaje){
        this.positionX = positionX;
        this.positionY = positionY;
        this.personaje = personaje;
    }
    //Getters y setter
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
        this.setPositionY(250);
        if(this.personaje.classList != "characterSaltando"){
            this.personaje.style.background = "url(img/personaje/spritesheetsJUMPsmaller.png) repeat-x";
            this.personaje.classList.remove("character");
            this.personaje.classList.add("characterSaltando");

            setTimeout(()=>{
                this.personaje.classList.remove("characterSaltando");
                this.personaje.classList.add("character");
                this.run();
            }, 1000);
        }
    }
    //Función que se encarga de cambiar el spritesheet y el top cuando corre
    run(){
        this.personaje.style.background = "url(img/personaje/spritesheetsRUNsmaller.png) repeat-x";
        this.personaje.style.top = "375px";
        this.setPositionY(375);
    }
    //Función que se encarga de cambiar el spritesheet cuando muere
    dead(){
        this.personaje.style.background = "url(img/personaje/spritesheetsDIEsmaller.png)";
        setTimeout(() => {
            this.personaje.style.diplay = "none";
            this.personaje.style.visibility = "hidden";
        }, 2000);
    }
    //Función que se encarga de cambiar el spritesheet cuando se desliza
    slide(){
        if(this.personaje.style.background != "url(img/personaje/spritesheetsSLIDEsmaller.png) repeat-x"){
            this.setPositionY(420);
            this.personaje.style.background = "url(img/personaje/spritesheetsSLIDEsmaller.png) repeat-x";
            setTimeout(()=>{
                this.run();
            }, 1000);
        }  
    }
}