"use strict";

function inicio(){
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
        location.href = "login_registrar.html";
    });
}

document.addEventListener("DOMContentLoaded", inicio());