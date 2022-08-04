const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarrito = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
	// Cuando agregar un curso presionando "Agregar al carrito"
	listaCursos.addEventListener('click', agregarCurso);
	// Elimina cursos del carrito
	carrito.addEventListener('click', eliminarCurso);

	// Cuando se vacia el carrito
	vaciarCarrito.addEventListener('click', vaciarCursos);

	// Eliminar una cantidad del carritoHTML()
}

function vaciarCursos(e) {
	e.preventDefault();
	articulosCarrito = [];
	limpiarHTML();
}

function eliminarCurso(e) {
	e.preventDefault();
	if (e.target.classList.contains('borrar-curso')) {
		const cursoId = e.target.getAttribute('data-id');
		// Eliminar del arreglo de articulosCarrito por data-id
		articulosCarrito = articulosCarrito.filter(
			(curso) => curso.id !== cursoId
		);
		carritoHTML();
		console.log(articulosCarrito);
	}
}

function agregarCurso(e) {
	e.preventDefault();
	if (e.target.classList.contains('agregar-carrito')) {
		const cursoSeleccionado = e.target.parentElement.parentElement;
		leerDatosCurso(cursoSeleccionado);
	}
}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso

function leerDatosCurso(curso) {
	console.log(curso);

	// Crear un objeto con el contenido del curso actual
	const infoCurso = {
		imagen: curso.querySelector('img').src,
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
		cantidad: 1,
	};

	// Revisar si el curso ya existe en el carrito
	const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
	console.log(existe);
	if (existe) {
		// Si existe, aumentar la cantidad
		const cursos = articulosCarrito.map((curso) => {
			if (curso.id === infoCurso.id) {
				// Aumentar precio en el carrito

				const cantidadCurso = curso.cantidad++;
				infoCurso.precio = parseInt(infoCurso.precio.replace('$', ' '));
				curso.precio = `$${infoCurso.precio * (cantidadCurso + 1)}`;
				console.log(curso.precio);
				// console.log(totalPrecio);

				return curso; // retorna el objeto actualizado
			} else {
				return curso; // retorna los objetos que no son los duplicados
			}
		});
		articulosCarrito = [...cursos];
	} else {
		//Agregamos el curso al carrito
		articulosCarrito = [...articulosCarrito, infoCurso];
	}
	console.log(articulosCarrito);
	// Quitar signo dolar del precio
	carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
	// Limpia el HTML
	limpiarHTML();
	// Recorre el carrito y genera el HTML
	articulosCarrito.forEach((curso) => {
		// Destructuring para extraer la información del curso
		const { imagen, titulo, precio, cantidad, id } = curso;
		const row = document.createElement('tr');
		//InnerHTML para generar el HTML del carrito
		row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
        ${cantidad}
    	</td>
		<td>
		 	<a href="#" class="borrar-curso" data-id="${id}">X</a>
		</td>
        `;

		// Agrega el HTML del carrito en el body
		contenedorCarrito.appendChild(row);
	});
}

// Elimina los cursos del tbody

function limpiarHTML() {
	// Forma lenta de eliminar
	// contenedorCarrito.innerHTML = '';

	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}
