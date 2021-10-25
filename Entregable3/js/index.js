"use strict";

let personaje = document.getElementById("character");
let obstaculo = new Obstaculo(1920, 350, 0);
let obstaculo2 = new Obstaculo(1920, 380, 1);
let huesito = new Huesito(1920, 290);
let puntaje = document.getElementById("puntaje");
let fondos = [document.getElementsByClassName("fondo1"), document.getElementsByClassName("fondo2"),
document.getElementsByClassName("fondo3"), document.getElementsByClassName("fondo4"), 
document.getElementsByClassName("fondo5"), document.getElementsByClassName("fondo6"), 
document.getElementsByClassName("fondo7")];
let juego = new Juego(personaje, fondos, puntaje);

function inicio(){
    juego.empezarJuego(obstaculo2, huesito);
    document.addEventListener("keydown", function(e){
        switch(e.keyCode){
            case 38: juego.getJugador().jump(); 
            break;
            case 32: juego.getJugador().dead();
            break;
            case 39: juego.getJugador().slide();
            break;
        }
    });
    document.addEventListener("keyup", function(){
        juego.getJugador().run();
    })

}

document.addEventListener("DOMContentLoaded", inicio());