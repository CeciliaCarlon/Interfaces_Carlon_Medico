 "use strict";
let posXObstaculo = 275;
let posXHueso = 384;
let cantidadHuesitos = 0;
let cant = 0;
let j = 0;
let intervalos = [];
class Juego {
    //Constructor
    constructor(juego, personaje, fondos, arrayFondos, puntaje, gameFinal){
        this.personaje = personaje;
        this.fondos = fondos;
        this.arrayFondos = arrayFondos;
        this.obstaculos = [];
        this.huesitos = [];
        this.gameFinal = gameFinal;
        this.jugador = new Jugador(100, 375, personaje);
        this.isGameOver = false;
        this.isGameWin = false;
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
        console.log("murió");
        for(let i=0; i < this.arrayFondos.length; i++){
            let fondoActual = i+1;
            this.arrayFondos[i].classList.remove("fondo"+fondoActual);
        }
        this.juego.classList.add("fondos");
        let timeOutId = setTimeout(()=> {
            intervalos.push(timeOutId);
            let h1 = document.createElement('h1');
            this.gameFinal.appendChild(h1);
            h1.classList = 'gameOver';
            h1.innerHTML = "Game Over";
            let button = document.getElementById('reiniciar');
            button.style.visibility = 'visible';
            button.style.display = 'flex';
            this.clearIntervalos();
            this.reestablecerValores();
        }, 3000);
    }

    gameWin(){

    }
    //Función que checkea si agarro un huesito
    checkHuesito(huesoDiv){
        console.log("entre");
        let intervalId = setInterval( () => {
            if(j == 0) intervalos.push(intervalId);

            if(this.isGameOver || this.isGameWin){
                if(huesoDiv.parentNode!=null){
                    this.juego.removeChild(huesoDiv);
                }
                clearInterval(intervalId);
                return;
            } 
            for(let i=0; i < this.huesitos.length; i++){
                if(this.huesitos[i].isColision(this.jugador)){
                    huesoDiv.classList.remove("huesito");
                    huesoDiv.classList.add("huesitoObtenido");
                    let timeOutId = setTimeout(() => {
                        intervalos.push(timeOutId);
                        this.juego.removeChild(huesoDiv);
                    }, 2000);
                    cantidadHuesitos++;
                    this.puntaje.innerHTML = "<img src='img/huesitoSmaller.png'></img> " + cantidadHuesitos;
                    this.huesitos.pop(this.huesitos[i]);
                    if(cantidadHuesitos==15) {
                        this.isGameWin = true;
                        this.gameWin();
                    }
                    clearInterval(intervalId);
                }
                else {
                    if(this.huesitos[i].getPosX() < 20){
                        this.huesitos.pop(this.huesitos[i]);
                        if(huesoDiv.parentNode!=null){
                            this.juego.removeChild(huesoDiv);
                        }
                        console.log("Removi el div");
                    }
                }
            } 
        }, 100);
    }
    //Función que checkea si se choco un obstaculo
    checkObstaculos(div){
        let intervalId2 = setInterval( () => {
            if(j == 0) intervalos.push(intervalId2);
            if(this.isGameOver || this.isGameWin) {
                if(div.parentNode!=null){
                    this.juego.removeChild(div);
                }
                clearInterval(intervalId2);
                return;
            } 
            for(let i=0; i < this.obstaculos.length; i++){
                if(this.obstaculos[i].isColision(this.jugador)){
                    this.gameOver();
                }  
                let timeOutId = setTimeout(()=>{
                    intervalos.push(timeOutId);
                    this.obstaculos.pop(this.obstaculos[i]);
                    if(div.parentNode!=null){
                        this.juego.removeChild(div);
                    }
                    console.log("Removi el div");
                    clearInterval(intervalId2);
                }, 7000);
            }
        }, 100);
        
    }
    empezarJuego(){
        this.jugador.run();
        this.gameLoop();
    }
    //Función que es disparada al iniciar el juego    
    gameLoop(){
        console.log("entre gameLoop");
        //Generador de obtaculos (lapidas o cuervos)
        let intervalId = setInterval(() => {
            if(j == 0) intervalos.push(intervalId);
            if(this.isGameOver){
                clearInterval(intervalId);
            }
            cant = Math.floor(Math.random() * (100 - 0)) + 0;
            console.log("Dentro del interval del gameloop");
            if(cant%2==0){
                let div = document.createElement('div');
                this.juego.appendChild(div);
                div.classList = 'lapida';
                let lapidaDiv = document.querySelector(".lapida");
                let obstLapida = new Obstaculo(1400, 375, 0);
                lapidaDiv.className = "lapida";
                this.obstaculos.push(obstLapida);
                this.checkObstaculos(div);
            } else {
                let div = document.createElement('div');
                this.juego.appendChild(div);
                div.classList = 'raven';
                let cuervoDiv = document.querySelector(".raven");
                let obstCuervo = new Obstaculo(1400, 480, 1);     
                cuervoDiv.className = "raven";
                this.obstaculos.push(obstCuervo);
                console.log("inserte un cuervo");
                this.checkObstaculos(div);
            }
            
        }, Math.floor(Math.random() * (8000 - 7000)) + 7000);
        let intervalId2 = setInterval(()=>{
            if(j == 0) intervalos.push(intervalId2);
            if(this.isGameOver){
                clearInterval(intervalId);
            }
            if(cantidadHuesitos == 15){
                this.gameWin();
                clearInterval(intervalId);
            }
            //Generador de huesitos
            let div = document.createElement('div');
            this.juego.appendChild(div);
            div.classList = 'huesito'+j;
            let huesoDiv = document.querySelector(".huesito" + j);
            let huesito = new Huesito(1400, 450);   
            huesoDiv.classList = 'huesito';
            this.huesitos.push(huesito);
            this.checkHuesito(huesoDiv);
            j++;
        }, Math.floor(Math.random() * (9000 - 6000)) + 6000);
    }

    clearIntervalos(){
        for(let i=0; i < intervalos.length; i++){
            clearInterval(intervalos[i]);
        }
    }

    reestablecerValores(){
        cantidadHuesitos = 0;
        cant = 0;
        j = 0;
        intervalos = [];
    }

}