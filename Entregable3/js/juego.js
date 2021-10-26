"use strict";
let posXObstaculo = 275;
let posXHueso = 384;
let cantidadHuesitos = 0;
class Juego {
    //Constructor
    constructor(personaje, fondos, puntaje, raven, lapida, hueso){
        this.personaje = personaje;
        this.fondos = fondos;
        this.obstaculos = [];
        this.huesitos = [];
        this.jugador = new Jugador(100, 350, personaje);
        this.isGameOver = false;
        this.puntaje = puntaje;
        this.raven = raven;
        this.lapida = lapida;
        this.hueso = hueso;
    }
    //Getter
    getJugador(){
        return this.jugador;
    }
    //Función que controla el fin del juego
    gameOver(){
        this.isGameOver = true;
        this.jugador.dead();
        /*for(let i=0; i < fondos.length; i++){
            fondos[i].style.setProperty('endPostition', '0px');
        }*/
    }
    //Función que checkea si agarro un huesito
    checkHuesito(){     
        if(this.huesitos[0].isColision(this.jugador)){
            // this.huesitos[0].animate([
            //     {
            //         width: '40px;',
            //         height: '38px;',
            //         transform: 'rotate(0deg);',
            //     },
            //     {
            //         width: '5px;',
            //         height: '3px;',
            //         transform: 'width: 40px;'
            //     }
            // ], 2000);
            this.hueso.classList.remove("huesito");
            this.hueso.classList.add("huesitoObtenido");
            cantidadHuesitos++;
            this.puntaje.innerHTML = "<img src='img/huesitoSmaller.png'></img> " + cantidadHuesitos;
            this.huesitos.pop(this.huesitos[0]);
        }

    }
    //Función que checkea si se choco un obstaculo
    checkObstaculos(){
        //cada 1s movemos la posX del obstaculo en 275px
        //con el hueso lo mismo but con 384px
        if(this.obstaculos[0].isColision(this.jugador)){
            //si es un obstaculo gameover
            this.gameOver();
        }  
    }
    //Función que es disparada al iniciar el juego    
    empezarJuego(obstaculo, huesito){
        //agrego las cosas
        this.huesitos.push(huesito);
        this.obstaculos.push(obstaculo);
        this.lapida.className = "lapida";
        this.raven.className = "raven";
        this.hueso.className = "huesito";
        this.personaje.style.background = "url(img/personaje/spritesheetsRUNsmaller.png) repeat-x";
        //le pongo la clase
        setInterval( () => {
            if(this.isGameOver) return;
            this.checkObstaculos();
            if(cantidadHuesitos==0) this.checkHuesito();
        }, 100);
    }
}