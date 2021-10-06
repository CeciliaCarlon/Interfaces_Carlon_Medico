"use strict";

let turno = false;
let cont = 0;

class Jugador{
    constructor(nombre, imgFicha, fichas, turno){
        this.nombre = nombre;
        this.imgFicha = imgFicha;
        this.fichas = fichas;
        this.turno = turno;
    }

    getTurno(){
        return this.turno;
    }

    setTurno(valor){
        this.turno = valor;
    }

    quitaFichaJuagada(ficha){
        this.fichas.splice(ficha);
    }
}