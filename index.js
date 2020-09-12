const ajax = new XMLHttpRequest();

ajax.open('GET', 'api/datos.json');

ajax.addEventListener('load', ajaxCallback)

ajax.send();


function ajaxCallback(i) {
    if (ajax.status === 200) {
        const respuesta = ajax.response;
        const respuestaParseada = JSON.parse(respuesta);
        //Borra los productos que esten en pantalla para poder imprimir los nuevos filtrados
        borrarProductos();
        //Segun el parametro que envia desde el boton llama a una funcion o a otra
        if (i === 1) {
            caros(respuestaParseada.data)
        } else {
            baratos(respuestaParseada.data)

        }
    }
}

//Filtra y luego llama a la funcion crear productos para poder seguir con el funcionamiento
function baratos(data) {
    const elementos = data.filter((item) => !item.precioCaro);
    crearProductos(elementos)
}

function caros(data) {
    const elementos = data.filter((item) => item.precioCaro);
    crearProductos(elementos)
}

//logica, salvo la funcion borrar es casi igual al codigo de la otra clase
function borrarProductos() {
    const lista = document.getElementById("productos");
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

}

function crearProductos(elementos) {
    const elementosMapeados = elementos.map(item => crearMensaje(item));
    mostrar(elementosMapeados);
}


function mostrar(el) {
    const lista = document.getElementById("productos");
    const mensajes = el.reduce((acu, item) => {
        acu.appendChild(item)
        return acu;

    }, document.createDocumentFragment())


    lista.appendChild(mensajes);
}



function crearMensaje(msj) {
    const contenedor = document.createElement('li');
    contenedor.classList.add('item');
    contenedor.id = "item";

    const nombre = document.createElement('p');
    nombre.classList.add('nombre');
    nombre.textContent = msj.nombre;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.textContent = msj.precio;

    contenedor.appendChild(nombre);
    contenedor.appendChild(precio);

    return contenedor;
}