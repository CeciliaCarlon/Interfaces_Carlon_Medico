"use strict";

let MS = 100;

class Tiempo{
    constructor(tiempoTotal, reloj){
        this.tiempoTotal = tiempoTotal; //Puede ser dinamico con un input
        this.tiempo = this.tiempoTotal * 60; //Los segundos totales
        this.reloj = reloj; //Invoca al texto del reloj
    }

    //Disminuye el tiempo del reloj
    calcularTiempo(){
        //Si el tiempo finaliza, le informa a los jugadores y vuelve a la personalización
        if(tiempo == 0) {
            reloj.innerHTML = 'Finish';
            setTimeout(function(){ 
                divPersonalizacion.style.display = 'block';
                divJuego.style.display = 'none';
            }, 3000);
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

    setInterval(calcularTiempo, MS); //Invoca a la función cada 1000ms
}

