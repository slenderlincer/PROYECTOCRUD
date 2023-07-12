//Variables
const formulario = document.querySelector("#agregar-persona");
const div = document.querySelector('#contenido-secundario');
const divEmpleados = document.querySelector('#personas');
const nombre = document.querySelector('#nombre');
const correo = document.querySelector("#correo");
const puesto = document.querySelector("#puesto") 

let listaEmpleados = [];
let editando = false;

//Objetos
const objEmpleado = {
    nombre: '',
    correo: '',
    puesto: '',
    id: Date.now()
};

//Eventos
eventListeners();
function eventListeners(){
    formulario.addEventListener('submit', validarForm);
};

function validarForm(e){
    e.preventDefault();

    limpiarAlerta();
    if(nombre.value === '' || correo.value === '' || puesto.value === ''){
        alerta('debe de llenar todos los campos', 'error');
        return;
    }else{
        alerta('registrado correctamente');
        
    };

    if(editando){
        editarEmpleado();
        editando = false;
    }else{
        objEmpleado.nombre = nombre.value;
        objEmpleado.correo = correo.value;
        objEmpleado.puesto = puesto.value;
        objEmpleado.id = Date.now();

        
        agregarEmpleado();
    };

};

//agregar empleado
function agregarEmpleado(){
    listaEmpleados.push({...objEmpleado});
    console.log(listaEmpleados);
    //Llama a la funcion de mostrar empleados
    mostrarEmpleados();

    //Limpía el formulario para poder llenarlo de nuevo
    formulario.reset();


};

//Se crea la funcion para mostrar empleados
function mostrarEmpleados(){
    removerPrimerRegistro();
    
    //Se usa un iterador para ir agregando los objetos en el arreglo
    listaEmpleados.forEach(empleado => {
       
        const {nombre, correo, puesto, id} = empleado;

        const li = document.createElement('li');
        li.className =  'list-group-item d-flex justify-content-between align-items-center'
        li.innerHTML = `Nombre: ${nombre} - Correo: ${correo} - puesto: ${puesto} - ID: ${id}`

        //Se crea el boton para editar 
        const btnEditar = document.createElement('button');
        btnEditar.onclick = () => actualizarEmpleado(empleado);
        btnEditar.textContent = 'Editar';
        li.append(btnEditar);

        //Se crear el boton para eliminar 
        const btnEliminar = document.createElement('button');
        btnEliminar.onclick = () => eliminarEmpleado(id);
        btnEliminar.textContent = 'Eliminar';


        li.append(btnEliminar);

        divEmpleados.appendChild(li);
 });
 
};

//se crea la funcion que va a permitir editar algun empleado

function actualizarEmpleado(empleado){
    const {nombre, correo, puesto, id} = empleado;

    nombre.value = nombre;
    correo.value = correo;
    puesto.value = puesto;
    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
};

function editarEmpleado(){
    objEmpleado.nombre = nombre.value;
    objEmpleado.correo = correo.value;
    objEmpleado.puesto = puesto.value;

    listaEmpleados.map(empleado => {

        if(empleado.id === objEmpleado.id){
            empleado.nombre = objEmpleado.nombre;
            empleado.correo = objEmpleado.correo;
            empleado.puesto = objEmpleado.puesto
        }
    });

    removerPrimerRegistro();
    mostrarEmpleados();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Registrar';

    editando = false;
};

//Crear alerta
function alerta(mensaje, tipoMensaje){

    const divAlerta = document.createElement('div');
    divAlerta.classList.add('text-center', 'alert')

    //se revisa el tipo de mensaje
    if(tipoMensaje === 'error'){
        divAlerta.classList.add('alert-danger')
    }else{
        divAlerta.classList.add('alert-success')
    }

    divAlerta.textContent = mensaje

    //se agrega el error al div creado
    div.appendChild(divAlerta);

    //se genera un tiempo para el mensaje
    setTimeout(() => {

        divAlerta.remove();
    }, 2000);
};

//Eliminar Empleado

function eliminarEmpleado(id){
    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    removerPrimerRegistro();
    mostrarEmpleados();
};

//Sirve para limpiar la alerta cuando no se llena bien el formulario y evitar que se creen multiples alertas porque se ve feo
function limpiarAlerta(){
    while(div.firstChild){
        div.removeChild(div.firstChild);
    };
};

//Es para limpiar el HTML y que no se esten creando datos basura
function removerPrimerRegistro(){
    while(divEmpleados.firstChild){
        divEmpleados.removeChild(divEmpleados.firstChild)
    };
};


