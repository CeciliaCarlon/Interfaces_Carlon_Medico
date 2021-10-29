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
        this.quitarFondos();
        this.juego.classList.add("fondos");
        this.mensaje("Game Over");
    }
    //Función que controla cuando se gana
    gameWin(){
        this.isGameWin = true;
        this.quitarFondos();
        this.juego.classList.add("fondos");
        this.mensaje("Ganaste!");
    }
    //Función que muestra el mensaje si ganaste o perdiste
    mensaje(m){
        let time = 10;
        let timeOutId = setTimeout(()=> {
            let timeOutId2 = setTimeout(()=>{
                window.location.reload();
                clearTimeout(timeOutId2);
            }, 10000);
            intervalos.push(timeOutId);
            let h1 = document.createElement('h1');
            this.gameFinal.appendChild(h1);
            h1.classList = 'gameOver';
            h1.innerHTML = m;
            let p = document.createElement('p');
            this.gameFinal.appendChild(p);
            p.classList = 'contador';
            p.innerHTML = "El juego se reiniciara en " + time;
            setInterval(() => {
                p.innerHTML = "El juego se reiniciara en " + time;
                time--;
            }, 1000);        
            this.clearIntervalos();
            this.reestablecerValores();            
        }, 3000);
    }
    //Función que quita los fondos
    quitarFondos(){
        for(let i=0; i < this.arrayFondos.length; i++){
            let fondoActual = i+1;
            this.arrayFondos[i].classList.remove("fondo"+fondoActual);
        }
    }
    //Función que checkea si agarro un huesito
    checkHuesito(huesoDiv){
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
                } else {
                    if(this.huesitos[i].getPosX() < 20){
                        this.huesitos.pop(this.huesitos[i]);
                        if(huesoDiv.parentNode!=null){
                            this.juego.removeChild(huesoDiv);
                        }
                        console.log("Removi el div hueso");
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
                    console.log("Removi el div obs");
                    clearInterval(intervalId2);
                }, 7000);
            }
        }, 100);
        
    }
    //Función que empieza el juego
    empezarJuego(){
        this.jugador.run();
        this.moverFondo();
        this.gameLoop();
    }
    //Función que es disparada al iniciar el juego    
    gameLoop(){
        console.log("entre gameLoop");
        //Generador de obtaculos (lapidas o cuervos)
        let intervalId = setInterval(() => {
            //Agrego el intervalo a un arreglo para limpiarlos en el game over
            if(j == 0) intervalos.push(intervalId);
            //Si el juego termino
            if(this.isGameOver || this.isGameWin){  
                //Limpio el intervalo y retorno para cortar la ejecución
                clearInterval(intervalId);
                return;
            }
            //Para que la producción de lapidas y cuervos sea aleatoria usamos mathrandom
            cant = Math.floor(Math.random() * (100 - 1)) + 1;
            //Si es par crea una lapida y sino un cuervo
            if(cant%2==0){
                //Creo el div
                let div = document.createElement('div');
                this.juego.appendChild(div);
                div.classList = 'lapida';
                //Creo el obstaculo y lo agrego al arreglo
                let obstLapida = new Obstaculo(1400, 375, 0);
                this.obstaculos.push(obstLapida);
                //Checkeo si me lo choco o no
                this.checkObstaculos(div);
            } else {
                let div = document.createElement('div');
                this.juego.appendChild(div);
                div.classList = 'raven';
                let obstCuervo = new Obstaculo(1400, 480, 1);     
                this.obstaculos.push(obstCuervo);
                console.log("inserte un cuervo");
                this.checkObstaculos(div);
            }
        }, Math.floor(Math.random() * (8000 - 7000)) + 7000);
        //Intervalo de los huesos
        let intervalId2 = setInterval(()=>{
            if(j == 0) intervalos.push(intervalId2);
            if(this.isGameOver || this.isGameWin){
                clearInterval(intervalId);
                return;
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
    //Función que limpia los intervalos
    clearIntervalos(){
        for(let i=0; i < intervalos.length; i++){
            clearInterval(intervalos[i]);
        }
    }
    //Función que restablece los valores
    reestablecerValores(){
        cantidadHuesitos = 0;
        cant = 0;
        j = 0;
        intervalos = [];
    }
    //Función que mueve el fondo
    moverFondo(){
        this.fondos.classList.remove("fondoEstatico");
        for(let i=0; i < this.arrayFondos.length; i++){
            let fondoActual = i+1;
            this.arrayFondos[i].classList.add("fondo"+fondoActual);
        }
    }
}