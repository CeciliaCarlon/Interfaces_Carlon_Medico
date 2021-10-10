"use strict";

class Juego {
    //Constructores
    constructor(canvas, CANT_FICHAS, img1, img2){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.jugador1 = null;
        this.jugador2 = null;
        this.fichasP1 = [];
        this.fichasP2 = [];
        this.tablero = null;
        this.CANT_FICHAS = CANT_FICHAS;
        this.imgP1 = img1;
        this.imgP2 = img2;
    }
    /*constructor(){
        this.jugador1 = null;
        this.jugador2 = null;
        this.fichasP1 = [];
        this.fichasP2 = [];
        this.tablero = null;
    }*/
    //Getters y setters
    getJugador1(){
        return this.jugador1;
    }

    getJugador2(){
        return this.jugador2;
    }

    getTablero(){
        return this.tablero;
    }

    setCantFichas(cant){
        this.CANT_FICHAS = cant;
    }

    setJugadores(){
        this.jugador1 = new Jugador("jugador1", this.imgP1, this.fichasP1, true);
        this.jugador2 = new Jugador("jugador2", this.imgP2, this.fichasP2, false);
    }
    //Función que llama a todo lo necesario para un nuevo juego
    nuevoJuego(){
        this.dibujarTablero();
        setTimeout( () => {
            this.agregarFichas();
        }, 350);
        this.setJugadores();
    }
    //Función que dibuja el tablero
    dibujarTablero(){
        this.tablero = new Tablero(this.ctx, this.width, this.height, NUMBER_OF_ROWS, NUMBER_OF_COLS);
        this.tablero.drawTablero();
    }
    //Función que agrega las fichasa cada jugador
    agregarFichas(){
        //Inicializo variables
        let fichaJ1;
        let fichaJ2;
        let fichasTotales = 0;
        let fichaX = 30;
        let fichaY = 100;
        //Mientras las fichas no sean mayores al total de fichas
        while(fichasTotales < this.CANT_FICHAS){
            //Agrego y dibujo ficha de jugador 1
            fichaJ1 = new Ficha(this.ctx, this.imgP1, fichaX, fichaY);
            this.fichasP1.push(fichaJ1);
            fichaJ1.draw();
            //Agrego y dibujo ficha de jugador 2
            fichaJ2 = new Ficha(this.ctx, this.imgP2, fichaX + 1000, fichaY);
            this.fichasP2.push(fichaJ2);
            fichaJ2.draw();
            //Sumo dos a las fichas totales
            fichasTotales += 2;
            //Muevo el y para dibujarlas en distintas posiciones y que se vean todas
            fichaY += 60;
            //Cada 7 fichas cambio x e y
            if (fichasTotales % 7 == 0) {
                fichaX += 90;
                fichaY = 100;
            }
        }
    }
    //Función que dibuja las fichas para ambos jugadores
    drawFichas(){
        this.clearCanvas();
        for(let i=0; i<this.fichasP1.length; i++){
            this.fichasP1[i].draw();
        }
        for(let i=0; i<this.fichasP2.length; i++){
            this.fichasP2[i].draw();
        }
    }
    //Función que busca la ficha de un jugador
    findClickedFigure(x, y, jugador){
        //Busco las fichas según el jugador
        let element = [];
        if(jugador == 1){
            element = this.fichasP1;
        } else element = this.fichasP2;
        //Recorro cada una
        for(let i=0; i< element.length; i++){
            //Me fijo si el x e y esta dentro y la retorno de ser así
            if(element[i].isPointInside(x, y)){
                return element[i];
            }
        }
    }

    clearCanvas(){
        this.ctx.fillStyle = 'lightgrey';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.tablero.drawTablero();
    }

    drawFichasJugadores(imagen1, imagen2){
        this.clearCanvas();
        for(let i=0; i<this.fichasP1.length; i++){
            this.fichasP1[i].setImgFicha(imagen1);
            this.fichasP1[i].draw();
        }
        for(let i=0; i<this.fichasP2.length; i++){
            this.fichasP2[i].setImgFicha(imagen2);
            this.fichasP2[i].draw();
        }
        
    }
    //Busco un ganador con la última ficha insertada
    checkGanador(ficha) {
        //Checkeo que no sea null
        if(ficha != null){
            //Consigo la posición x e y
            let posY = ficha.getPosY();
            let posX = ficha.getPosX();
            //Obtengo el casillero con esas posiciones
            let casillero = this.tablero.obtenerCasillero(posX, posY);
            //Checkeo que no sea null
            if(casillero){
                //Obtengo la fila y la columna de ese casillero
                let f = casillero.getI();
                let c = casillero.getJ();
                //retorno true si cumple 4 en alguna linea
                return (this.checkVertical(c) || this.checkHorizontal(f) || this.checkDiagonalIzq(c, f) || this.checkDiagonalDer(c, f));
            } else return false;
        } else return false;
    }
    //Checkeo si hay X en vertical
    checkVertical(c) {
        //Seteo el match en 1 y la pos de la fila en 0
        let match = 1;
        let pos = 0;
        //Me traigo mi matriz de filas
        let filas = this.tablero.getFilas();
        //Mientras mi fila actual + 1 sea menor que la cantidad de filas
        while (pos + 1 < this.tablero.NUMBER_OF_ROWS) {//Es más 1 porque siempre chequeamos con el siguiente
            //Si mi posición actual y la que sigue no es null, y si tiene dueño
            if (filas[pos][c] != null && filas[pos+1][c] != null && filas[pos][c].hasDuenio()) {
                //Si mi posición actual y la que sigue tienen el mismo dueño
                if (filas[pos][c].getDuenio() == filas[pos+1][c].getDuenio()) {
                    //Sumo uno al match
                    match ++;
                    //Cuando el match sea X retorno true y dejo de buscar
                    if (match == 4){
                        return true;
                    }
                } else {
                    match = 1;
                } 
            } else {
                match = 1;
            }
            pos ++;
        }
        return false;
    }
    //Checkeo si hay X en horizontal
    checkHorizontal(f) {
        //Seteo el match en 1 y la pos de la fila en 0
        let match = 1;
        let pos = 0;
        //Me traigo mi matriz de filas
        let filas = this.tablero.getFilas();
        //Mientras mi columna actual + 1 sea menor que la cantidad de columnas
        while (pos + 1 < this.tablero.NUMBER_OF_COLS) {//Es más 1 porque siempre chequeamos con el siguiente
            //Si mi posición actual y la que sigue no es null, y si tiene dueño
            if (filas[f][pos] != null && filas[f][pos + 1] != null && filas[f][pos].hasDuenio()) {
                //Si mi posición actual y la que sigue tienen el mismo dueño
                if (filas[f][pos].getDuenio() == filas[f][pos + 1].getDuenio()) {
                    //Sumo uno al match
                    match ++;
                    //Cuando el match sea X retorno true y dejo de buscar
                    if (match == 4){
                        return true;
                    }
                } else{
                    match = 1;
                }
                    
            } else{
                match = 1;
            } 
            pos ++;
        }
        return false;
    }
    //Checkeo si hay X en diagonal desde la izquierda
    checkDiagonalIzq(c, f) {
        //Seteo el match en 1
        let match = 1;
        //Resto hasta posicionarme lo más a la izquierda posible
        while(c != 0 && f != 0){
            c--;
            f--;
        }
        //Me traigo mi matriz de filas
        let filas = this.tablero.getFilas();
        //Mientras mi columna actual + 1 sea menor que la cantidad de columnas y
        //mi fila actual más uno sea menor que la cantidad de filas
        while(c + 1< this.tablero.NUMBER_OF_COLS && f + 1 < this.tablero.NUMBER_OF_ROWS){//Es más 1 porque siempre chequeamos con el siguiente
            //Si mi diagonal actual y la que sigue no es null, y si tiene dueño
            if(filas[f][c] != null && filas[f+1][c+1] != null && filas[f][c].hasDuenio()){
                //Si mi diagonal actual y la que sigue tienen el mismo dueño
                if(filas[f][c].getDuenio() == filas[f+1][c+1].getDuenio()){
                    //Sumo uno al match
                    match ++;
                    //Cuando el match sea X retorno true y dejo de buscar
                    if (match == 4){
                        return true;
                    }
                } else {
                    match = 1
                }
            } else {
                match = 1
            }
            c++;
            f++;
        }
        return false;
    }
    //Checkeo si hay X en diagonal desde la derecha
    checkDiagonalDer(c, f) {
        //Seteo el match en 1
        let match = 1;
        //Me posiciono lo más a la derecha posible
        while(c != 6 && f != 0){
            c++;
            f--;
        }
        //Me traigo mi matriz de filas
        let filas = this.tablero.getFilas();
        //Mientras mi fila actual más uno sea menor que la cantidad de columnas y
        //mi columna actual sea mayor a 0
        while(f + 1 < this.tablero.NUMBER_OF_ROWS && c - 1 > 0){
            //Si mi diagonal actual y la que sigue no es null, y si tiene dueño
            if(filas[f][c] != null && filas[f+1][c-1] != null && filas[f][c].hasDuenio()){
                //Si mi diagonal actual y la que sigue tienen el mismo dueño
                if(filas[f][c].getDuenio() == filas[f+1][c-1].getDuenio()){
                    //Sumo uno al match
                    match ++;
                    //Cuando el match sea X retorno true y dejo de buscar
                    if (match == 4){
                        return true;
                    }
                } else {
                    match = 1
                }
            } else {
                match = 1
            }
            c--;
            f++;
        }
        return false;
    }
}