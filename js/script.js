const archivos = {
    talleres: [
        { nombre: 'Taller Práctica I', extension: 'pdf' }
    ],
    investigaciones: [
        { nombre: 'Investigación 1 Programación II', extension: 'pdf' }
    ],
    ejercicios: [
        { nombre: 'EjercicioPráctico1', extension: 'pdf' },
        { nombre: 'EjercicioPráctico2.0 Arísays y Ste', extension: 'pdf' }
    ],
    parciales: [
        { nombre: 'Examen Parcial1', extension: 'pdf' },
        { nombre: 'Examen Parcial2_ArísaysCedeño', extension: 'pdf' }
    ],
    semestral: []
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
            const ruta = categoria + '/' + archivo.nombre + '.' + archivo.extension;
            html += '<li class="file-item">';
            html += '<div class="file-name">';
            html += '<span><strong>' + archivo.nombre + '</strong></span>';
            html += '<span class="file-extension" style="background: ' + color + '20; color: ' + color + '">';
            html += extensionUpper;
            html += '</span>';
            html += '</div>';
            html += '<button class="file-view-btn" onclick="abrirArchivo(\'' + ruta + '\')">';
            html += 'Ver archivo';
            html += '</button>';
            html += '</li>';
        });
        html += '</ul>';
        modalBody.innerHTML = html;
    } else {
        modalBody.innerHTML = '<div class="empty-message"><p>No hay archivos disponibles en esta categoría.</p><p style="font-size: 14px; color: #64748b;">Agrega tus archivos en la sección correspondiente.</p></div>';
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function abrirArchivo(ruta) {
    window.open(ruta, '_blank');
}

function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = '';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        cerrarModal();
    }
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cerrarModal();
    }
});
Agregado script.js completo
