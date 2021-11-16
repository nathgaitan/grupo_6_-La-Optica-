const $ = id => document.getElementById(id);

let burguer = $('burguer')

let burguerMenu = $('ulhamburguesa')

burguer.addEventListener(`click`, ()=>{
    burguerMenu.classList.toggle(`mostrar`)
})


