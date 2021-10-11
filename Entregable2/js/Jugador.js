"use strict";
//Variables
let turno = false;
let cont = 0;

class Jugador{
    //Constructor
    constructor(nombre, imgFicha, fichas, turno){
        this.nombre = nombre;
        this.imgFicha = imgFicha;
        this.fichas = fichas;
        this.turno = turno;
    }
    //Get y set
    getTurno(){
        return this.turno;
    }

    setTurno(valor){
        this.turno = valor;
    }
    getNombre(){
        this.nombre;
    }
    //Quitar fila cuando ya fue usada
    quitaFichaJuagada(ficha){
        this.fichas.splice(ficha);
    }
}