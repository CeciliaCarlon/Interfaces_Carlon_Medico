"use strict";
//variables del canvas
let canvas = document.getElementById("miCanvas");
let ctx = canvas.getContext("2d");
let canvasW = canvas.width;
let canvasH = canvas.height;
let imgH = 0;
let imgW = 0;

//variables de los pixels
let r = 0;
let g = 0;
let b = 0;
let a = 255;

//variables
let pintar = false;
let lapiz = false;
let goma = false;
let colorSeteado = "black";
let grosorLapiz = 50;
let grosorGoma = 50;
let sliderLapiz = document.getElementById("tamanioLapiz")
let sliderGoma = document.getElementById("tamanioGoma")

function cargarPagina(){

    // ----------- EventListeners de pagina ------------
    //cargo la imagen con el evento change
    document.getElementById("inputImagen").addEventListener("change", cargarImagen);
    //filtros
    document.getElementById("negativo").addEventListener("click", filtroNegativo);
    document.getElementById("brillo").addEventListener("click", filtroBrillo);
    document.getElementById("sepia").addEventListener("click", filtroSepia);
    document.getElementById("binarizacion").addEventListener("click", filtroBinarizacion);
    document.getElementById("saturar").addEventListener("click", filtroSaturacion);
    document.getElementById("blur").addEventListener("click", filtroBlur);
    document.getElementById("bordes").addEventListener("click", filtroDeteccionDeBordes);
    //limpia el canvas
    document.getElementById("limpiar").addEventListener("click", limpiarCanvas);
    //lapiz y goma
    document.getElementById("lapiz").addEventListener("click", activarLapiz);
    sliderLapiz.addEventListener("click", cambiarGrosorLapiz);
    sliderGoma.addEventListener("click", cambiarGrosorGoma);
    document.getElementById("goma").addEventListener("click", activarGoma);
    document.getElementById("descargar").addEventListener("click", descargarImagen);
    //paleta de colores
    document.getElementById("btnRojo").addEventListener("click", function(){ colorSeteado = "red"; } );
    document.getElementById("btnVerde").addEventListener("click", function(){ colorSeteado = "green"; } );
    document.getElementById("btnAzul").addEventListener("click", function(){ colorSeteado = "blue"; } );
    document.getElementById("btnAmarillo").addEventListener("click", function(){ colorSeteado = "yellow"; } );
    document.getElementById("btnNaranja").addEventListener("click", function(){ colorSeteado = "orangered"; } );
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
    //guardo el tamaño real de la imagen para después descargarla
    
    

    //cuando haya cargado la imagen
    reader.onload = function(e) {
        imagen.src = e.target.result;

        imagen.onload = function(){
            /*canvasH = imagen.height;
            canvasW = imagen.width;
            console.log(imagen.width);*/
            imgW = imagen.width;
            imgH = imagen.height;

            //adapato la imagen al tamaño del canvas sin deformarla
            if(imgW < imgH){
                let porc = canvasH / imgH;
                imgW = imgW * porc;
                imgH = imgH * porc;
            } else if (imgW > imgH){
                let porc = canvasW / imgW;
                imgW = imgW * porc;
                imgH = imgH * porc;
            } else {
                let porcW = canvasW / imgW;
                let porcH = canvasH  / imgH;
                imgW = imgW * porcW;
                imgH = imgH * porcH;
            }

            ctx.drawImage(imagen, 0, 0, canvasW, canvasH);
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
        if(lapiz) {
            ctx.lineWidth = grosorLapiz;
        }else {
            ctx.lineWidth = grosorGoma;
        }
        ctx.lineCap = "round";
        ctx.lineTo(e.layerX, e.layerY);
        ctx.stroke();
        //Estas dos funciones se usan para que la linea no sea tan pixeleada
        ctx.beginPath();
        ctx.moveTo(e.layerX, e.layerY);
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
function cambiarGrosorLapiz(){
    grosorLapiz = sliderLapiz.value;
}
function cambiarGrosorGoma(){
    grosorGoma = sliderGoma.value;
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
        
        imageData.data[index + 0] = r + 10;
        imageData.data[index + 1] = g + 10;
        imageData.data[index + 2] = b + 10;
        
    }
    
    drawRect(imageData, r, g, b, a);
    ctx.putImageData( imageData, 0, 0 );
}
//Metodo del filtro Blur
function filtroBlur(){
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);
    let copia = imageData;
    function drawRect(image, r, g, b, a){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(image, x, y, r, g, b, a);
            }
        }
    }
    function setPixel(image, x, y, r, g, b, a){
        let index = (x+y*image.width) * 4;
        let promedioR = 0;
        let promedioG = 0;
        let promedioB = 0;

        let l1= [x, y];  
        let l2= [(x+1), y]; 
        let l3= [(x-1), y]; 
        let l4= [x, (y-1)]; 
        let l5= [x, (y+1)]; 
        let l6= [(x-1), (y-1)]; 
        let l7= [(x+1), (y-1)]; 
        let l8= [(x-1), (y+1)]; 
        let l9= [(x+1), (y+1)]; 
        
        let valoresR = obtenerColor(image, l1, l2, l3, l4, l5, l6, l7, l8, l9, 0);
        let valoresG = obtenerColor(image, l1, l2, l3, l4, l5, l6, l7, l8, l9, 1);
        let valoresB = obtenerColor(image, l1, l2, l3, l4, l5, l6, l7, l8, l9, 2);

        for(let m=0; m<valoresR.length; m++){
            if(valoresR[m] != null){
                promedioR = promedioR + valoresR[m];
            }
        }
        for(let m=0; m<valoresG.length; m++){
            if(valoresG[m] != null){
                promedioG = promedioG + valoresG[m];
            }
        }
        for(let m=0; m<valoresB.length; m++){
            if(valoresB[m] != null){
                promedioB = promedioB + valoresB[m];
            }
        }
        promedioR = promedioR / valoresR.length;
        promedioG = promedioG / valoresG.length;
        promedioB = promedioB / valoresB.length;

        copia.data[index + 0] = promedioR;
        copia.data[index + 1] = promedioG;
        copia.data[index + 2] = promedioB;
    }
    function obtenerColor(image, l1, l2, l3, l4, l5, l6, l7, l8, l9, poscicionColor){
        let color = [];

        let index1 = (l1[0]+l1[1]*image.width) * 4;
        let index2 = (l2[0]+l2[1]*image.width) * 4;
        let index3 = (l3[0]+l3[1]*image.width) * 4;
        let index4 = (l4[0]+l4[1]*image.width) * 4;
        let index5 = (l5[0]+l5[1]*image.width) * 4;
        let index6 = (l6[0]+l6[1]*image.width) * 4;
        let index7 = (l7[0]+l7[1]*image.width) * 4;
        let index8 = (l8[0]+l8[1]*image.width) * 4;
        let index9 = (l9[0]+l9[1]*image.width) * 4;

        color.push(image.data[index1 + poscicionColor]);
        color.push(image.data[index2 + poscicionColor]);
        color.push(image.data[index3 + poscicionColor]);
        color.push(image.data[index4 + poscicionColor]);
        color.push(image.data[index5 + poscicionColor]);
        color.push(image.data[index6 + poscicionColor]);
        color.push(image.data[index7 + poscicionColor]);
        color.push(image.data[index8 + poscicionColor]);
        color.push(image.data[index9 + poscicionColor]);

        return color;
    }
    drawRect(imageData, r, g, b, a);
    ctx.putImageData( copia, 0, 0 );
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

function filtroSaturacion(){
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
        let contraste = 100;
        let factor = (259*(contraste + 255)) / (255*(259-contraste));

        r=imageData.data[index + 0];
        g=imageData.data[index + 1];
        b=imageData.data[index + 2];
        a=imageData.data[index + 3];

        imageData.data[index + 0] = factor * (r-128) +128;
        imageData.data[index + 1] = factor * (g-128) +128;
        imageData.data[index + 2] = factor * (b-128) +128;
    }
    
    drawRect(imageData, r, g, b, a);
    ctx.putImageData( imageData, 0, 0 );
}

function filtroDeteccionDeBordes(){
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);

    //trato d pasarla a gris pa q ande
    function gris(){
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

            let grey = ( r + g + b ) / 3;

            imageData.data[index + 0] = grey;
            imageData.data[index + 1] = grey;
            imageData.data[index + 2] = grey;
        }
        
        drawRect(imageData, r, g, b, a);
        ctx.putImageData( imageData, 0, 0 );
    }
    
    gris();

    function drawRect(imageData, r, g, b){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(imageData, x, y, r, g, b);
            }
        }
    }
    function setPixel(imageData, x, y, r, g, b){
        let index = (x+y*imageData.width) * 4;

        let totalR = 0;
        let totalG = 0;
        let totalB = 0;

        let l1= [(x-1), (y+1)];
        let l2= [(x-1), y];
        let l3= [(x-1), (y-1)];
        let l4= [x, (y+1)]; 
        let l5= [x, y];  
        let l6= [x, (y-1)]; 
        let l7= [(x+1), (y+1)]; 
        let l8= [(x+1), y];     
        let l9= [(x+1), (y-1)];    
        
        let vecinosR = obtenerTotal(imageData, l1, l2, l3, l4, l5, l6, l7, l8, l9, 0);
        let vecinosG = obtenerTotal(imageData, l1, l2, l3, l4, l5, l6, l7, l8, l9, 1);
        let vecinosB = obtenerTotal(imageData, l1, l2, l3, l4, l5, l6, l7, l8, l9, 2);
        
        let sobel = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

        for(let m=0; m<=vecinosR.length; m++){
            if(vecinosR[m] != null)
                totalR =  totalR + (vecinosR[m] * sobel[m]);
        }
        for(let m=0; m<=vecinosG.length; m++){
            if(vecinosG[m] != null)
                totalG = totalG + (vecinosG[m] * sobel[m]);
        }
        for(let m=0; m<=vecinosB.length; m++){
            if(vecinosB[m] != null)
                totalB = totalB + (vecinosB[m] * sobel[m]);
        }
        /*console.log(totalR);
        console.log(totalG);
        console.log(totalB);*/
        /*if(totalR >= 0) imageData.data[index + 0] = 255;
        else imageData.data[index + 0] = 0;
        if(totalG >= 0) imageData.data[index + 1] = 255;
        else imageData.data[index + 1] = 0;
        if(totalB >= 0) imageData.data[index + 2] = 255;
        else imageData.data[index + 2] = 0;*/
        
        imageData.data[index + 0] = totalR;
        imageData.data[index + 1] = totalG;
        imageData.data[index + 2] = totalB;
    }
    function obtenerTotal(image, l1, l2, l3, l4, l5, l6, l7, l8, l9, pos){
        let vecinos = [];

        let index1 = (l1[0]+l1[1]*image.width) * 4;
        let index2 = (l2[0]+l2[1]*image.width) * 4;
        let index3 = (l3[0]+l3[1]*image.width) * 4;
        let index4 = (l4[0]+l4[1]*image.width) * 4;
        let index5 = (l5[0]+l5[1]*image.width) * 4;
        let index6 = (l6[0]+l6[1]*image.width) * 4;
        let index7 = (l7[0]+l7[1]*image.width) * 4;
        let index8 = (l8[0]+l8[1]*image.width) * 4;
        let index9 = (l9[0]+l9[1]*image.width) * 4;

        vecinos.push(image.data[index9 + pos]);
        vecinos.push(image.data[index8 + pos]);
        vecinos.push(image.data[index7 + pos]);
        vecinos.push(image.data[index6 + pos]);
        vecinos.push(image.data[index5 + pos]);
        vecinos.push(image.data[index4 + pos]);
        vecinos.push(image.data[index3 + pos]);
        vecinos.push(image.data[index2 + pos]);
        vecinos.push(image.data[index1 + pos]);

        return vecinos;
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
        a.width = imgW;
        a.height = imgH;
        console.log(a.width + "imagen: " + imgW);
        a.download = "canvas-image.png";
        a.click();
    }
}