"use strict";

function inicio(){
    document.getElementById("cerrar").addEventListener("click", ()=>{
        location.href = "home.html";
    });

    document.getElementById("publicar").addEventListener("click", ()=>{
        location.href = "home.html";
    });

    document.getElementById("insertarFoto").addEventListener("click", ()=>{
        let img = document.getElementById("img");
        img.style.visibility = "visible";
        let text = document.getElementById("txtPubli");
        text.style.height = "80px";
    });
}

document.addEventListener("DOMContentLoaded", inicio());