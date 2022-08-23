document.title="Bienvenidos a mi pagina"
// hacer que los elementos cambien de color con el scroll
document.addEventListener('scroll',()=>{
    if (window.scrollY > 500) {
        document.body.classList.add('scroll_cambio');
    } else {
        document.body.classList.remove('scroll_cambio'); 
    }
});

// Animacion con GSAP
gsap.to(".titulo", {opacity:1, duration: 1});
gsap.to(".subtitulo", {opacity:1, duration: 1});
gsap.to("#logo", {x:10,opacity:1, duration: 1});
gsap.to(".loginRegist", {x:-10,opacity:1, duration: 1});
gsap.to(".menu_items", {y:-10,opacity:1, duration: 1});

// click en Login y que aparezca ventana emergente para hacer el login

let login = document.querySelector('#toggleLogin');
let loginAside =document.querySelector('#loginAside');

login.addEventListener('click',(e)=>{
    e.preventDefault()
    let loginAside =document.querySelector('#loginAside');
    loginAside.classList.add('active-login');

})
var exitLogin = document.querySelector('.exitLogin');
exitLogin.addEventListener('click',(e)=>{
    e.preventDefault()
    
     loginAside.classList.remove('active-login'); 
console.log("click")
})


var register = document.querySelector('#toggleRegister');// hacer click en palabra register con el id(toggleregister)
var registerAside = document.querySelector('#registerAside')//llamamos al contenedor del menu del registro
//tomamos la palabra donde queremos colocar el evento, y luego comprobamos con el console.log si funciona el evento click.
register.addEventListener('click',helena);
function helena(e){
    e.preventDefault();
   registerAside.classList.add('active-register'); // como necesito abrir el formulario de registro por eso anado el classList a RegisterAside.

   
}
// Queremos cerrar la ventana del menu de registro, para ello debemos crear otra funcion.
let cerrarMenuRegister =document.querySelector('.exitRegister');
cerrarMenuRegister.addEventListener('click',(e)=>{
    e.preventDefault();
    registerAside.classList.remove('active-register');
})

// creacion Timer
let dias = document.querySelector('#dias');
let horas = document.querySelector('#horas');
let minutos = document.querySelector('#minutos');
let segundos = document.querySelector('#segundos');

// crear objeto que indique la fecha final, para eso creamos una variable

// para que vaya pasando el tiempo usamos una funcion de js que es setInterval y lo de 1000 es por los segundos.

setInterval(timer,1000);

function timer(){
    let finalTime = new Date(2022, 8 ,9);
    const today= new Date();
    let diferencia= finalTime-today;

    let seconds= Math.floor(diferencia/1000 % 60);
    let minutes= Math.floor(diferencia/(1000*60) % 60);
    let hours= Math.floor(diferencia/(1000*60*60) % 24);
    let days= Math.floor(diferencia/(1000*60*60*24));

    dias.innerHTML= days;
    horas.innerHTML= hours;
    minutos.innerHTML= minutes;
    segundos.innerHTML=seconds;

}
//Categorias
// acceder y leer nuestro doc json
// obtener los datos
// filtrar las categorias y que no se repitan, lo cual debemos de obtner un array con los elementos sin repetir
// crear las columnas con las cards para cadaa categorias 

fetch("Productos_Json.json")
.then(response=>response.json())
.then(data=>{
    /*  console.log(data);  */
let categorias= data.map(element=>element.category)//accedemos a las categorias
/* console.log(categorias) */

let sinRepeticiones= new Set(categorias);// queremos que no se repita 100 elementos con el mismo nombre
/* console.log(sinRepeticiones); */

// Ahora queremos convertir los objetos que hemos obtenido en un array

let conversionArray= Array.from(sinRepeticiones)
/* console.log(conversionArray) */

// procedemos a hacer las cards
let setCategorias= document.querySelector('#setCategorias');
conversionArray.forEach(elemento=>{//llamar la variable donde tenemos las categorias guardadas y hacer el bucle forEach para que pase por cada no de los elementos guardados en esta variable.
    let col= document.createElement('div');
    col.classList.add("col-12", "col-md-4", "d-flex","justify-content-center");
    // ahora con el inner hacemos que se vea en la web el div con las class que hemos anadido

    col.innerHTML= `
    <div class="card-body card_categoria">
    <a href="./${elemento}.html"class="text-decoration-none text-reset"><h5 class="card-title m-0 p-0">${elemento}</h5></a> 
  </div>
    
    `
// hacer que sea visible en la pagina web
setCategorias.appendChild(col);
})

//Manipulacion de la 3 CARDS mas Economicas
// contar las repeticiones de los productos de las categorias mas baratas
let contador= categorias.reduce((acc, cate)=>{

 acc[cate]? acc[cate] ++ : acc[cate]= 1 

    return acc

   /*  if (acc[cate]) {
        acc[cate]+=1
    } else {
        acc[cate]=1
    } */
  
},{})

/* console.log(contador); */

// individualizar las categorias con mas productos
// Convertir el object en array

let contadorArray= Object.entries(contador)
/* console.log(contadorArray) */
let ordenados = contadorArray.sort((a,b)=>b[1]-a[1])
                            .slice(0,3)
                            .map(el=>el[0])

/* console.log(ordenados) */

let pillsTab = document.querySelector('#pills-tab');
ordenados.forEach((el,index)=>{
    let li = document.createElement('li')
    li.classList.add("nav-item", "me-4")
    li.innerHTML=`
    <button class="nav-link ${ index == 0? "active" : "" } "special_letter" id="pills-${el}-tab" data-bs-toggle="pill" data-bs-target="#pills-${el}" type="button" role="tab" aria-controls="pills-${el}" aria-selected="true">${el}</button>
    
    ` 
    pillsTab.appendChild(li);

    // filtrar las cards por categorias y ordenar de mas baratos a mas caros
    let filtrarCategorias= data.filter(element=>element.category==el)
    
    // ordenar de mas barato a mas caro
                        .sort((a,b)=>b.price-a.price)
                        .slice(0,4)

    /* console.log(filtrarCategorias)  */

    let pillsTabContent= document.querySelector('#pills-tabContent')
    let container = `<div class="container-fluid mx-0 px-0">
                        <div class="row justify-content-center">`;
    let cierres = `  </div>
                </div>`;
     let cardArticulos=filtrarCategorias.map(el=>{
        return `<div class="col-12 col-md-3">
        <div class="card border-0 my-3 mb-3" style="width: 18rem;">
            <img src="${el.image}" class="card-img-top rounded-5" alt="...">
            <div class="card-body card_aceite shadow">
              <h6 class="card-title">${el.name}</h6>
              <h4 class="card-title">${el.price}€</h4> 
              <a href="#" class="btn btn-outline-primary">Detalles</a>
            </div>
          </div>
    </div>`


    }).join("") 

    let div = document.createElement('div')
    div.classList.add("tab-pane", "fade")
    if(index ==0){
        div.classList.add("show" ,"active")
    }
div.setAttribute('id', `pills-${el}`);
div.innerHTML= `${container + cardArticulos + cierres}`

pillsTabContent.appendChild(div)
})


})
