"use strict";

let personaje = document.getElementById("character");
let juego = new Juego(personaje);
let obstaculo = new Obstaculo(1920, 290);

function inicio(){
    juego.empezarJuego(obstaculo);
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
        personaje.style.background = "url(img/personaje/spritesheetsRUNsmaller.png) repeat-x";
        personaje.style.top = "400px";
    })

}

document.addEventListener("DOMContentLoaded", inicio());