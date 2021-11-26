"use strict";

function inicio(){
    document.getElementById("btnIngresar").addEventListener("click", ()=>{
        let userName = document.getElementById("inputNombreUsuario").value;
        let contraseña = document.getElementById("inputContraseña").value;
        if(userName == "Cecilia" || userName == "Magali"){
            if(contraseña == "Carlon" || contraseña == "Medico"){
                location.href = "home.html";
            } else {
                console.log("Contraseña inválida");
                //Acá va el chequeo de cambiar las clases para que aparezcan los errores en rojo
            }
        } else {
            console.log("E-mail o usuario inválido");
            //Acá va el chequeo de cambiar las clases para que aparezcan los errores en rojo
        }
    });
}

document.addEventListener("DOMContentLoaded", inicio());