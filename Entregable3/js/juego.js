"use strict";
let posXObstaculo = 275;
let posXHueso = 384;
let cantidadHuesitos = 0;
class Juego {
    //Constructor
    constructor(personaje, fondos, puntaje){
        this.personaje = personaje;
        this.fondos = fondos;
        this.obstaculos = [];
        this.huesitos = [];
        this.jugador = new Jugador(100, 350, personaje);
        this.isGameOver = false;
        this.puntaje = puntaje;
    }

    getJugador(){
        return this.jugador;
    }

    gameOver(){
        this.isGameOver = true;
        this.jugador.dead();
        /*for(let i=0; i < fondos.length; i++){
            fondos[i].style.setProperty('endPostition', '0px');
        }*/
    }

    checkHuesito(){     
        if(this.huesitos[0].isColision(this.jugador)){
            cantidadHuesitos++;
            this.puntaje.innerHTML = "<img src='img/huesitoSmaller.png'></img> " + cantidadHuesitos;
            this.huesitos.pop(this.huesitos[0]);
        }

    }

    checkObstaculos(){
        //cada 1s movemos la posX del obstaculo en 275px
        //con el hueso lo mismo but con 384px
        if(this.obstaculos[0].isColision(this.jugador)){
            //si es un obstaculo gameover
            this.gameOver();
        }  
    }
    
    empezarJuego(obstaculo, huesito){
        this.huesitos.push(huesito);
        this.obstaculos.push(obstaculo);
        setInterval( () => {
            if(this.isGameOver) return;
            //this.checkObstaculos();
            this.checkHuesito();
        }, 100);
    }

}