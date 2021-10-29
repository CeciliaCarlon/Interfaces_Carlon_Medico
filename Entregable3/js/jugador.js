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
    jump(personajeSeleccionado){
        //Se setea la posición y
        this.setPositionY(250);
        //Si la clase no es saltando
        if(this.personaje.classList != "characterSaltando"){
            //Hago los cambios correspondientes
            this.personaje.style.background = "url(img/personaje/personaje" + personajeSeleccionado + "JUMP.png) repeat-x";
            this.personaje.classList.remove("character");
            this.personaje.classList.add("characterSaltando");
            //Al segundo vuelvo la animación a la normalidad (correr)
            setTimeout(()=>{
                this.personaje.classList.remove("characterSaltando");
                this.personaje.classList.add("character");
                this.run(personajeSeleccionado);
            }, 1200);
        }
    }
    //Función que se encarga de cambiar el spritesheet y el top cuando corre
    run(personajeSeleccionado){
        this.personaje.style.background = "url(img/personaje/personaje" + personajeSeleccionado + "RUN.png) repeat-x";
        this.personaje.style.top = "375px";
        this.setPositionY(375);
    }
    //Función que se encarga de cambiar el spritesheet cuando muere
    dead(personajeSeleccionado){
        this.personaje.style.background = "url(img/personaje/personaje"+personajeSeleccionado+"DIE.png)";
        //Oculto el personaje después de 1 segundo y medio
        setTimeout(() => {
            this.personaje.style.diplay = "none";
            this.personaje.style.visibility = "hidden";
        }, 1500);
    }
    //Función que se encarga de cambiar el spritesheet cuando se desliza
    slide(personajeSeleccionado){
        //Si en el backgroun no se esta deslizando
        if(this.personaje.style.background != "url(img/personaje/personaje" + personajeSeleccionado + "SLIDE.png) repeat-x"){
            //Cambio la posición del jugador y seteo el nuevo fondo
            this.setPositionY(420);
            this.personaje.style.background = "url(img/personaje/personaje" + personajeSeleccionado + "SLIDE.png) repeat-x";
            //Vuelvo a hacer que corra al segundo
            setTimeout(()=>{
                this.run(personajeSeleccionado);
            }, 1200);
        }  
    }
}