"use strict";

function inicio(){
    document.getElementById("cerrar").addEventListener("click", ()=>{
        location.href = "home.html";
    });

    document.getElementById("publicar").addEventListener("click", ()=>{
        location.href = "home.html";
    });
}

document.addEventListener("DOMContentLoaded", inicio());