"use strict";

function inicio(){
    
    document.getElementById("buscar").addEventListener("click", ()=> {
        let section = document.getElementById("sectionResultados");
        section.classList.remove("hidden");
        section.classList.add("secResultados");
        document.getElementById("inputBuscar").placeholder = "Vet";
    });
}

document.addEventListener("DOMContentLoaded", inicio());