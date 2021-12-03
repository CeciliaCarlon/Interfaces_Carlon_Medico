"use strict";

function inicio(){
    
    document.getElementById("more").addEventListener("click", ()=> {
        let div = document.getElementById("divMore");
        let more = document.getElementById("more");

        if(div.style.visibility === "visible"){
            div.style.visibility = "hidden";
            div.style.width = "none";
            div.style.height = "none";
            more.classList.remove("selected");
        } else {
            div.style.visibility = "visible";
            div.style.width = "auto";
            div.style.height = "auto";
            more.classList.add("selected");
        }
        
    });

    document.getElementById("promocionar").addEventListener("click", ()=> {
        let div = document.getElementById("divMore");
        let more = document.getElementById("more"); 
        let name = document.getElementById("name");
        let img = document.getElementById("imgPromo");

        div.style.visibility = "hidden";
        div.style.width = "0px";
        div.style.height = "0px";
        more.classList.remove("selected");
        name.classList.add("promo");
        img.style.paddingLeft = "0px";
        img.style.height = "175px";
        img.style.width = "auto";

        let iconos = document.getElementById("iconosPromo");
        iconos.innerHTML = "";
        iconos.innerHTML = "<p class='ic1 num'><i id='red' class='far fa-heart' id='like'></i> 3</p>" + 
                           "<p class='ic2 num'><i class='far fa-comments'></i> 0</p>" +
                           "<p class='ic3 num'><i class='far fa-share-square'></i> 10</p>"+
                           "<p class='ic4 num' id='bookmark'> 3 <i class='far fa-bookmark save'></i></p>";

        let book = document.getElementById("bookmark");
        let like = document.getElementById("red");
        like.style.color = "red";
        book.classList.add("left");

        let divMiPublicacion = document.getElementById("miPublicacion");
        divMiPublicacion.classList.remove("miPubli");
        divMiPublicacion.classList.add("miPubliMasGrande");
    });
}

document.addEventListener("DOMContentLoaded", inicio());