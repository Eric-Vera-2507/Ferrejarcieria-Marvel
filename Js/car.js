const contenedor_tarjetas= document.getElementById("prod_carrito");

function CrearTarjetasProductos(){
    contenedor_tarjetas.innerHTML="";
    const prod = JSON.parse(localStorage.getItem("productos"));
    console.log(prod);
    if(prod && prod.length > 0){
        prod.forEach(producto => {
            const nuevoproducto = document.createElement("div");
            nuevoproducto.classList ="item_carrito";
            nuevoproducto.innerHTML= `
            <img src=${producto.urlImagen}>
            <h3>${producto.nombre}</h3>
            <p>$ ${producto.precio}</p>
            <div>
            <button>-</button>      
            <span class="cantidad">${producto.cantidad}</span>
            <button>+</button>  
            </div>
            `;
            contenedor_tarjetas.appendChild(nuevoproducto);
            nuevoproducto.getElementsByTagName("button")[1].addEventListener("click", (e)=> {
                const contadorElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
                contadorElement.innerText=AgregarCarrito(producto);
                actualizarTotal();
                
            });
            
            nuevoproducto.getElementsByTagName("button")[0].addEventListener("click", (e)=>{ 
                restarCarrito(producto);
                CrearTarjetasProductos();
                actualizarTotal();
                
            })
        });
    }actualizarCarrito();
    actualizarTotal();

}

CrearTarjetasProductos();

function actualizarTotal(){
  const cantidadElement = document.getElementById("unidades");
  const precioElement = document.getElementById("precio");
  const prod= JSON.parse(localStorage.getItem("productos"));
  let cantidad = 0;
  let precio = 0;
  if (prod && prod.length > 0) {
    prod.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  }
  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio;
  if(precio === 0) {
    reiniciarCarrito();
    revisarMensajeVacio();
  }

}

document.getElementById("reiniciar").addEventListener("click", () => {
    contenedor_tarjetas.innerHTML = "";
    reiniciarCarrito();
    revisarMensajeVacio();
  });
  
 
  function revisarMensajeVacio() {
    const carritoVacioElement = document.getElementById("carrito_vacio");
    const totalesContainer = document.getElementById("totales");
    const prod = JSON.parse(localStorage.getItem("productos"));
    carritoVacioElement.classList.toggle("escondido", prod);
    totalesContainer.classList.toggle("escondido", !prod);
  }

  revisarMensajeVacio();
  
  document.getElementById("compra").addEventListener("click", async ()=>{
    const carrito = localStorage.getItem("productos");
    if( carrito && carrito.length > 0){
      const carritoObj = JSON.parse(carrito); 
      const res= await fetch("http://localhost:4000/carrito/comprar", {
        method:"POST",
        body: JSON.stringify(carritoObj),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        alert("Compra exitosa");
        contenedor_tarjetas.innerHTML = "";
        reiniciarCarrito();
        revisarMensajeVacio();
      } else {
          alert("Error en la compra");
      }
    }else{
      alert("No hay productos en el carrito");
    }
  });