"use strict";

let turno = false;

class Jugador{
    constructor(nombre, imgFicha){
        this.nombre = nombre;
        this.imgFicha = imgFicha;
    }

    setTurno(valor){
        turno = valor;
    }
}