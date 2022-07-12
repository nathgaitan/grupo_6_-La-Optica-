function confirmDelete(){
    const respuesta = confirm("Estás seguro de querer eliminar este producto");

    if (respuesta == true)
    {
        return true;
    }
    else
    {
        return false;
    }
}