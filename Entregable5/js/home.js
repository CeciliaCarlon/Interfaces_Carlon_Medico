"use strict";

function inicio(){
    document.getElementById("inputPublicar").addEventListener("click", ()=>{
        location.href = "publicar.html";
    });
}

document.addEventListener("DOMContentLoaded", inicio());