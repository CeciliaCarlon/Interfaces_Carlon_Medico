"use strict";
let canvas = document.getElementById("miCanvas");
let ctx = canvas.getContext("2d");
let canvasW = canvas.width;
let canvasH = canvas.height;

let r = 0;
let g = 0;
let b = 0;
let a = 255;

function cargarPagina(){
    //cargo la imagen con el evento change
    document.getElementById("inputImagen").addEventListener("change", cargarImagen);
    document.getElementById("sepia").addEventListener("click", filtroSepia);
    document.getElementById("binarizacion").addEventListener("click", filtroBinarizacion);
    document.getElementById("limpiar").addEventListener("click", limpiarCanvas);
}

document.addEventListener("DOMContentLoaded", cargarPagina);
//Este metodo carga la imagen seleccionada en el selector
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

function limpiarCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

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

        imageData.data[index + 0] = 255 - r;
        imageData.data[index + 1] = 255 - g;
        imageData.data[index + 2] = 255 - b;

        imageData.data[index + 0] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
        imageData.data[index + 1] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
        imageData.data[index + 2] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
    }

    drawRect(imageData, r, g, b, a);
    ctx.putImageData( imageData, 0, 0 );
}

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