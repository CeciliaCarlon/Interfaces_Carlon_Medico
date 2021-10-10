"use strict";

const tiempoTotal = 10; //Puede ser dinamico con un input
let tiempo = tiempoTotal * 60; //Los segundos totales
const reloj = document.getElementById("countdown"); //Invoca al texto del reloj

setInterval(calcularTiempo, 1000); //Invoca a la función cada 1000ms

//Disminuye el tiempo del reloj
function calcularTiempo(){
    //Si el tiempo finaliza, le informa a los jugadores y vuelve al html de personalización
    if(tiempo == 0) {
        reloj.innerHTML = `Finish`;
        window.location = "index.html";
    }
    //El tiempo sigue y decrementa los segundos
    else{
        const minutos = Math.floor(tiempo / 60);
        let segundos = tiempo % 60;
        if(segundos < 10) reloj.innerHTML = `${minutos}:0${segundos}`;
        else reloj.innerHTML = `${minutos}:${segundos}`;
        tiempo --;
    }
}