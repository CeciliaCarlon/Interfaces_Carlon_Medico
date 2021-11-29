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
        publi.style.height = "514px";
    });

    document.getElementById("like").addEventListener("click", ()=>{
        let heart = document.getElementById("like");
        if(heart.classList.contains("far")){
            heart.classList.remove("far");
            heart.classList.add("fas");
        } else {
            heart.classList.remove("fas");
            heart.classList.add("far");
        }
    });

    document.getElementById("btnDer").addEventListener("click", ()=>{
        let img1 = document.getElementById("img1");
        let img2 = document.getElementById("img2");
        let img3 = document.getElementById("img3");

        if(img1.classList.contains("visible")) {
            img1.classList.remove("visible");
            img1.classList.add("no-visible");
            img1.style.width = "0px";
            img2.classList.remove("no-visible");
            img2.classList.add("visible");
            img2.style.width = "auto";
        } else if (img2.classList.contains("visible")) {
            img2.classList.remove("visible");
            img2.classList.add("no-visible");
            img2.style.width = "0px";
            img3.classList.remove("no-visible");
            img3.classList.add("visible");
            img3.style.width = "auto";
        }
    });

    document.getElementById("btnIzq").addEventListener("click", ()=>{
        let img1 = document.getElementById("img1");
        let img2 = document.getElementById("img2");
        let img3 = document.getElementById("img3");

        if(img2.classList.contains("visible")) {
            img2.classList.remove("visible");
            img2.classList.add("no-visible");
            img2.style.width = "0px";
            img1.classList.remove("no-visible");
            img1.classList.add("visible");
            img1.style.width = "auto";
        } else if (img3.classList.contains("visible")) {
            img3.classList.remove("visible");
            img3.classList.add("no-visible");
            img3.style.width = "0px";
            img2.classList.remove("no-visible");
            img2.classList.add("visible");
            img2.style.width = "auto";
        }
    });

    document.getElementById("verComentarios").addEventListener("click", ()=>{
        let div = document.getElementById("ocultos");
        let publi = document.getElementById("publiUno");

        if(div.classList.contains("no-visible")) {
            div.classList.remove("no-visible");
            div.classList.add("visible");
            div.style.height = "132px";
            publi.style.height = "646px";
        } else {
            div.classList.remove("visible");
            div.classList.add("no-visible");
            div.style.height = "0px";
            publi.style.height = "514px";
        }
    });
}

document.addEventListener("DOMContentLoaded", inicio());