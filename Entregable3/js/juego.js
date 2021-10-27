"use strict";
let posXObstaculo = 275;
let posXHueso = 384;
let cantidadHuesitos = 0;
let cant = 0;
class Juego {
    //Constructor
    constructor(juego, personaje, fondos, puntaje){
        this.personaje = personaje;
        this.fondos = fondos;
        this.obstaculos = [];
        this.huesitos = [];
        this.jugador = new Jugador(100, 350, personaje);
        this.isGameOver = false;
        this.puntaje = puntaje;
        this.juego = juego;
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
    checkHuesito(huesoDiv){  
        if(this.isGameOver) return;
        setInterval(()=>{
            for(let i=0; i < this.huesitos.length; i++){
                if(this.huesitos[i].isColision(this.jugador)){
                    huesoDiv.classList.remove("huesito");
                    huesoDiv.classList.add("huesitoObtenido");
                    setTimeout(() => {huesoDiv.style.visibility= 'hidden'; huesoDiv.style.display= 'none';}, 2000);
                    cantidadHuesitos++;
                    this.puntaje.innerHTML = "<img src='img/huesitoSmaller.png'></img> " + cantidadHuesitos;
                    this.huesitos.pop(this.huesitos[i]);
                }
            } 
        }, 100);  
    }
    //Función que checkea si se choco un obstaculo
    checkObstaculos(){
        for(let i=0; i < this.obstaculos.length; i++){
            if(this.obstaculos[i].isColision(this.jugador)){
                //si es un obstaculo gameover
                this.gameOver();
            }  
        }
    }
    empezarJuego(){
        this.jugador.run();
        setTimeout(this.gameLoop(), 100);
    }
    //Función que es disparada al iniciar el juego    
    gameLoop(){

        //Generador de obtaculos (lapidas o cuervos)
       /* setInterval(() => {
            cant = Math.floor(Math.random() * (100 - 0)) + 0;
            if(cant%2==0){
                this.juego.innerHTML += "<div id='lapida'></div>";
                let lapidaDiv = document.getElementById("lapida");
                let obstLapida = new Obstaculo(1920, 350, 0);
                lapidaDiv.className = "lapida";
                this.obstaculos.push(obstLapida);         
            } else {
                this.juego.innerHTML += "<div id='raven'></div>";
                let cuervoDiv = document.getElementById("raven");
                let obstCuervo = new Obstaculo(1920, 380, 1);     
                cuervoDiv.className = "raven";
                this.obstaculos.push(obstCuervo);
            }
            setInterval( () => {
                if(this.isGameOver) return;
                this.checkObstaculos();
            }, 100);
        }, Math.floor(Math.random() * (8000 - 1000)) + 1000);*/
        
        //Generador de huesitos
        setInterval(() => {
            this.juego.innerHTML += "<div id='huesito'></div>";
            let huesoDiv = document.getElementById("huesito");
            let huesito = new Huesito(1920, 290);   
            huesoDiv.className = "huesito";
            this.huesitos.push(huesito);
            this.checkHuesito(huesoDiv);
        }, Math.floor(Math.random() * (8000 - 6000)) + 6000);
    }

}