"use strict";
let juego = null;
function inicio(){
    //juego = new Juego();
    //Eventos
    document.getElementById("jugar").addEventListener("click", cambiarLocation);
    /*document.getElementById('inputImagenP1').addEventListener("change", nuevasFichasP1);
    document.getElementById('inputImagenP2').addEventListener("change", nuevasFichasP2);
    document.getElementById('selectTamanioTablero').addEventListener('change', cambiarTamanioTablero);*/
    
    function cambiarLocation(){
        window.location = "juego.html";
    }
    
    /*function nuevasFichasP1(e){
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
    //Función que cambia el tamaño del tablero
    function cambiarTamanioTablero(){
        let valores = document.getElementById('selectTamanioTablero').value;
        let tamanios = valores.split("-");
        if(tamanios != null){
            juego.getTablero().setNumberOfRows(tamanios[0]);
            juego.getTablero().setNumberOfCols(tamanios[1]);
            let total = tamanios[0]*tamanios[1];
            juego.setFichasP1(total/2);
            juego.setFichasP2(total/2);
        }
    }*/
}

document.addEventListener("DOMContentLoaded", inicio());