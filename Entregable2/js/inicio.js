"use strict";

function inicio(){
    //Eventos
    document.getElementById("jugar").addEventListener("click", cambiarLocation);
    //Fichas jugador 1
    document.getElementById('imagenP1N').addEventListener("click", nuevasFichas);
    document.getElementById('imagenP1H').addEventListener("click", nuevasFichas);
    document.getElementById('imagenP1O').addEventListener("click", nuevasFichas);
    //Función que cambia la locacización
    function cambiarLocation(){
        window.location = "juego.html";
    }
    //Función que crea nuevas fichas
    function nuevasFichas(e){
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
                juego.drawFichasP1(img);
            }
        }
        //Leo los datos binarios y los codigico como la URL de la imagen
        reader.readAsDataURL(urlImagen);
    }
}

document.addEventListener("DOMContentLoaded", inicio());