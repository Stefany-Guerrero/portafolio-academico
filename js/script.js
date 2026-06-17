const archivos = {
    talleres: [
        { nombre: 'Taller Práctica I', extension: 'pdf' }
    ],
    investigaciones: [
        { nombre: 'Investigación 1 Programación II', extension: 'pdf' }
    ],
    ejercicios: [
        { nombre: 'EjercicioPráctico1', extension: 'pdf' },
        { nombre: 'EjercicioPráctico2.0 Arisays y Stefany', extension: 'pdf' }
    ],
    parciales: [
        { nombre: 'Examen Parcial1', extension: 'pdf' },
        { nombre: 'Examen Parcial2_ArisaysCedeño_StefanyGuerrero', extension: 'pdf' }
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
            const ruta = `assets/docs/${categoria}/${archivo.nombre}.${archivo.extension}`;
            html += `
                <li class="file-item">
                    <div class="file-name">
                        <span><strong>${archivo.nombre}</strong></span>
                        <span class="file-extension" style="background: ${color}20; color: ${color}">
                            ${extensionUpper}
                        </span>
                    </div>
                    <button class="file-view-btn" onclick="visualizarArchivo('${ruta}', '${archivo.nombre}', '${archivo.extension}')">
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

function visualizarArchivo(ruta, nombre, extension) {
    const modalBody = document.getElementById('modal-body');
    const contenidoActual = modalBody.innerHTML;
    
    let contenidoVisualizacion = `
        <div style="text-align: center; padding: 20px;">
            <h3 style="color: #38bdf8; margin-bottom: 10px;">${nombre}</h3>
            <p style="color: #94a3b8; margin-bottom: 20px;">Archivo de tipo .${extension.toUpperCase()}</p>
            
            <div style="background: rgba(255,255,255,.05); border-radius: 10px; padding: 20px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,.1);">
                <iframe src="${ruta}" style="width: 100%; height: 400px; border: none; border-radius: 10px;"></iframe>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <a href="${ruta}" target="_blank" class="file-view-btn" style="background: #38bdf8; text-decoration: none; padding: 10px 20px; border-radius: 8px; color: black; font-weight: 600;">
                    Abrir en nueva ventana
                </a>
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
