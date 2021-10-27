"use strict";

function inicio(){
    //Cuando apreto el botón en el div principal empieza el juego
    document.getElementById("empezar").addEventListener('click', () => {
        //Hago invisible el div de comienzo
        let divInicio = document.getElementById("inicio");
        divInicio.style.visibility = 'hidden';
        divInicio.style.display = 'none';
        //Variables
        let personaje = document.getElementById("character");
        let cuervo = document.getElementById("raven");
        let lapida = document.getElementById("lapida");
        let hueso = document.getElementById("huesito");
        let obstaculo = new Obstaculo(1920, 350, 0);
        let obstaculo2 = new Obstaculo(1920, 380, 1);
        let huesito = new Huesito(1920, 290);
        let puntaje = document.getElementById("puntaje");
        let fondos = [document.getElementsByClassName("fondo1"), document.getElementsByClassName("fondo2"),
        document.getElementsByClassName("fondo3"), document.getElementsByClassName("fondo4"), 
        document.getElementsByClassName("fondo5"), document.getElementsByClassName("fondo6"), 
        document.getElementsByClassName("fondo7")];
        let juego = new Juego(personaje, fondos, puntaje, raven, lapida, hueso);
        //Empieza el juego
        juego.empezarJuego(obstaculo2, huesito);
        //Función que llama a los eventos cuando se hace keydown sobre una tecla
        document.addEventListener("keydown", function(e){
            switch(e.keyCode){
                case 38: juego.getJugador().jump(); 
                break;
                case 39: juego.getJugador().slide();
                break;
            }
        });
        //Función que llama a el evento cuando se hace keyup sobre una tecla
        // document.addEventListener("keyup", function(){
        //     juego.getJugador().run();
        // })
    });
}

document.addEventListener("DOMContentLoaded", inicio());