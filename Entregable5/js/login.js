"use strict";

function inicio(){

    //Fucnion para ocultar el nav inferior en desktop
    function myFunction(x) {
        let ul = document.getElementById("navInferior");
        if (x.matches) {
            ul.classList.add("navInf");
            ul.classList.remove("sectionOculta");
        } else {
            ul.classList.remove("navInf");
            ul.classList.add("sectionOculta");
        }
    }
    var x = window.matchMedia("(max-width: 1000px)");
    myFunction(x);
    x.addEventListener("change", myFunction);

    //Mostrar el formulario de login y ocultar el formulario para registrarse
    document.getElementById("linkVolverLogin").addEventListener("click", ()=> {
        document.getElementById("sectionL").classList.remove("sectionOculta");
        document.getElementById("sectionR").classList.add("sectionOculta");
    });

    document.getElementById("iconoVolver").addEventListener("click", ()=>{
        location.href = "loginRegistrar.html";
    });

    //Ingresar a Vetgram
    document.getElementById("btnIngresar").addEventListener("click", ()=>{
        //Creo booleanos para saber si la contraseña y usuario son correctos
        let isContraseña = false;
        let isUserName = false;
        //Obtengo los inputs y mensajes de error
        let userName = document.getElementById("inputNombreUsuario");
        let contraseña = document.getElementById("inputContraseña");
        let mensajeError1 = document.getElementById("error1");
        let mensajeError2 = document.getElementById("error2");
        
        //Chequeo si el usuario es valido
        if(userName.value == "Cecilia" || userName.value == "Magali"){
            //Usuario valido, modifico las clases y seteo el booleano en true
            userName.classList.remove("error");
            mensajeError1.classList.remove("mensajeInput");
            mensajeError1.classList.add("mensajeInputOculto");
            isUserName = true;
        } else if (userName.value.length == 0) {
            //Usuario invalido, modifico las clases y creo el mensaje de error
            userName.classList.add("error");
            mensajeError1.classList.remove("mensajeInputOculto");
            mensajeError1.classList.add("mensajeInput");
            mensajeError1.innerHTML = "Campo vacío. Por favor completelo";
        } else {
            //Usuario invalido, modifico las clases y creo el mensaje de error
            userName.classList.add("error");
            mensajeError1.classList.remove("mensajeInputOculto");
            mensajeError1.classList.add("mensajeInput");
            mensajeError1.innerHTML = "E-mail o usuario invalido. Por favor ingrese otro";
        }
        //Chequeo si la contraseña es valida
        if(contraseña.value == "Carlon" || contraseña.value == "Medico"){
            //Contraseña valida, modifico las clases y seteo el booleano en true
            contraseña.classList.remove("error");
            mensajeError2.classList.add("mensajeInputOculto");
            mensajeError2.classList.remove("mensajeInput");
            isContraseña = true;
        } else if (contraseña.value.length == 0) {
            //Contraseña invalida, modifico las clases y creo un mensaje de error
            contraseña.classList.add("error");
            mensajeError2.classList.remove("mensajeInputOculto");
            mensajeError2.classList.add("mensajeInput");
            mensajeError2.innerHTML = "Campo vacío. Por favor completelo";
        } else {
            //Contraseña invalida, modifico las clases y creo un mensaje de error
            contraseña.classList.add("error");
            mensajeError2.classList.remove("mensajeInputOculto");
            mensajeError2.classList.add("mensajeInput");
            mensajeError2.innerHTML = "Contraseña invalida. Por favor ingrese otra";
        }
        //Si el usuario y contraseña son validos redirijo al home
        if(isContraseña && isUserName) {
            cargando(document.getElementById("sectionL"));
        }
    });

    //Mostrar el formulario para registrarse y ocultar el formulario de login
    document.getElementById("btnRegistrar").addEventListener("click", ()=> {
        document.getElementById("sectionL").classList.add("sectionOculta");
        document.getElementById("sectionR").classList.remove("sectionOculta");
    });

    //Registrarse en Vetgram
    document.getElementById("btnRegistrarse").addEventListener("click", ()=> {
        //Creo booleanos para saber si la contraseña y usuario son correctos
        let isEmail = false;
        let isUserName = false;
        let isContraseñaValida = false;
        let isContraseñaRepetida = false;
        //Obtengo los inputs y mensajes de error
        let email = document.getElementById("inputEmail");
        let userName = document.getElementById("inputUsuario");
        let contraseñaValida = document.getElementById("inputContraseñaValida");
        let contraseñaRepetida = document.getElementById("inputRepetirContraseña");
        let mensajeError1 = document.getElementById("mError1");
        let mensajeError2 = document.getElementById("mError2");
        let mensajeError3 = document.getElementById("mError3");
        let mensajeError4 = document.getElementById("mError4");

        let format1 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        function hasUpperCase(str) {
            return (/[A-Z]/.test(str));
        }

        //Chequeo si el email es valido
        if(email.value.includes("@gmail.com") || email.value.includes("@hotmail.com")){
            //Usuario valido, modifico las clases y seteo el booleano en true
            email.classList.remove("error");
            mensajeError1.classList.remove("mensajeInput");
            mensajeError1.classList.add("mensajeInputOculto");
            isEmail = true;
        } else if (email.value.length == 0) {
            //Usuario invalido, modifico las clases y creo el mensaje de error
            email.classList.add("error");
            mensajeError1.classList.remove("mensajeInputOculto");
            mensajeError1.classList.add("mensajeInput");
            mensajeError1.innerHTML = "Campo vacío. Por favor completelo";
        } else {
            //Usuario invalido, modifico las clases y creo el mensaje de error
            email.classList.add("error");
            mensajeError1.classList.remove("mensajeInputOculto");
            mensajeError1.classList.add("mensajeInput");
            mensajeError1.innerHTML = "Por favor insertar email tipo @gmail o @hotmail";
        }
        //Chequeo si el usuario es valido
        if(userName.value == "Cecilia" || userName.value == "Magali"){
            //Usuario invalido, modifico las clases y creo el mensaje de error
            userName.classList.add("error");
            mensajeError2.classList.remove("mensajeInputOculto");
            mensajeError2.classList.add("mensajeInput");
            mensajeError2.innerHTML = "Nombre de usuario ya existente. Por favor ingrese otro";
        } else if (userName.value.length == 0) {
            //Usuario invalido, modifico las clases y creo el mensaje de error
            userName.classList.add("error");
            mensajeError2.classList.remove("mensajeInputOculto");
            mensajeError2.classList.add("mensajeInput");
            mensajeError2.innerHTML = "Campo vacío. Por favor completelo";
        } else {
            //Usuario valido, modifico las clases y seteo el booleano en true
            userName.classList.remove("error");
            mensajeError2.classList.remove("mensajeInput");
            mensajeError2.classList.add("mensajeInputOculto");
            isUserName = true;
        }
        //Chequeo si la contraseña es valida
        if(format1.test(contraseñaValida.value) && hasUpperCase(contraseñaValida.value)){
            //Contraseña valida, modifico las clases y seteo el booleano en true
            contraseñaValida.classList.remove("error");
            mensajeError3.classList.add("mensajeInputOculto");
            mensajeError3.classList.remove("mensajeInput");
            isContraseñaValida = true;
        } else if (contraseñaValida.value.length == 0) {
            //Contraseña invalida, modifico las clases y creo un mensaje de error
            contraseñaValida.classList.add("error");
            mensajeError3.classList.remove("mensajeInputOculto");
            mensajeError3.classList.add("mensajeInput");
            mensajeError3.innerHTML = "Campo vacío. Por favor completelo";
        } else {
            //Contraseña invalida, modifico las clases y creo un mensaje de error
            contraseñaValida.classList.add("error");
            mensajeError3.classList.remove("mensajeInputOculto");
            mensajeError3.classList.add("mensajeInput");
            mensajeError3.innerHTML = "Debe tener un caracter especial y una mayuscula";
        }
        //Chequeo si la contraseña repetida es valida
        if(contraseñaRepetida.value !== contraseñaValida.value){
            //Contraseña invalida, modifico las clases y creo un mensaje de error
            contraseñaRepetida.classList.add("error");
            mensajeError4.classList.remove("mensajeInputOculto");
            mensajeError4.classList.add("mensajeInput");
            mensajeError4.innerHTML = "Las contraseñas no coinciden";
        } else if (contraseñaRepetida.value.length == 0) {
            //Contraseña invalida, modifico las clases y creo un mensaje de error
            contraseñaRepetida.classList.add("error");
            mensajeError4.classList.remove("mensajeInputOculto");
            mensajeError4.classList.add("mensajeInput");
            mensajeError4.innerHTML = "Campo vacío. Por favor completelo";
        } else {
            //Contraseña valida, modifico las clases y seteo el booleano en true
            contraseñaRepetida.classList.remove("error");
            mensajeError4.classList.add("mensajeInputOculto");
            mensajeError4.classList.remove("mensajeInput");
            isContraseñaRepetida = true;
        }
        //Si el usuario y contraseña son validos redirijo al home
        if(isEmail && isUserName && isContraseñaValida && isContraseñaRepetida) {
            cargando(document.getElementById("sectionR"));
        }
    });

    function cargando(ocultar){
        ocultar.classList.add("sectionOculta");
        let carga = document.getElementById("pantallaCarga");
        console.log(carga);
        carga.classList.remove("sectionOculta");
        carga.classList.add("pantallaCarga");
        setTimeout(()=> {
            carga.classList.add("sectionOculta");
            carga.classList.remove("pantallaCarga");
            location.href = "home.html";
        }, 3000);
    }
    
}

document.addEventListener("DOMContentLoaded", inicio());