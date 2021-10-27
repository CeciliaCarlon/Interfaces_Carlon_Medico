"use strict";
let posXObstaculo = 275;
let posXHueso = 384;
let cantidadHuesitos = 0;
let cant = 0;
let j = 0;
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
        console.log("entre");
        if(this.isGameOver) return;
        let intervalId = setInterval(()=>{
            for(let i=0; i < this.huesitos.length; i++){
                if(this.huesitos[i].isColision(this.jugador)){
                    huesoDiv.classList.remove("huesito");
                    huesoDiv.classList.add("huesitoObtenido");
                    setTimeout(() => {this.juego.removeChild(huesoDiv)}, 2000);
                    cantidadHuesitos++;
                    this.puntaje.innerHTML = "<img src='img/huesitoSmaller.png'></img> " + cantidadHuesitos;
                    this.huesitos.pop(this.huesitos[i]);
                    clearInterval(intervalId);
                }
            } 
        }, 100);
    }
    //Función que checkea si se choco un obstaculo
    checkObstaculos(div){
        let intervalId2 = setInterval( () => {
            if(this.isGameOver) return;
            for(let i=0; i < this.obstaculos.length; i++){
                if(this.obstaculos[i].getPositionX() < 50){
                    this.juego.removeChild(div);
                }
                if(this.obstaculos[i].isColision(this.jugador)){
                    this.gameOver();
                }  
            }
            clearInterval(intervalId2);
        }, 100);
        
    }
    empezarJuego(){
        this.jugador.run();
        setInterval(()=>{
            this.gameLoop();
        }, 7000);
    }
    //Función que es disparada al iniciar el juego    
    gameLoop(){
        console.log("entre gameLoop");
        //Generador de obtaculos (lapidas o cuervos)
        setInterval(() => {
            cant = Math.floor(Math.random() * (100 - 0)) + 0;
            if(cant%2==0){
                let div = document.createElement('div');
                this.juego.appendChild(div);
                div.classList = 'lapida';
                let lapidaDiv = document.querySelector(".lapida");
                let obstLapida = new Obstaculo(1920, 350, 0);
                lapidaDiv.className = "lapida";
                this.obstaculos.push(obstLapida);
                this.checkObstaculos(lapidaDiv);
            } else {
                let div = document.createElement('div');
                this.juego.appendChild(div);
                div.classList = 'raven';
                let cuervoDiv = document.querySelector(".raven");
                let obstCuervo = new Obstaculo(1920, 380, 1);     
                cuervoDiv.className = "raven";
                this.obstaculos.push(obstCuervo);
                this.checkObstaculos(cuervoDiv)
            }
            
        }, Math.floor(Math.random() * (10000 - 7000)) + 7000);
        
        /*setInterval(()=>{
            //Generador de huesitos
            let div = document.createElement('div');
            this.juego.appendChild(div);
            div.classList = 'huesito'+j;
            let huesoDiv = document.querySelector(".huesito" + j);
            let huesito = new Huesito(1920, 290);   
            huesoDiv.classList = 'huesito';
            this.huesitos.push(huesito);
            this.checkHuesito(huesoDiv);
            j++;
        }, Math.floor(Math.random() * (8000 - 5000)) + 5000);*/
    }

}