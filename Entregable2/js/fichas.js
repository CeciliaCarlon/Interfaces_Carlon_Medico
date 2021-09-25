const CANT_FICHAS = 21;
//variables del canvas
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let width = c.width;
let height = c.height;
//posición de las fichas
let minFichaP1X = 30;
const MAX_FICHA_P1X = c.width / 4;
let fichaP1Y = 50;
const MAX_FICHA_Y = height;
const MIN_FICHA_P2X = MAX_FICHA_P1X * 3;
const MAX_FICHA_P2X = width;
let fichaP2X = MIN_FICHA_P2X + 50;
let fichaP2Y = 50;
const RADIO = 40;
let cont = 0;
let imgP1 = document.getElementById('imgP1');
let imgP2 = document.getElementById('imgP2');
//dibujo las fichas del jugador 1
window.onload = function(){
    for(let i=0; i < CANT_FICHAS; i++){
        if( minFichaP1X < MAX_FICHA_P1X && fichaP1Y < MAX_FICHA_Y){
            ctx.drawImage(imgP1, minFichaP1X, fichaP1Y, RADIO, RADIO);
            //ctx.arc(minFichaP1X, fichaP1Y, RADIO, 0, 2 * Math.PI);
            if( i < (CANT_FICHAS / 2) -1 ){
                fichaP1Y = fichaP1Y + 60;
            } else {
                if(cont == 0){
                    fichaP1Y = 50;
                    cont++;
                } else {
                    fichaP1Y = fichaP1Y + 60;
                }
                minFichaP1X = 80;
            } 
        }
    }
    //vuelvo al principio algunos parametros para el j2
    cont = 0;
    //dibujo las fichas del jugador 2
    for(let i=0; i < CANT_FICHAS; i++){
        ctx.beginPath();
        if( fichaP2X < MAX_FICHA_P2X && fichaP2Y < MAX_FICHA_Y){
            ctx.drawImage(imgP2, fichaP2X, fichaP2Y, RADIO, RADIO);
            //ctx.arc(fichaP2X, fichaP2Y, RADIO, 0, 2 * Math.PI);
            if( i < (CANT_FICHAS / 2) -1 ){
                fichaP2Y = fichaP2Y + 60;
            } else {
                if(cont == 0){
                    fichaP2Y = 50;
                    cont++;
                } else {
                    fichaP2Y = fichaP2Y + 60;
                }
                fichaP2X = MIN_FICHA_P2X + 100;
            } 
        }
        ctx.stroke();
    }
}