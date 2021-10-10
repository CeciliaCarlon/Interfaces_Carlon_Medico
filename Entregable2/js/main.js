"use strict";
//Variables del Canvas
let c = document.getElementById("myCanvas");

//Variables de Eventos
let ultimaColumnaSeleccionada = null;
let isMouseDown = false;
let lastClickedFigure = null;

//Variables del Tablero.
let NUMBER_OF_ROWS = 6;
let NUMBER_OF_COLS = 7;
let CANT_FICHAS = NUMBER_OF_COLS * NUMBER_OF_ROWS;

//Variables del juego
let juego = null;
let count = CANT_FICHAS;
let win = false;
let jugadorActual = 1;
//Variables de las Fichas
let imgP1 = document.getElementById('imgN');
let imgP2 = document.getElementById('imgT');

function cambiarLocation(url){
    window.location = url+".html";
    mostrar();
}

function mostrar(){
    if(window.location.href === "file:///C:/xampp/htdocs/Interfaces_Carlon_Medico/Entregable2/juego.html"){
        crearJuego();
    } else mostrarPersonalizacion();
}

function mostrarPersonalizacion(){
    //Eventos
    //document.getElementById("jugar").addEventListener("click", cambiarLocation.bind("juego"));
    document.getElementById("jugar").addEventListener("click", function(){ 
                                                                    window.location === "juego.html"; 
                                                                    crearJuego(); 
                                                                });
    
    //Fichas jugador 1
    let fichaN = document.getElementById('imgN');
    let fichaH = document.getElementById('imgH');
    let fichaO = document.getElementById('imgO');
    //fichaN.addEventListener("click", cambiarFichas.bind("N"));
    fichaN.addEventListener("click", function(){ imgP1 = fichaN; console.log(imgP1)});
    fichaH.addEventListener("click", function(){ imgP1 = fichaH; console.log(imgP1)});
    fichaO.addEventListener("click", function(){ imgP1 = fichaO; });

    //Fichas jugador 2
    let fichaT = document.getElementById('imgT');
    let fichaK = document.getElementById('imgK');
    let fichaB = document.getElementById('imgB');
    fichaT.addEventListener("click", function(){ imgP2 = fichaT; });
    fichaK.addEventListener("click", function(){ imgP2 = fichaK; });
    fichaB.addEventListener("click", function(){ imgP2 = fichaB; });
}

function crearJuego(){
    //Inicializo el juego
    let imagen1 = new Image();
    imagen1 = imgP1;
    console.log(imgP1.src);
    let imagen2 = new Image();
    imagen2 = imgP2;
    juego = new Juego(c, CANT_FICHAS, imagen1, imagen2);
    juego.nuevoJuego();
    //Eventos
    //document.getElementById('selectTamanioTablero').addEventListener('change', cambiarTamanioTablero);
    //document.getElementById('reiniciarJuego').addEventListener('click', cambiarLocation("index"), fasle);
    c.addEventListener('mousedown', onMouseDown, false);
    c.addEventListener('mouseup', onMouseUp, false);
    c.addEventListener('mousemove', onMouseMove, false);

    function onMouseDown(e){
        isMouseDown = true;
    
        if(lastClickedFigure != null){
            lastClickedFigure = null;
        }

        let clickFig = juego.findClickedFigure(e.layerX, e.layerY, jugadorActual);
        if(clickFig != null && !clickFig.getEstado()){
            lastClickedFigure = clickFig;
        }

        juego.drawFichas();
        
    }

    function onMouseUp(e){
        if(lastClickedFigure != null){
            if(posicionarFicha(e)){
                lastClickedFigure.setEstado(true);
                if(count%2==0){
                    juego.getJugador1().setTurno(false);
                    juego.getJugador2().setTurno(true);
                    jugadorActual = 2;
                    count--;
                } else {
                    juego.getJugador1().setTurno(true);
                    juego.getJugador2().setTurno(false);
                    jugadorActual = 1;
                    count--;
                }
                isMouseDown = false;
            } else {
                isMouseDown = true;
            }
        }
        //Checkeo si ya hay un ganador
        win = juego.checkGanador(lastClickedFigure);
        //Si hay redirijo la página
        if(win){
            window.location = "ganador.html";
        }
    }

    function onMouseMove(e){
        if(isMouseDown && lastClickedFigure != null){
            lastClickedFigure.setPosition(e.layerX, e.layerY);
            juego.drawFichas();
        }
    }

    function posicionarFicha(e){
        if(ultimaColumnaSeleccionada != null){
            ultimaColumnaSeleccionada = null;
        }
        let columnaElegida = juego.getTablero().obtenerColumna(e.layerX, e.layerY);
        if(columnaElegida != null){
            let casilleroElegido = juego.getTablero().obtenerFila(columnaElegida, jugadorActual); //casillero donde debe ir la ficha
            if(casilleroElegido != null){
                lastClickedFigure.setPosition(casilleroElegido.getPosXParaFicha(), casilleroElegido.getPosYParaFicha());
                juego.drawFichas();
                return true;
            } else return false;
        } else return false;
    }

    //Función que cambia el tamaño del tablero
    function cambiarTamanioTablero(){
        let valores = document.getElementById('selectTamanioTablero').value;//toma el evento desp de un click
        let tamanios = valores.split("-");
        if(tamanios != null){
            juego.getTablero().setNumberOfRows(tamanios[0]);
            juego.getTablero().setNumberOfCols(tamanios[1]); 
            let total = tamanios[0]*tamanios[1];
            juego.setCantFichas(total);          
            juego.agregarFichas();
            juego.getTablero().drawTablero();
        }
    }
}

//No funciona porque ficha no trae la letra que paso por parametro sino el evento
// function cambiarFichas(ficha){
//     switch(tipo){
//         case "N": 
//             console.log("Ficha actual"+ imgP1.src);
//             imgP1 = fichaN;
//             console.log(fichaN.src);
//             console.log("Ficha cambiada a"+ imgP1.src);
//         break;
//         case "O":
//             console.log("Ficha actual"+ imgP1.src);
//             imgP1 = fichaO;
//             console.log(fichaO.src);
//             console.log("Ficha cambiada a"+ imgP1.src);
//         break;
//     }
// }

function nuevasFichasP1(e){
    //Luego tomo la URL de la imagen con el target del evento
    let urlImagen = e.target.files[0];
    let reader = new FileReader();
    //Creo una nueva imagen con la URL como titulo
    let imagen = new Image();
    imagen.title = urlImagen.name;
    //Cuando haya cargado el reader
    reader.onload = function(e) {
        //Asigno el resultado del target como el src de la imagen
        imagen.src = e.target.result;
        //Cuando haya cargado la imagen
        imagen.onload = function(){
            //Dibujo las fichas nuevamente      
            let img = imagen;
            //img.addClass('file');
            juego.drawFichasP1(img);
        }
    }
    //Leo los datos binarios y los codigico como la URL de la imagen
    reader.readAsDataURL(urlImagen);
}

function nuevasFichasP2(e){
    //Luego tomo la URL de la imagen con el target del evento
    let urlImagen = e.target.files[0];
    let reader = new FileReader();
    //Creo una nueva imagen con la URL como titulo
    let imagen = new Image();
    imagen.title = urlImagen.name;
    //Cuando haya cargado el reader
    reader.onload = function(e) {
        //Asigno el resultado del target como el src de la imagen
        imagen.src = e.target.result;
        //Cuando haya cargado la imagen
        imagen.onload = function(){
            //Dibujo las fichas nuevamente
            let img = imagen;
            juego.drawFichasP2(img);
        }
    }
    //Leo los datos binarios y los codigico como la URL de la imagen
    reader.readAsDataURL(urlImagen);
}

document.addEventListener("DOMContentLoaded", mostrar());
