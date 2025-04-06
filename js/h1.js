
/* PARPADEO */

const h1 = document.getElementById('titulo');

let visible = true;

setInterval( ()=>{
    visible = !visible;                      // Alterna entre visible e invisible
    h1.style.opacity = visible ? '1' : '0';  //Aplica el desvanecimiento
}, 3000);                                    //Cambia cada 3 segundos