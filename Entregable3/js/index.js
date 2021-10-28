"use strict";

function inicio(){
    //Cuando apreto el botón en el div principal empieza el juego
    document.getElementById("empezar").addEventListener('click', () => {
        //Hago invisible el div de comienzo
        let divInicio = document.getElementById("inicio");
        divInicio.style.visibility = 'hidden';
        divInicio.style.display = 'none';
        //Variables
        let divJuego = document.getElementById("juego");
        let personaje = document.getElementById("character");
        let puntaje = document.getElementById("puntaje");
        let arrayFondos = document.getElementsByClassName("fondo");
        let fondos = document.getElementById("fondos");
        let gameOver = document.getElementById("gameOver"); 
        let juego = new Juego(divJuego, personaje, fondos, arrayFondos, puntaje, gameOver);
        //Empieza el juego
        juego.empezarJuego();
        //Función que llama a los eventos cuando se hace keydown sobre una tecla
        document.addEventListener("keydown", function(e){
            switch(e.keyCode){
                case 38: juego.getJugador().jump(); 
                break;
                case 39: juego.getJugador().slide();
                break;
            }
        });
    });
    document.getElementById("reiniciar").addEventListener("click", () => {
        //Hago invisible el div de comienzo
        let divInicio = document.getElementById("inicio");
        divInicio.style.visibility = 'hidden';
        divInicio.style.display = 'none';
        //Variables
        let divJuego = document.getElementById("juego");
        let personaje = document.getElementById("character");
        let puntaje = document.getElementById("puntaje");
        let arrayFondos = document.getElementsByClassName("fondo");
        let fondos = document.getElementById("fondos");
        let gameOver = document.getElementById("gameOver"); 
        let juego = new Juego(divJuego, personaje, fondos, arrayFondos, puntaje, gameOver);
        //Empieza el juego
        juego.empezarJuego();
        //Función que llama a los eventos cuando se hace keydown sobre una tecla
        document.addEventListener("keydown", function(e){
            switch(e.keyCode){
                case 38: juego.getJugador().jump(); 
                break;
                case 39: juego.getJugador().slide();
                break;
            }
        });
    });

    /*function jugar(){
        //Hago invisible el div de comienzo
        let divInicio = document.getElementById("inicio");
        divInicio.style.visibility = 'hidden';
        divInicio.style.display = 'none';
        //Variables
        let divJuego = document.getElementById("juego");
        let personaje = document.getElementById("character");
        let puntaje = document.getElementById("puntaje");
        let arrayFondos = document.getElementsByClassName("fondo");
        let fondos = document.getElementById("fondos");
        let gameOver = document.getElementById("gameOver"); 
        let juego = new Juego(divJuego, personaje, fondos, arrayFondos, puntaje, gameOver);
        //Empieza el juego
        juego.empezarJuego();
        //Función que llama a los eventos cuando se hace keydown sobre una tecla
        document.addEventListener("keydown", function(e){
            switch(e.keyCode){
                case 38: juego.getJugador().jump(); 
                break;
                case 39: juego.getJugador().slide();
                break;
            }
        });
    }*/
}


document.addEventListener("DOMContentLoaded", inicio());