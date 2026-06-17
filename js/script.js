const archivos = {
    talleres: [
        { nombre: 'Taller 1 - Introducción', extension: 'pdf' },
        { nombre: 'Taller 2 - Metodologías', extension: 'docx' },
        { nombre: 'Taller 3 - Práctica', extension: 'pdf' },
        { nombre: 'Taller 4 - Final', extension: 'pdf' }
    ],
    investigaciones: [
        { nombre: 'Investigación 1 - Estado del arte', extension: 'pdf' },
        { nombre: 'Investigación 2 - Resultados', extension: 'pdf' },
        { nombre: 'Investigación 3 - Conclusiones', extension: 'docx' }
    ],
    ejercicios: [
        { nombre: 'Ejercicio 1 - Variables', extension: 'js' },
        { nombre: 'Ejercicio 2 - Funciones', extension: 'js' },
        { nombre: 'Ejercicio 3 - CSS', extension: 'css' },
        { nombre: 'Ejercicio 4 - HTML', extension: 'html' }
    ],
    parciales: [
        { nombre: 'Parcial 1 - Teórico', extension: 'pdf' },
        { nombre: 'Parcial 2 - Práctico', extension: 'pdf' },
        { nombre: 'Parcial 3 - Final', extension: 'pdf' }
    ],
    semestral: [
        { nombre: 'Propuesta de proyecto', extension: 'pdf' },
        { nombre: 'Avance 1 - Diseño', extension: 'pdf' },
        { nombre: 'Avance 2 - Desarrollo', extension: 'pdf' },
        { nombre: 'Proyecto Final', extension: 'pdf' },
        { nombre: 'Presentación', extension: 'pptx' }
    ]
};

const coloresExtension = {
    pdf: '#ff6b6b',
    docx: '#4dabf7',
    js: '#fcc419',
    css: '#5c7cfa',
    html: '#e67700',
    pptx: '#ff922b',
    default: '#868e96'
};

function verContenido(categoria) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const archivosCategoria = archivos[categoria];
    const titulos = {
        talleres: 'Talleres',
        investigaciones: 'Investigaciones',
        ejercicios: 'Ejercicios',
        parciales: 'Parciales',
        semestral: 'Proyecto Semestral'
    };
    modalTitle.textContent = titulos[categoria] || categoria;
    if (archivosCategoria && archivosCategoria.length > 0) {
        let html = '<ul class="file-list">';
        archivosCategoria.forEach(archivo => {
            const color = coloresExtension[archivo.extension] || coloresExtension.default;
            const extensionUpper = archivo.extension.toUpperCase();
            html += `
                <li class="file-item">
                    <div class="file-name">
                        <span><strong>${archivo.nombre}</strong></span>
                        <span class="file-extension" style="background: ${color}20; color: ${color}">
                            ${extensionUpper}
                        </span>
                    </div>
                    <button class="file-view-btn" onclick="visualizarArchivo('${archivo.nombre}', '${archivo.extension}')">
                        Ver archivo
                    </button>
                </li>
            `;
        });
        html += '</ul>';
        modalBody.innerHTML = html;
    } else {
        modalBody.innerHTML = `
            <div class="empty-message">
                <p>No hay archivos disponibles en esta categoría.</p>
                <p style="font-size: 14px; color: #64748b;">Agrega tus archivos en la sección correspondiente.</p>
            </div>
        `;
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function visualizarArchivo(nombre, extension) {
    const modalBody = document.getElementById('modal-body');
    const contenidoActual = modalBody.innerHTML;
    let contenidoVisualizacion = `
        <div style="text-align: center; padding: 20px;">
            <h3 style="color: #38bdf8; margin-bottom: 10px;">${nombre}</h3>
            <p style="color: #94a3b8; margin-bottom: 20px;">Archivo de tipo .${extension.toUpperCase()}</p>
            <div style="background: rgba(255,255,255,.05); border-radius: 10px; padding: 30px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,.1);">
                <p style="color: #d1d5db; line-height: 1.6;">
                    <strong>Vista previa del archivo</strong><br><br>
                    Este es el contenido del archivo <strong>"${nombre}"</strong>.<br>
                    En un entorno real, aquí se mostraría el contenido del documento.<br><br>
                    <span style="font-size: 14px; color: #64748b;">
                        Para ver el contenido completo, descarga el archivo.
                    </span>
                </p>
            </div>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button onclick="descargarArchivo('${nombre}', '${extension}')" class="file-view-btn" style="background: #38bdf8;">
                    Descargar
                </button>
                <button onclick="volverALista()" class="file-view-btn" style="background: #64748b;">
                    Volver
                </button>
            </div>
        </div>
    `;
    modalBody.innerHTML = contenidoVisualizacion;
    window.contenidoAnterior = contenidoActual;
}

function volverALista() {
    const modalBody = document.getElementById('modal-body');
    if (window.contenidoAnterior) {
        modalBody.innerHTML = window.contenidoAnterior;
        window.contenidoAnterior = null;
    }
}

function descargarArchivo(nombre, extension) {
    alert(`Descargando: ${nombre}.${extension}\n\n(Simulación de descarga)`);
    const link = document.createElement('a');
    link.download = `${nombre}.${extension}`;
    link.href = '#';
    link.click();
}

function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = '';
    window.contenidoAnterior = null;
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        cerrarModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cerrarModal();
    }
});
