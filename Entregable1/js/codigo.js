"use strict";
//Variables del canvas
let canvas = document.getElementById("miCanvas");
let ctx = canvas.getContext("2d");
let canvasW = canvas.width;
let canvasH = canvas.height;
let imgH = 0;
let imgW = 0;
let copia = ctx.getImageData(0,0,canvasW,canvasH);;
//Variables de los pixels
let r = 0;
let g = 0;
let b = 0;
let a = 255;
//Variables del lapiz y goma
let pintar = false;
let lapiz = false;
let goma = false;
let colorSeteado = "black";
let grosorLapiz = 50;
let grosorGoma = 50;
let botonLapiz = document.getElementById("lapiz");
let sliderLapiz = document.getElementById("tamanioLapiz");
let botonGoma = document.getElementById("goma");
let sliderGoma = document.getElementById("tamanioGoma");
let inputColores = document.getElementById("btnColores")
//Función para cargar la página
function cargarPagina(){
    // ----------- EventListeners de pagina ------------
    //Cargo la imagen con el evento change
    document.getElementById("inputImagen").addEventListener("change", cargarImagen);
    //Descarga de la imagen
    document.getElementById("descargar").addEventListener("click", descargarImagen);
    //Filtros 
    document.getElementById("negativo").addEventListener("click", filtroNegativo);
    document.getElementById("brillo").addEventListener("click", filtroBrillo);
    document.getElementById("sepia").addEventListener("click", filtroSepia);
    document.getElementById("binarizacion").addEventListener("click", filtroBinarizacion);
    document.getElementById("saturar").addEventListener("click", filtroSaturacion);
    document.getElementById("blur").addEventListener("click", filtroBlur);
    document.getElementById("gris").addEventListener("click", filtroBlancoYNegro);
    document.getElementById("sobel").addEventListener("click", filtroDeteccionDeBordes);
    //Limpia el canvas
    document.getElementById("borrar").addEventListener("click", limpiarCanvas);
    document.getElementById("limpiar").addEventListener("click", limpiarImagen);
    //Lapiz y goma
    botonLapiz.addEventListener("click", actividadLapiz);
    sliderLapiz.addEventListener("click", cambiarGrosorLapiz);
    sliderGoma.addEventListener("click", cambiarGrosorGoma);
    botonGoma.addEventListener("click", actividadGoma);
    //Paleta de colores para pintar
    document.getElementById("btnRojo").addEventListener("click", function(){ colorSeteado = "red"; } );
    document.getElementById("btnVerde").addEventListener("click", function(){ colorSeteado = "green"; } );
    document.getElementById("btnAzul").addEventListener("click", function(){ colorSeteado = "blue"; } );
    document.getElementById("btnAmarillo").addEventListener("click", function(){ colorSeteado = "yellow"; } );
    document.getElementById("btnNaranja").addEventListener("click", function(){ colorSeteado = "orangered"; } );
    document.getElementById("btnNegro").addEventListener("click", function(){ colorSeteado = "black"; } );
    inputColores.addEventListener("change", function(){ colorSeteado = inputColores.value; } );
    //Seguimiento del mouse para dibujar
    canvas.addEventListener("mousedown", posicionInicio);
    canvas.addEventListener("mouseup", posicionFin);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseleave", posicionFin);
}
//Espero que cargue el DOM para cargar la página
document.addEventListener("DOMContentLoaded", cargarPagina);
//Función para carga la imagen seleccionada en el input
function cargarImagen(e){
    //Primero limpio el canvas, por si había una imagen cargada previamente
    limpiarCanvas();
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
            //Asigno el heigth y width de la imagen
            imgW = imagen.width;
            imgH = imagen.height;
            //Adapato la imagen al tamaño del canvas sin deformarla
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
            //Dibujo la imagen en el contexto de forma centrada
            if(imgW == canvasW && imgH == canvasH){
                ctx.drawImage(imagen, 0, 0, imgW, imgH);
            }   
            else {
                if(imgW != canvasW){
                    let mitadCanvas = canvasW/2;
                    let mitadImg = imgW/2;
                    let x = mitadCanvas - mitadImg;
                    ctx.drawImage(imagen, x, 0, imgW, imgH);
                } else {
                    let mitadCanvas = canvasH/2;
                    let mitadImg = imgH/2;
                    let y = mitadCanvas - mitadImg;
                    ctx.drawImage(imagen, 0, y, imgW, imgH);
                }
            }
            //Guardo una copia de la imagen original para restaurarla
            copia = ctx.getImageData(0,0,canvasW,canvasH);
        }
    }
    //Leo los datos binarios y los codigico como la URL de la imagen
    reader.readAsDataURL(urlImagen);
}
//Función para limpiar el canvas
function limpiarCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function limpiarImagen(){
    //Función que recorre la imagen y le setea los pixeles
    function draw(copia, r, g, b){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(copia, x, y, r, g, b);
            }
        }
    }
    draw(copia, r, g, b);
    //Función que setea cada pixel r g y b de la imagen según un criterio
    function setPixel(imageData, x, y, r, g, b){
        //Saco la cuenta de cual sería mi indice
        let index = (x+y*imageData.width) * 4;
        //Asigno un valor a r g y b
        r=imageData.data[index + 0];
        g=imageData.data[index + 1];
        b=imageData.data[index + 2];
    }
    //Muestro la imagen en el contexto
    ctx.putImageData(copia, 0, 0);
}
//Función para activar el lapiz
function actividadLapiz(){
    if(lapiz){
        lapiz = false;
    } else{
        goma = false;
        lapiz = true;   
    }
    //Cambia el color del boton si este está seleccionado o no
    cambiarColorBotonSeleccionado();
}
//Función para activas la goma
function actividadGoma(){
    if(goma){
        goma = false;
    } else{
        lapiz = false;
        goma = true;
    }
    //Cambia el color del boton si este está seleccionado o no
    cambiarColorBotonSeleccionado();
}
//Función para cambiar el background del boton seleccionado
function cambiarColorBotonSeleccionado(){
    //Si el lapiz esta en true cambia el css
    if(lapiz) {
        botonLapiz.style.backgroundColor = 'white';
        botonLapiz.style.color = 'black';
    }
    //Si no lo vuelve a dejar en su color natural
    else{
        botonLapiz.style.backgroundColor = 'rgb(245, 179, 88)';
        botonLapiz.style.color = 'white';
    } 
    //Si la goma esta en true cambia el css
    if(goma) {
        botonGoma.style.backgroundColor = 'white';
        botonGoma.style.color = 'black';
    }
    //Si no lo vuelve a dejar en su color natural
    else{
        botonGoma.style.backgroundColor = 'rgb(245, 179, 88)';
        botonGoma.style.color = 'white';
    } 
}
//Función que setea el atributo pintar en true e invoca a la funcion que dibuja
function posicionInicio(e){
    if(lapiz || goma){
        pintar = true;
        draw(e);
    }
}
//Función que setea el atirbuto pintar en false y comienza un nuevo camino en el contexto
function posicionFin(){
    pintar = false;
    ctx.beginPath();
}
//Función que pinta los pixeles que se encuentran en x, y de la posicion del mouse
function draw(e){
    if(pintar) {
        //Setea el grosor del lapiz o la goma
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
        //Setea el color del lapiz/goma
        if(goma){
            ctx.strokeStyle = "white";
        } else{
            ctx.strokeStyle = colorSeteado;
        }
    }
}
//Función para cambiar el color del lapiz
function cambiarColor(color){
    colorSeteado = color;
}
//Función para cambiar el grosor del lapiz
function cambiarGrosorLapiz(){
    grosorLapiz = sliderLapiz.value;
}
//Función para cambiar el grosor de la goma
function cambiarGrosorGoma(){
    grosorGoma = sliderGoma.value;
}
//Función del filtro Negativo
function filtroNegativo(){
    //Obtengo la información de la imagen que esta en el contexto del canvas
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);
    //Función que recorre la imagen y le setea los pixeles
    function draw(imageData, r, g, b){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(imageData, x, y, r, g, b);
            }
        }
    }
    draw(imageData, r, g, b);
    //Función que setea cada pixel r g y b de la imagen según un criterio
    function setPixel(imageData, x, y, r, g, b){
        //Saco la cuenta de cual sería mi indice
        let index = (x+y*imageData.width) * 4;
        //Asigno un valor a r g y b
        r=imageData.data[index + 0];
        g=imageData.data[index + 1];
        b=imageData.data[index + 2];
        /**Le resto 255 a cada color del pixel para obtener su opuesto
        *y así formar el negativo en la imagen
        */
        imageData.data[index + 0] = 255 - r;
        imageData.data[index + 1] = 255 - g;
        imageData.data[index + 2] = 255 - b;
    }
    //Muestro la imagen en el contexto
    ctx.putImageData(imageData, 0, 0);
}
//Función del filtro Brillo
function filtroBrillo(){
    //Obtengo la información de la imagen que esta en el contexto del canvas
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);
    //Función que recorre la imagen y le setea los pixeles
    function draw(imageData, r, g, b){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(imageData, x, y, r, g, b);
            }
        }
    }
    draw(imageData, r, g, b);
    //Función que setea cada pixel r g y b de la imagen según un criterio
    function setPixel(imageData, x, y, r, g, b){
        //Saco la cuenta de cual sería mi indice
        let index = (x+y*imageData.width) * 4;
        //Asigno un valor a r g y b
        r=imageData.data[index + 0];
        g=imageData.data[index + 1];
        b=imageData.data[index + 2];
        /**Le sumo una cantidad igual a cada pixel asumiendo que acercarse 
        *a blanco es obtener más brillo y así lograr el filtro
        */
        imageData.data[index + 0] = r + 10;
        imageData.data[index + 1] = g + 10;
        imageData.data[index + 2] = b + 10;
    }
    //Muestro la imagen en el contexto
    ctx.putImageData( imageData, 0, 0 );
}
//Función del filtro Blur
function filtroBlur(){
    //Obtengo la información de la imagen que esta en el contexto del canvas
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);

    let copia = imageData;
    //Función que recorre la imagen y le setea los pixeles
    function draw(imageData, r, g, b){
       for(let x=0; x < canvasW; x++){
           for(let y=0; y < canvasH; y++){
               setPixel(imageData, x, y, r, g, b);
           }
       }
    }
    draw(imageData, r, g, b);
    //Función que setea cada pixel r g y b de la imagen según un criterio
    function setPixel(image, x, y, r, g, b){
        let index = (x+y*image.width) * 4;
        let promedioR = 0;
        let promedioG = 0;
        let promedioB = 0;

        //Busco los pixeles de alrededor de x,y
        let l1= [x, y];  
        let l2= [(x+1), y]; 
        let l3= [(x-1), y]; 
        let l4= [x, (y-1)]; 
        let l5= [x, (y+1)]; 
        let l6= [(x-1), (y-1)]; 
        let l7= [(x+1), (y-1)]; 
        let l8= [(x-1), (y+1)]; 
        let l9= [(x+1), (y+1)]; 

        //Obtengo el r, g y b de cada pixel por separado y lo agrego a un array
        //Le paso las posiciones seteadas arriba, la imagen y si es 0 (red), 1 (green) o 2 (blue)
        let valoresR = obtenerColor(image, l1, l2, l3, l4, l5, l6, l7, l8, l9, 0);
        let valoresG = obtenerColor(image, l1, l2, l3, l4, l5, l6, l7, l8, l9, 1);
        let valoresB = obtenerColor(image, l1, l2, l3, l4, l5, l6, l7, l8, l9, 2);

        //A cada arreglo lo recorro y lo agrego a la suma total sin contar los null
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
        //Divido el total general por cada color y lo divido por la cantidad de pixeles para sacar el promedio
        promedioR = promedioR / valoresR.length;
        promedioG = promedioG / valoresG.length;
        promedioB = promedioB / valoresB.length;
        //Le seteo a una copia los valores del promedio en r, g y b 
        copia.data[index + 0] = promedioR;
        copia.data[index + 1] = promedioG;
        copia.data[index + 2] = promedioB;
    }
    //Funcion para obtener un color especifico de los "vecinos" del pixel x,y
    function obtenerColor(image, l1, l2, l3, l4, l5, l6, l7, l8, l9, poscicionColor){
        //Creo el arreglo para almacenar los resultados
        let color = [];
        //Saco la cuenta de cual sería mi indice con respecto a cada "vecino"
        let index1 = (l1[0]+l1[1]*image.width) * 4;
        let index2 = (l2[0]+l2[1]*image.width) * 4;
        let index3 = (l3[0]+l3[1]*image.width) * 4;
        let index4 = (l4[0]+l4[1]*image.width) * 4;
        let index5 = (l5[0]+l5[1]*image.width) * 4;
        let index6 = (l6[0]+l6[1]*image.width) * 4;
        let index7 = (l7[0]+l7[1]*image.width) * 4;
        let index8 = (l8[0]+l8[1]*image.width) * 4;
        let index9 = (l9[0]+l9[1]*image.width) * 4;

        //Agrego cada pixel a el arreglo color 
        color.push(image.data[index1 + poscicionColor]);
        color.push(image.data[index2 + poscicionColor]);
        color.push(image.data[index3 + poscicionColor]);
        color.push(image.data[index4 + poscicionColor]);
        color.push(image.data[index5 + poscicionColor]);
        color.push(image.data[index6 + poscicionColor]);
        color.push(image.data[index7 + poscicionColor]);
        color.push(image.data[index8 + poscicionColor]);
        color.push(image.data[index9 + poscicionColor]);
        //Retorno el arreglo
        return color;
    }
    //Muestro la imagen en el contexto
    ctx.putImageData( copia, 0, 0 );
}
//Función del filtro Sepia
function filtroSepia(){
    //Obtengo la información de la imagen que esta en el contexto del canvas
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);
    //Función que recorre la imagen y le setea los pixeles
    function draw(imageData, r, g, b){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(imageData, x, y, r, g, b);
            }
        }
    }
    draw(imageData, r, g, b);
    //Función que setea cada pixel r g y b de la imagen según un criterio
    function setPixel(imageData, x, y, r, g, b){
        //Saco la cuenta de cual sería mi indice
        let index = (x+y*imageData.width) * 4;
        //Asigno un valor a r g y b
        r=imageData.data[index + 0];
        g=imageData.data[index + 1];
        b=imageData.data[index + 2];
        /**Asigno un nuevo tono a r g y b sacado con una cuenta matematica
        *ya existente para poder así lograr el sepia
        */
        imageData.data[index + 0] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
        imageData.data[index + 1] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
        imageData.data[index + 2] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
    }
    //Muestro la imagen en el contexto
    ctx.putImageData( imageData, 0, 0 );
}
//Función del filtro de binarizacion
function filtroBinarizacion(){
    //Obtengo la información de la imagen que esta en el contexto del canvas
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);
    //Función que recorre la imagen y le setea los pixeles
    function draw(imageData, r, g, b){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(imageData, x, y, r, g, b);
            }
        }
    }
    draw(imageData, r, g, b, a);
    //Función que setea cada pixel r g y b de la imagen según un criterio
    function setPixel(imageData, x, y, r, g, b){
        //Saco la cuenta de cual sería mi indice
        let index = (x+y*imageData.width) * 4;
        //Máximo que puede tomar un pixel y el valor sobre el cual divido
        let max = 255;
        let div = 3;
        //Asigno un valor a r g y b
        r=imageData.data[index + 0];
        g=imageData.data[index + 1];
        b=imageData.data[index + 2];
        /**Si el valor de mi r g y b divido entre 3 es menor que el máximo
         * dividio entre 3 asigno el color negro, si no asigno el color blanco
         * para así poder lograr el efecto de binarización
        */
        if(((r+g+b)/div) < (max/div)){
            r = 0;
            g = 0;
            b = 0;
        } else {
            r = 255;
            g = 255;
            b = 255;
        }
        //Asigno el valor de cada pixel con el nuevo valor de r g y b
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
    }
    //Muestro la imagen en el contexto
    ctx.putImageData( imageData, 0, 0 );
}
//Función del filtro de saturación
function filtroSaturacion(){
    //Obtengo la información de la imagen que esta en el contexto del canvas
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);
    //Función que recorre la imagen y le setea los pixeles
    function draw(imageData, r, g, b){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(imageData, x, y, r, g, b);
            }
        }
    }
    draw(imageData, r, g, b);
    //Función que setea cada pixel r g y b de la imagen según un criterio
    function setPixel(imageData, x, y, r, g, b){
        //Saco la cuenta de cual sería mi indice
        let index = (x+y*imageData.width) * 4;
        //Asigno una variable de contraste fija para ir incrementando
        let contraste = 100;
        /**Después saco el factor de ese contraste, es decir cuanto vamos a ir
        * aumentandolo según esta cuenta matematica
        */
        let factor = (259 * (contraste + 255)) / (255 * (259 - contraste));
        //Asigno un valor a r g y b
        r=imageData.data[index + 0];
        g=imageData.data[index + 1];
        b=imageData.data[index + 2];
        /**Al final asigno el valor de los pixeles r g y b multiplicando 
         * el factor por r - 128 (la mitad de 255) y luego sumandole 128
         * para así lograr la combinación de los complementarios
         */
        imageData.data[index + 0] = factor * (r-128) +128;
        imageData.data[index + 1] = factor * (g-128) +128;
        imageData.data[index + 2] = factor * (b-128) +128;
    }
    //Muestro la imagen en el contexto
    ctx.putImageData( imageData, 0, 0 );
}
//Función filtro blanco y negro
function filtroBlancoYNegro(){
    //Obtengo la información de la imagen que esta en el contexto del canvas
    let imageData = ctx.getImageData(0,0,canvasW,canvasH);
    //Función que recorre la imagen y le setea los pixeles
    function draw(imageData, r, g, b){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(imageData, x, y, r, g, b);
            }
        }
    }
    draw(imageData, r, g, b);
    //Función que setea cada pixel r g y b de la imagen según un criterio
    function setPixel(imageData, x, y, r, g, b){
        //Saco la cuenta de cual sería mi indice
        let index = (x+y*imageData.width) * 4;
        //Asigno un valor a r g y b
        r=imageData.data[index + 0];
        g=imageData.data[index + 1];
        b=imageData.data[index + 2];  
        /**Sumo los valores de r g y b y lo divido entre 3 para así
         * formar el tono de gris adecuado para los pixels
         */
        let grey = ( r + g + b ) / 3;
        //Asigno a cada pixel el color nuevo de gris
        imageData.data[index + 0] = grey;
        imageData.data[index + 1] = grey;
        imageData.data[index + 2] = grey;
    }
    //Muestro la imagen en el contexto 
    ctx.putImageData( imageData, 0, 0 );
}
//Función de detección de bordes con la matriz de sobel
function filtroDeteccionDeBordes() {
    //Paso la imagen a blanco y negro para que detecte mejor los bordes
    filtroBlancoYNegro();
    //Obtengo la información de la imagen que esta en el contexto del canvas y creo una copia
    let imageData = ctx.getImageData(0, 0, canvasW, canvasH);
    let imageDataCopy = ctx.getImageData(0, 0, canvasW, canvasH);
    //Función que recorre la imagen y le setea los pixeles
    function draw(imageData, r, g, b){
        for(let x=0; x < canvasW; x++){
            for(let y=0; y < canvasH; y++){
                setPixel(imageData, x, y, r, g, b, canvasW, canvasH);
            }
        }
    }
    draw(imageData, r, g, b);
    function setPixel(imageData, x, y, r, g, b, w, h){
        //Obtengo la data de mi imagen y mi copia
        let data = imageData.data;
        let dataCopy= imageDataCopy.data;
        //Creo las matrices de sobel para encontrar el gradiente
        let sobelX = [[-1, 0, 1],
                    [-2, 0, 2],
                    [-1, 0, 1]];

        let sobelY = [ [-1, -2, -1],
                    [0, 0, 0],
                    [1, 2, 1]];
        //Posiciones en los ejes
        let l1= [(x-1), (y-1)];
        let l2= [x, (y-1)];
        let l3= [(x+1), (y-1)];
        let l4= [(x-1), y]; 
        let l5= [x, y];  
        let l6= [(x+1), y]; 
        let l7= [(x-1), (y+1)]; 
        let l8= [x, (y+1)];     
        let l9= [(x+1), (y+1)];   
        //Encuentro el indice por cada eje vecino
        let index1 = (l1[0]+l1[1]*w) * 4;
        let index2 = (l2[0]+l2[1]*w) * 4;
        let index3 = (l3[0]+l3[1]*w) * 4;
        let index4 = (l4[0]+l4[1]*w) * 4;
        let index5 = (l5[0]+l5[1]*w) * 4;
        let index6 = (l6[0]+l6[1]*w) * 4;
        let index7 = (l7[0]+l7[1]*w) * 4;
        let index8 = (l8[0]+l8[1]*w) * 4;
        let index9 = (l9[0]+l9[1]*w) * 4;
        //Sumo todos la data de los indices multiplicados por la matriz de sobel
        let totalX = (data[index1]*sobelX[0][0])+(data[index2]*sobelX[0][1])+(data[index3]*sobelX[0][2])
                    +(data[index4]*sobelX[1][0])+(data[index5]*sobelX[1][1])+(data[index6]*sobelX[1][2])
                    +(data[index7]*sobelX[2][0])+(data[index8]*sobelX[2][1])+(data[index9]*sobelX[2][2]);
        
        let totalY = (data[index1]*sobelY[0][0])+(data[index2]*sobelY[0][1])+(data[index3]*sobelY[0][2])
                    +(data[index4]*sobelY[1][0])+(data[index5]*sobelY[1][1])+(data[index6]*sobelY[1][2])
                    +(data[index7]*sobelY[2][0])+(data[index8]*sobelY[2][1])+(data[index9]*sobelY[2][2]);
        //Obtengo la raiz cuadrada sumando el total en x e y
        let total = Math.sqrt(Math.pow(totalX, 2) + Math.pow(totalY, 2));
        //Seteo el total a cada pixel r g y b
        dataCopy[index5 + 0] = total;
        dataCopy[index5 + 1] = total;
        dataCopy[index5 + 2] = total;
    }
    //Muestro la imagen en el contexto 
    ctx.putImageData(imageDataCopy, 0, 0);
}
//Función para descargar la imagen del canvas
function descargarImagen(){
    //Creo un nuevo elemento de tipo a
    let a = document.createElement("a");
    //Lo agrego al body
    document.body.appendChild(a);
    //Asigno las variables para poder descargarlo
    a.href = canvas.toDataURL();  
    a.width = imgW;
    a.height = imgH;
    a.download = "canvas-image.png";
    a.click();
    a.remove;
}