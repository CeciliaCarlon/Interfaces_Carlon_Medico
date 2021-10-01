"use strict";

class Juego {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.width = canvas.width;//no me toma el this.ctx.width;
        this.height = canvas.height;//no me toma el this.ctx.height;
        this.jugador1 = null;
        this.jugador2 = null;
        this.fichasP1 = [];
        this.fichasP2 = [];
        this.tablero = null;
    }

    nuevoJuego(){
        this.setJugadores();
        this.dibujarTablero();
        setTimeout( () => {
            this.agregarFichas();
        }, 350);
    }

    dibujarTablero(){
        this.tablero = new Tablero(this.ctx, this.width, this.height, NUMBER_OF_ROWS, NUMBER_OF_COLS);
        this.tablero.drawTablero();
    }

    setJugadores(){
        this.jugador1 = new Jugador("jugador1", imgP1, this.fichasP1);
        this.jugador2 = new Jugador("jugador2", imgP2, this.fichasP2);
    }

    agregarFichas(){
        let fichaJ1;
        let fichaJ2;
        let fichasTotales = 0;
        let fichaX = 30;
        let fichaY = 100;
        while(fichasTotales < CANT_FICHAS){
            //Ficha jugador 1
            fichaJ1 = new Ficha(this.ctx, imgP1, fichaX, fichaY);
            this.fichasP1.push(fichaJ1);
            fichaJ1.draw();
            //Ficha jugador 2
            fichaJ2 = new Ficha(this.ctx, imgP2, fichaX + 1000, fichaY);
            this.fichasP2.push(fichaJ2);
            fichaJ2.draw();
            fichasTotales += 2;
            fichaY += 60;
            if (fichasTotales % 7 == 0) {
                fichaX += 90;
                fichaY = 100;
            }
        }
    }

    drawFichas(){
        this.clearCanvas();
        for(let i=0; i<this.fichasP1.length; i++){
            this.fichasP1[i].draw();
        }
        for(let i=0; i<this.fichasP2.length; i++){
            this.fichasP2[i].draw();
        }
    }

    findClickedFigure(x, y){//se le puede pasar por parametro el jugador para q no haya dos for
        for(let i=0; i<this.fichasP1.length; i++){
            const element = this.fichasP1[i];
            if(element.isPointInside(x, y)){
                return element;
            }
        }
        for(let i=0; i<this.fichasP2.length; i++){
            const element = this.fichasP2[i];
            if(element.isPointInside(x, y)){
                return element;
            }
        }
    }

    clearCanvas(){
        this.ctx.fillStyle = 'white';
        this.tablero.drawTablero();
    }
}