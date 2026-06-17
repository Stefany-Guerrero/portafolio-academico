function verContenido(categoria) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    const titulos = {
        talleres: 'Talleres',
        investigaciones: 'Investigaciones',
        ejercicios: 'Ejercicios',
        parciales: 'Parciales',
        semestral: 'Proyecto Semestral'
    };
    
    modalTitle.textContent = titulos[categoria] || categoria;
    
    const rutaCarpeta = `assets/docs/${categoria}/`;
    
    fetch(rutaCarpeta)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo acceder a la carpeta');
            }
            return response.text();
        })
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const links = doc.querySelectorAll('a');
            
            const archivos = [];
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('/') && !href.startsWith('?') && !href.startsWith('#')) {
                    const nombreCompleto = href;
                    const partes = nombreCompleto.split('.');
                    const extension = partes.length > 1 ? partes.pop() : '';
                    const nombre = partes.join('.');
                    
                    archivos.push({
                        nombre: nombre,
                        extension: extension,
                        ruta: rutaCarpeta + nombreCompleto
                    });
                }
            });
            
            if (archivos.length > 0) {
                mostrarListaArchivos(modalBody, archivos);
            } else {
                mostrarMensajeVacio(modalBody);
            }
        })
        .catch(() => {
            mostrarMensajeVacio(modalBody);
        });
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function mostrarListaArchivos(modalBody, archivos) {
    const coloresExtension = {
        pdf: '#ff6b6b',
        docx: '#4dabf7',
        js: '#fcc419',
        css: '#5c7cfa',
        html: '#e67700',
        pptx: '#ff922b',
        default: '#868e96'
    };
    
    let html = '<ul class="file-list">';
    archivos.forEach(archivo => {
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
                <button class="file-view-btn" onclick="visualizarArchivo('${archivo.ruta}', '${archivo.nombre}', '${archivo.extension}')">
                    Ver archivo
                </button>
            </li>
        `;
    });
    html += '</ul>';
    modalBody.innerHTML = html;
}

function mostrarMensajeVacio(modalBody) {
    modalBody.innerHTML = `
        <div class="empty-message">
            <p>No hay archivos disponibles en esta categoría.</p>
            <p style="font-size: 14px; color: #64748b;">Agrega tus archivos en la carpeta correspondiente.</p>
        </div>
    `;
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
