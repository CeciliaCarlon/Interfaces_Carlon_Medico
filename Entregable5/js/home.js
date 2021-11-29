"use strict";

function inicio(){
    document.getElementById("inputPublicar").addEventListener("click", ()=>{
        location.href = "publicar.html";
    });

    document.getElementById("crearComent").addEventListener("click", ()=>{
        let div = document.getElementById("coment");
        div.style.visibility = "visible";
        div.style.height = "44px";
        let publi = document.getElementById("publiUno");
        publi.style.height = "344px";
    });
}

document.addEventListener("DOMContentLoaded", inicio());