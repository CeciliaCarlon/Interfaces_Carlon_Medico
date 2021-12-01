"use strict";

function inicio(){

    //Header superior
    document.getElementById("menuDesplegable").addEventListener("click", ()=>{
        let menu = document.getElementById("divMenu");

        if(menu.classList.value == "menuEscondido") {
            document.getElementById("inconoMenu").classList.add("iconoDesplazado");
            menu.classList.remove("menuEscondido");
            menu.classList.add("menuDesplazado");
        } else {
            document.getElementById("inconoMenu").classList.remove("iconoDesplazado");
            menu.classList.add("menuEscondido");
            menu.classList.remove("menuDesplazado");
        }
        
    });

    document.getElementById("cerrarSesion").addEventListener("click", ()=> {
        location.href = "loginRegistrar.html";
    });

    document.getElementById("logoHome").addEventListener("click", ()=> {
        location.href = "home.html";
    });

    //Navegador inferior
    document.getElementById("home").addEventListener("click", ()=> {
        location.href = "home.html";
    });

    document.getElementById("busqueda").addEventListener("click", ()=> {
        location.href = "busqueda.html";
    });

    document.getElementById("mensajes").addEventListener("click", ()=> {
        location.href = "mensajes.html";
    });

    document.getElementById("perfil").addEventListener("click", ()=> {
        location.href = "perfil.html";
    });
}

document.addEventListener("DOMContentLoaded", inicio());