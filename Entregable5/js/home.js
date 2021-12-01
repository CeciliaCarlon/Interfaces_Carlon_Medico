"use strict";

function inicio(){
    document.getElementById("inputPublicar").addEventListener("click", ()=>{
        location.href = "publicar.html";
    });

    document.getElementById("crearComent").addEventListener("click", ()=>{
        let div = document.getElementById("coment");
        let oculto = document.getElementById("ocultos");
        let publi = document.getElementById("publiUno");

        div.classList.remove("no-visible");
        div.classList.add("visible");
        div.style.height = "44px";
        
        if(oculto.classList.contains("visible")){
            publi.style.height = "646px";
        } else {
            publi.style.height = "514px";
        }
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
        let p = document.getElementById("ver");
        let coment = document.getElementById("coment");

        if(div.classList.contains("no-visible")) {
            div.classList.remove("no-visible");
            div.classList.add("visible");
            div.style.height = "132px";
            if(coment.classList.contains("no-visible")){
                publi.style.height = "602px";
            } else {
                publi.style.height = "646px";
            }
            p.innerHTML = "";
            p.innerHTML = "Ocultar comentarios..."
        } else {
            div.classList.remove("visible");
            div.classList.add("no-visible");
            div.style.height = "0px";
            publi.style.height = "514px";
            p.innerHTML = "";
            p.innerHTML = "Ver 3 comentarios más..."
        }
    });

    document.getElementById("cerrar").addEventListener("click", ()=>{
        let sec = document.getElementById("ampliar");
        sec.style.height = "0px";
        sec.style.marginTop = "0px";
        sec.style.padding = "0px";
        sec.style.visibility = "hidden";
    });

    document.getElementById("ampliar").addEventListener("click", ()=>{
        let div = document.getElementById("agregar");
        if(div.classList.contains("fa-user-plus")) {
            div.classList.remove("fa-user-plus");
            div.classList.add("fa-user-clock");
        } else {
            div.classList.remove("fa-user-clock");
            div.classList.add("fa-user-plus");
        }
    });

    document.getElementById("cerrarPubli").addEventListener("click", ()=>{
        let sec = document.getElementById("publi");
        sec.style.height = "0px";
        sec.style.marginTop = "0px";
        sec.style.padding = "0px";
        sec.style.visibility = "hidden";
    });
}

document.addEventListener("DOMContentLoaded", inicio());