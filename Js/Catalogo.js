const contenedor_tarjetas= document.getElementById("producto_container");
function CrearTarjetasProductos(prod){
    prod.forEach(producto => {
        const nuevoproducto = document.createElement("div");
        nuevoproducto.classList ="item";
        nuevoproducto.innerHTML= `
        <img src="${producto.urlImagen}">
        <h3>${producto.nombre}</h3>
        <p>$ ${producto.precio}</p>
        <button> Agregar al carrito</button>        
        `;
        contenedor_tarjetas.appendChild(nuevoproducto);
        nuevoproducto.getElementsByTagName("button")[0].addEventListener("click",()=> AgregarCarrito(producto));
    });
}

    getprod().then(productos => {
        CrearTarjetasProductos(productos);
    })
    
        
    

