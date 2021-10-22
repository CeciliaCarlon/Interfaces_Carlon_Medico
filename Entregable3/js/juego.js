"use strict";
let posXObstaculo = 275;
let posXHueso = 384;
class Juego {
    //Constructor
    constructor(personaje){
        this.personaje = personaje;
        this.obstaculos = [];
        this.jugador = new Jugador(100, 400, personaje);
        this.isGameOver = false;
    }

    getJugador(){
        return this.jugador;
    }

    empezarJuego(obstaculo){
        this.obstaculos.push(obstaculo);
        setInterval( () => {
            if(this.isGameOver) return;
            //cada 1s movemos la posX del obstaculo en 275px
            let posXO = this.obstaculos[0].setPositionX(this.obstaculos[0].getPositionX() - posXObstaculo);
            let posXJ = this.jugador.getPositionX();
            //con el hueso lo mismo but con 384px
            if(posXJ - 60 > posXO < posXJ + 60){
                //si es un obstaculo gameover
                console.log("perdiste");
        }    
        }, 1000);
    }

    gameOver(){
        this.isGameOver = true;
        console.log(perdiste);
    }
}