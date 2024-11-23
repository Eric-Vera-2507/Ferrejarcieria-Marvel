
function AgregarCarrito(prod){
    const memoria= JSON.parse(localStorage.getItem("productos"));
    let cont=0;
    if(!memoria){
        const nuevoproducto = GetNuevoProducto(prod);
        localStorage.setItem("productos",JSON.stringify([nuevoproducto]));
        cont=1;
    }else{
        const indiceprod = memoria.findIndex(productos => productos.id === prod.id);
        const newMemoria = memoria;
        if(indiceprod === -1){
            const nuevoproducto =GetNuevoProducto(prod);
            newMemoria.push(nuevoproducto);
            cont=1
        }else{
            newMemoria[indiceprod].cantidad ++;
            cont=newMemoria[indiceprod].cantidad;
        }
        localStorage.setItem("productos",JSON.stringify(newMemoria));
        
    }
    actualizarCarrito();
    return cont
}

function GetNuevoProducto(prod){
    const nuevoproducto = prod;
    nuevoproducto.cantidad=1;
    return nuevoproducto;
}

function restarCarrito(producto){
    const memoria= JSON.parse(localStorage.getItem("productos"));
    const indiceprod = memoria.findIndex(productos => productos.id === producto.id);
    if(memoria[indiceprod].cantidad==1){
        memoria.splice(indiceprod,1);
        
    }else{
        memoria[indiceprod].cantidad--;
    }
    localStorage.setItem("productos",JSON.stringify(memoria));
    actualizarCarrito();
}


function actualizarCarrito(){
    const cuentacarritoElement = document.getElementById("cuenta_carrito");
    const memoria= JSON.parse(localStorage.getItem("productos"));
    if(memoria && memoria.length > 0){
        const contador=memoria.reduce((acum, current) => acum+current.cantidad,0);
        cuentacarritoElement.innerText=contador;
    }else{
        cuentacarritoElement.innerText=0;
    }
    
}

function reiniciarCarrito(){
    localStorage.removeItem("productos");
    actualizarCarrito();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
});

