"use strict";

// Variables generales
let posXObstaculo = 275;
let posXHueso = 384;
let cantidadHuesitos = 0;
let cant = 0;
let j = 0;
let intervalos = [];

class Juego {
    //Constructor
    constructor(juego, personaje, fondos, arrayFondos, puntaje, gameFinal, personajeSeleccionado){
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
        this.personajeSeleccionado = personajeSeleccionado;
    }

    //Getters
    getJugador(){
        return this.jugador;
    }
    getisGameOver(){
        return this.isGameOver;
    }
    getisGameWin(){
        return this.isGameWin;
    }

    //Función que controla el fin del juego
    gameOver(){
        //Cambio la variable isGameOver a true
        this.isGameOver = true;
        //Le pongo el estilo de muerte
        this.jugador.dead(this.personajeSeleccionado);
        //Remuevo los fondos
        this.quitarFondos();
        this.juego.classList.add("fondos");
        //Seteo el mensaje
        this.mensaje("Game Over");
    }

    //Función que controla cuando se gana
    gameWin(){
        //Cambio la variable isGameWin a true
        this.isGameWin = true;
        this.personaje.style.background = "url(img/personaje/personaje" + this.personajeSeleccionado + "IDLE.png)";
        //Remuevo los fondos
        this.quitarFondos();
        this.juego.classList.add("fondos");
        //Seteo el mensaje
        this.mensaje("Ganaste!");
    }

    //Función que muestra el mensaje si ganaste o perdiste
    mensaje(m){
        //Tengo la variable time para el contador del reinicio
        let time = 10;
        //A los 3 segundos empiezo la función
        let timeOutId = setTimeout(()=> {
            //A los 10 segundos recargo la pagina y limpio el intervalo
            let timeOutId2 = setTimeout(()=>{
                window.location.reload();
                clearTimeout(timeOutId2);
            }, 10000);
            //Creo el h1 del texto a mostrar
            let h1 = document.createElement('h1');
            this.gameFinal.appendChild(h1);
            h1.classList = 'gameOver';
            h1.innerHTML = m;
            //Creo el texto que lleva el contador
            let p = document.createElement('p');
            this.gameFinal.appendChild(p);
            p.classList = 'contador';
            p.innerHTML = "El juego se reiniciara en " + time;
            //Cada 1 segundo cambio el texto
            setInterval(() => {
                time--;
                p.innerHTML = "El juego se reiniciara en " + time;
            }, 1000);
            //Limpio los intervalos y restablezco los valores
            clearTimeout(timeOutId);      
            this.clearIntervalos();
            this.reestablecerValores();            
        }, 3000);
    }

    //Función que quita los fondos
    quitarFondos(){
        //Seteo el puntaje en vacio
        this.puntaje.innerHTML = "";
        //Recorro cada imagen de fondo para quitarla
        for(let i=0; i < this.arrayFondos.length; i++){
            let fondoActual = i+1;
            this.arrayFondos[i].classList.remove("fondo"+fondoActual);
        }
    }

    //Función que checkea si agarro un huesito
    checkHuesito(huesoDiv){
        //Cada 1 milisegundo checkeo si lo agarre o no
        let intervalId = setInterval( () => {
            //Agrego el intervalo al arreglo
            if(j == 0) intervalos.push(intervalId);
            //Me fijo si gano o perdio
            if(this.isGameOver || this.isGameWin){
                //Si paso alguna de esas remuevo el div que tenga padre
                if(huesoDiv.parentNode!=null){
                    this.juego.removeChild(huesoDiv);
                }
                //Limpio el intervalo y retorno
                clearInterval(intervalId);
                return;
            }
            //Por cada uno de mis huesitos
            for(let i=0; i < this.huesitos.length; i++){
                //Checkeo si colisiono
                if(this.huesitos[i].isColision(this.jugador)){
                    //Si fue asi cambio la animación
                    huesoDiv.classList.remove("huesito");
                    huesoDiv.classList.add("huesitoObtenido");
                    //Y a los 2 segundos lo elemino y limpio el intervalo
                    let timeOutId = setTimeout(() => {
                        if(huesoDiv.parentNode!=null){
                            this.juego.removeChild(huesoDiv);
                        }
                        clearTimeout(timeOutId);
                    }, 2000);
                    //Sumo uno a la cantidad de huesos y lo cambio en el HTML
                    cantidadHuesitos++;
                    this.puntaje.innerHTML = "<img src='img/huesitoSmaller.png'></img> " + cantidadHuesitos;
                    //Remuevo el hueso del arreglo
                    this.huesitos.pop(this.huesitos[i]);
                    //Si llegue a 15 gane el juego
                    if(cantidadHuesitos==15) {
                        this.isGameWin = true;
                        this.gameWin();
                    }
                    //Por último limpio el intervalo
                    clearInterval(intervalId);                    
                }
                //Si no lo choco a los 5seg lo remueve
                let timeOutId2 = setTimeout(()=>{
                    if(huesoDiv.parentNode!=null){
                        this.huesitos.pop(this.obstaculos[i]);
                        this.juego.removeChild(huesoDiv);
                        clearInterval(intervalId);
                        clearTimeout(timeOutId2);
                        return;
                    }
                }, 3000);
            } 
        }, 100);
    }

    //Función que checkea si se choco un obstaculo
    checkObstaculos(div){
        //Cada un milisegundo voy chequeando
        let intervalId2 = setInterval( () => {
            //Pusheo el intervalo
            if(j == 0) intervalos.push(intervalId2);
            //Si gano o perdio el juego
            if(this.isGameOver || this.isGameWin) {
                //Remuevo el div si tiene padre
                if(div.parentNode!=null){
                    this.juego.removeChild(div);
                }
                //Limpio el intervalo y retorno
                clearInterval(intervalId2);
                return;
            }
            //Por cada uno de mis obstaculos
            for(let i=0; i < this.obstaculos.length; i++){
                //Checkeo si colisione, y si es asi pierdo el juego
                if(this.obstaculos[i].isColision(this.jugador)){                  
                    this.gameOver();
                }
            }
        }, 100);
        //A los 7 segundo si no lo colisione lo elimino
        let timeOutId = setTimeout(()=>{
            intervalos.push(timeOutId);
            if(div.parentNode!=null){
                this.obstaculos.pop(this.obstaculos[0]);
                this.juego.removeChild(div);
                clearInterval(intervalId2);
                clearTimeout(timeOutId);
                return;
            }
        }, 5000);
    }

    //Función que empieza el juego
    empezarJuego(){
        this.jugador.run(this.personajeSeleccionado);
        this.moverFondo();
        this.gameLoop();
    }

    //Función que es disparada al iniciar el juego    
    gameLoop(){
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
                //Creo el div
                let div = document.createElement('div');
                this.juego.appendChild(div);
                div.classList = 'raven';
                //Creo el obstaculo y lo agrego al arreglo
                let obstCuervo = new Obstaculo(1400, 480, 1);     
                this.obstaculos.push(obstCuervo);
                //Checkeo si me lo choco o no
                this.checkObstaculos(div);
            }
        }, Math.floor(Math.random() * (6000 - 5000)) + 5000);
        //Intervalo de los huesos
        let intervalId2 = setInterval(()=>{
            //Agrego el intervalo al arreglo
            if(j == 0) intervalos.push(intervalId2);
            //Si perdio o gano
            if(this.isGameOver || this.isGameWin){
                //Limpio el intervalo y retorno
                clearInterval(intervalId);
                return;
            }
            //Creo el div correspondiente y agrego el elemento al arreglo
            let div = document.createElement('div');
            this.juego.appendChild(div);
            div.classList = 'huesito'+j;
            let huesoDiv = document.querySelector(".huesito" + j);
            let huesito = new Huesito(1400, 450);   
            huesoDiv.classList = 'huesito';
            this.huesitos.push(huesito);
            this.checkHuesito(huesoDiv);
            j++;
        }, Math.floor(Math.random() * (6000 - 3000)) + 3000);
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
        this.personaje.style.top = "375px";
        this.fondos.classList.remove("fondoEstatico");
        for(let i=0; i < this.arrayFondos.length; i++){
            let fondoActual = i+1;
            this.arrayFondos[i].classList.add("fondo"+fondoActual);
        }
    }
}