"use strict";
let canvas = document.getElementById("miCanvas");
let ctx = canvas.getContext("2d");
let canvasW = canvas.width;
let canvasH = canvas.height;

let r = 0;
let g = 0;
let b = 0;
let a = 255;

//variables
let pintar = false;
let lapiz = false;
let goma = false;
let colorSeteado = "black";
let grosor = 50;

function cargarPagina(){

    // ----------- EventListeners de pagina ------------
    //cargo la imagen con el evento change
    document.getElementById("inputImagen").addEventListener("change", cargarImagen);
    //filtros
    document.getElementById("negativo").addEventListener("click", filtroNegativo);
    document.getElementById("brillo").addEventListener("click", filtroBrillo);
    document.getElementById("sepia").addEventListener("click", filtroSepia);
    document.getElementById("binarizacion").addEventListener("click", filtroBinarizacion);
    document.getElementById("blur").addEventListener("click", filtroBlur);
    document.getElementById("bordes").addEventListener("click", filtroDeteccionDeBordes);
    //limpia el canvas
    document.getElementById("limpiar").addEventListener("click", limpiarCanvas);
    //lapiz y goma
    document.getElementById("lapiz").addEventListener("click", activarLapiz);
    document.getElementById("tamanioLapiz").addEventListener("click", cambiarGrosor);
    document.getElementById("goma").addEventListener("click", activarGoma);
    document.getElementById("descargar").addEventListener("click", descargarImagen);
    //paleta de colores
    document.getElementById("btnRojo").addEventListener("click", function(){ colorSeteado = "red"; } );
    document.getElementById("btnVerde").addEventListener("click", function(){ colorSeteado = "green"; } );
    document.getElementById("btnAzul").addEventListener("click", function(){ colorSeteado = "blue"; } );
    document.getElementById("btnAmarillo").addEventListener("click", function(){ colorSeteado = "yellow"; } );
    document.getElementById("btnNegro").addEventListener("click", function(){ colorSeteado = "black"; } );

    //EventListener de canvas
    canvas.addEventListener("mousedown", posicionInicio);
    canvas.addEventListener("mouseup", posicionFin);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseleave", posicionFin);
}

document.addEventListener("DOMContentLoaded", cargarPagina);
//Metodo para carga la imagen seleccionada en el selector
function cargarImagen(e){
    limpiarCanvas();
    let urlImagen = e.target.files[0];
    let reader = new FileReader();

    let imagen = new Image();
    imagen.title = urlImagen.name;

    reader.onload = function(e) {
        imagen.src = e.target.result;

        imagen.onload = function(){
            let imgW = imagen.width;
            let imgH = imagen.height;
            
            if(imgW < imgH){
                let porc = (canvasH * 100) / imgH;
                imgW = imgW * (porc/100);
                imgH = imgH * (porc/100);
            } else if (imgW > imgH){
                let porc = (canvasW * 100) / imgW;
                imgW = imgW * (porc/100);
                imgH = imgH * (porc/100);
            } else {
                let porcW = (canvasW * 100) / imgW;
                let porcH = (canvasH * 100) / imgH;
                imgW = imgW * (porcW/100);
                imgH = imgH * (porcH/100);
            }

            ctx.drawImage(imagen, 0, 0, imgW, imgH);
        }
    }

    reader.readAsDataURL(urlImagen);
}
//Metodo para limpiar el canvas
function limpiarCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
//Metodo para activar el lapiz
function activarLapiz(){
    goma = false;
    lapiz = true;
}
//Metodo para activas la goma
function activarGoma(){
    lapiz = false;
    goma = true;
}
//Metodo que setea el atributo pintar en true e invoca a la funcion que dibuja
function posicionInicio(e){
    if(lapiz || goma){
        pintar = true;
        draw(e);
    }
}
//Metodo que setea el atirbuto pintar en false y comienza un nuevo camino en el contexto
function posicionFin(){
    pintar = false;
    ctx.beginPath();
}
//Metodo que pinta los pixeles que se encuentran en x, y de la posicion del mouse
function draw(e){
    if(pintar) {
        ctx.lineWidth = grosor;
        ctx.lineCap = "round";

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        //Estas dos funciones se usan para que la linea no sea tan pixeleada
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        if(goma){
            ctx.strokeStyle = "white";
        } else{
            ctx.strokeStyle = colorSeteado;
        }
    }
}
//Metodo para cambiar el color del lapiz/goma
function cambiarColor(color){
    colorSeteado = color;
}
//Metodo para cambiar el grosor del lapiz/goma
function cambiarGrosor(){
    grosor = slider.value;
}
//Metodo del filtro Negativo
function filtroNegativo(){
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);
    
    function drawRect(imageData, r, g, b, a){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
    }
    function setPixel(imageData, x, y, r, g, b, a){
        let index = (x+y*imageData.width) * 4;
        
        r=imageData.data[index + 0];
        g=imageData.data[index + 1];
        b=imageData.data[index + 2];
        a=imageData.data[index + 3];

        imageData.data[index + 0] = 255 - r;
        imageData.data[index + 1] = 255 - g;
        imageData.data[index + 2] = 255 - b;
    }

    drawRect(imageData, r, g, b, a);
    ctx.putImageData( imageData, 0, 0 );
}
//Metodo del filtro Brillo
function filtroBrillo(){
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);
    
    function drawRect(imageData, r, g, b, a){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
    }
    function setPixel(imageData, x, y, r, g, b, a){
        let index = (x+y*imageData.width) * 4;
        
        r=imageData.data[index + 0];
        g=imageData.data[index + 1];
        b=imageData.data[index + 2];
        a=imageData.data[index + 3];

        let colores1 = RGBtoHSV(r, g, b);
        let h = colores1[0];
        let s = colores1[1];
        let v = colores1[2]+1;

        let colores2 = HSVtoRGB(h, s, v);
        
        imageData.data[index + 0] = 255 - colores2[0];
        imageData.data[index + 1] = 255 - colores2[1];
        imageData.data[index + 2] = 255 - colores2[2];
        /*
        console.log("Valores rgb")
        console.log("Rojo: "+r);
        console.log("Verde: "+g);
        console.log("Azul: "+b);
        console.log("Valores hsv");
        console.log("Hue: "+h);
        console.log("Saturacion: "+s);
        console.log("Value: "+colores1[2]+" - Value + 1: "+v);
        console.log("Valores rgb con el brillo +1");
        console.log("Rojo: "+colores2[0]);
        console.log("Verde: "+colores2[1]);
        console.log("Azul: "+colores2[2]);*/
    }
    function fmod(dividend, divisor){
        var multiplier = 0;
        while(divisor * multiplier < dividend){
            ++multiplier;
        }
        --multiplier;
        return dividend - (divisor * multiplier);
    }
    function HSVtoRGB(h, s, v) {
        let rgbRange = 255;
        let maxRGB = v;
        let minRGB = rgbRange - v;
        let hPrime = h / 60.0;
        let x1 = fmod(hPrime, 1.0);
        let x2 = 1.0 - fmod(hPrime, 1.0);

        if((hPrime >= 0) && (hPrime < 1)){
            r = maxRGB;
            g = (x1 * rgbRange) + minRGB;
            b = minRGB;
        } 
        else if ((hPrime >= 1) && (hPrime < 2)){
            r = (x2 * rgbRange) + minRGB;
            g = maxRGB;
            b = minRGB;
        }
        else if ((hPrime >= 2) && (hPrime < 3)){
            r = minRGB;
            g = maxRGB;
            b = (x1 * rgbRange) + minRGB;
        }
        else if ((hPrime >= 3) && (hPrime < 4)){
            r = minRGB;
            g = (x2 * rgbRange) + minRGB;
            b = maxRGB;
        }
        else if ((hPrime >= 4) && (hPrime < 5)){
            r = (x1 * rgbRange) + minRGB;
            g = minRGB;
            b = maxRGB; 
        }
        else if ((hPrime >= 5) && (hPrime < 6)){
            r = maxRGB;
            g = minRGB;
            b = (x2 * rgbRange) + minRGB; 
        } else{
            r = 0.0;
            g = 0.0;
            b = 0.0;
        }

        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);

        let colores = [r, g, b];
        return colores;
    }
    function RGBtoHSV (r, g, b) {
        let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
        rabs = r / 255;
        gabs = g / 255;
        babs = b / 255;
        v = Math.max(rabs, gabs, babs),
        diff = v - Math.min(rabs, gabs, babs);
        diffc = c => (v - c) / 6 / diff + 1 / 2;
        percentRoundFn = num => Math.round(num * 100) / 100;
        if (diff == 0) {
            h = s = 0;
        } else {
            s = diff / v;
            rr = diffc(rabs);
            gg = diffc(gabs);
            bb = diffc(babs);
    
            if (rabs === v) {
                h = bb - gg;
            } else if (gabs === v) {
                h = (1 / 3) + rr - bb;
            } else if (babs === v) {
                h = (2 / 3) + gg - rr;
            }
            if (h < 0) {
                h += 1;
            }else if (h > 1) {
                h -= 1;
            }
        }
        h = Math.round(h * 360);
        s = Math.round(s * 100);
        v = Math.round(v * 100);

        let colores = [h, s, v];
        return colores;

    }

    drawRect(imageData, r, g, b, a);
    ctx.putImageData( imageData, 0, 0 );
}
//Metodo del filtro Blur
function filtroBlur(){
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);
    let copia = imageData;
    function drawRect(imageData, r, g, b, a){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
    }
    function setPixel(imageData, x, y, r, g, b, a){
        let index = (x+y*imageData.width) * 4;
        let promedio = 0; 

        r=imageData.data[index + 0];
        g=imageData.data[index + 1];
        b=imageData.data[index + 2];
        a=imageData.data[index + 3];

        let l1= imageData.data[x, y];
        let l2= imageData.data[(x+1), y];
        let l3= imageData.data[(x-1), y];
        let l4= imageData.data[x, (y-1)];
        let l5= imageData.data[x, (y+1)];
        let l6= imageData.data[(x-1), (y-1)];
        let l7= imageData.data[(x+1), (y-1)];
        let l8= imageData.data[(x-1), (y+1)];
        let l9= imageData.data[(x+1), (y+1)];
        let pixelVecino = [l2, l3, l4, l5, l6, l7, l8, l9];
        let todosLosVecinos = pixelVecino.length;
        for(let m=0; m<todosLosVecinos; m++){
            if(pixelVecino[m] != null){
                promedio = promedio + pixelVecino[m];
            } else{
                pixelVecino.pop(m);
            }
        }
        promedio = promedio / pixelVecino.length;

        copia.data[index + 0] = r - promedio;
        copia.data[index + 1] = g - promedio;
        copia.data[index + 2] = b - promedio;
    }

    drawRect(imageData, r, g, b, a);
    ctx.putImageData( imageData, 0, 0 );
}
//Metodo del filtro Sepia
function filtroSepia(){
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);
    
    function drawRect(imageData, r, g, b, a){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
    }
    function setPixel(imageData, x, y, r, g, b, a){
        let index = (x+y*imageData.width) * 4;
        
        r=imageData.data[index + 0];
        g=imageData.data[index + 1];
        b=imageData.data[index + 2];
        a=imageData.data[index + 3];

        imageData.data[index + 0] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
        imageData.data[index + 1] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
        imageData.data[index + 2] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
    }

    drawRect(imageData, r, g, b, a);
    ctx.putImageData( imageData, 0, 0 );
}
//Metodo del filtro de Binarizacion
function filtroBinarizacion(){
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);
        
    function drawRect(imageData, r, g, b, a){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
    }
    function setPixel(imageData, x, y, r, g, b, a){
        let index = (x+y*imageData.width) * 4;
        let max = 255;
        let div = 3;
        r=imageData.data[index + 0];
        g=imageData.data[index + 1];
        b=imageData.data[index + 2];
        a=imageData.data[index + 3];

        if(((r+g+b)/div) < (max/div)){
            r = 0;
            g = 0;
            b = 0;
        } else {
            r = 255;
            g = 255;
            b = 255;
        }

        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
    }
    
    drawRect(imageData, r, g, b, a);
    ctx.putImageData( imageData, 0, 0 );
}

function filtroDeteccionDeBordes(){
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);
        
    function drawRect(imageData, r, g, b){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(imageData, x, y, r, g, b);
            }
        }
    }
    function setPixel(imageData, x, y, r, g, b){
        let index = (x+y*imageData.width) * 4;

        let total = 0;

        let l1= imageData.data[(x+1), (y-1)] * -1;
        let l2= imageData.data[x, (y-1)] * -2;
        let l3= imageData.data[(x-1), (y-1)] * -1;
        let l4= imageData.data[(x+1), y] * 0;
        let l5= imageData.data[x, y] * 0;
        let l6= imageData.data[(x-1), y] * 0;
        let l7= imageData.data[(x+1), (y+1)] * 1;
        let l8= imageData.data[x, (y+1)] * 2;        
        let l9= imageData.data[(x-1), (y+1)] * 1;

        total = l1 + l2 + l3 + l4 + l5 + l6 + l7 + l8 + l9;
        
        /*let pixels = [l1, l2, l3, l4, l5, l6, l7, l8, l9];
        let sobel = [-1, -2, -1, 0, 0, 0, +1, +2, +1];

        for(let m=0; m<=pixels.length; m++){
            total += pixels[m] * sobel[m];
        }*/

        if(total > 0){
            imageData.data[index + 0] = 255;
            imageData.data[index + 1] = 255;
            imageData.data[index + 2] = 255;
        } else {
            imageData.data[index + 0] = 0;
            imageData.data[index + 1] = 0;
            imageData.data[index + 2] = 0;
        }
        
    }
    
    drawRect(imageData, r, g, b, a);
    ctx.putImageData( imageData, 0, 0 );
}
//Metodo para descargar la imagen del canvas
function descargarImagen(){
    if(window.navigator.msSaveBlob){
        window.navigator.msSaveBlob(canvas.msToBlob(), "canvas-image.png");
    } else {
        let a = document.createElement("a");

        document.body.appendChild(a);
        a.href = canvas.toDataURL();
        a.download = "canvas-image.png";
        a.click();
    }
}