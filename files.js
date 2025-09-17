// File management functionality

document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-btn');
    const categoryFilter = document.getElementById('category-filter');
    const searchFiles = document.getElementById('search-files');

    // File upload functionality
    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', handleFileSelect);
    }

    // Drag and drop functionality
    if (uploadArea) {
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleFileDrop);
    }

    // File filtering
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterFiles);
    }

    if (searchFiles) {
        searchFiles.addEventListener('input', filterFiles);
    }

    function handleDragOver(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    }

    function handleDragLeave(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    }

    function handleFileDrop(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles(files);
    }

    function handleFileSelect(e) {
        const files = e.target.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (validateFile(file)) {
                uploadFile(file);
            }
        });
    }

    function validateFile(file) {
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'image/jpeg',
            'image/png'
        ];

        const maxSize = 10 * 1024 * 1024; // 10MB

        if (!allowedTypes.includes(file.type)) {
            alert('Tipo de arquivo não permitido. Formatos aceitos: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPG, PNG');
            return false;
        }

        if (file.size > maxSize) {
            alert('Arquivo muito grande. Tamanho máximo: 10MB');
            return false;
        }

        return true;
    }

    function uploadFile(file) {
        // Simulate file upload
        const progressBar = createProgressBar(file.name);
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                addFileToList(file);
                progressBar.remove();
            }
            updateProgressBar(progressBar, progress);
        }, 200);
    }

    function createProgressBar(filename) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'upload-progress';
        progressContainer.innerHTML = `
            <div class="progress-info">
                <span>${filename}</span>
                <span class="progress-percentage">0%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        `;
        
        uploadArea.appendChild(progressContainer);
        return progressContainer;
    }

    function updateProgressBar(progressBar, progress) {
        const fill = progressBar.querySelector('.progress-fill');
        const percentage = progressBar.querySelector('.progress-percentage');
        
        fill.style.width = progress + '%';
        percentage.textContent = Math.round(progress) + '%';
    }

    function addFileToList(file) {
        const filesTable = document.querySelector('.files-table');
        const fileRow = document.createElement('div');
        fileRow.className = 'file-row';
        fileRow.setAttribute('data-category', getFileCategory(file.type));
        
        const fileIcon = getFileIcon(file.type);
        const fileSize = formatFileSize(file.size);
        const currentDate = new Date().toLocaleDateString('pt-BR');
        
        fileRow.innerHTML = `
            <div class="col-name">
                <div class="file-icon">${fileIcon}</div>
                <span>${file.name}</span>
            </div>
            <div class="col-type">${getFileExtension(file.name)}</div>
            <div class="col-size">${fileSize}</div>
            <div class="col-date">${currentDate}</div>
            <div class="col-actions">
                <button class="action-btn download">⬇️</button>
                <button class="action-btn view">👁️</button>
                <button class="action-btn delete">🗑️</button>
            </div>
        `;
        
        filesTable.appendChild(fileRow);
        
        // Add event listeners to action buttons
        const actionButtons = fileRow.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', handleFileAction);
        });
    }

    function getFileCategory(mimeType) {
        if (mimeType.includes('pdf') || mimeType.includes('document')) {
            return 'official';
        } else if (mimeType.includes('presentation')) {
            return 'presentations';
        } else if (mimeType.includes('sheet')) {
            return 'reports';
        } else if (mimeType.includes('image')) {
            return 'media';
        }
        return 'official';
    }

    function getFileIcon(mimeType) {
        if (mimeType.includes('pdf')) return '📄';
        if (mimeType.includes('document')) return '📝';
        if (mimeType.includes('presentation')) return '📊';
        if (mimeType.includes('sheet')) return '📊';
        if (mimeType.includes('image')) return '🖼️';
        return '📄';
    }

    function getFileExtension(filename) {
        return filename.split('.').pop().toUpperCase();
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    function filterFiles() {
        const category = categoryFilter?.value || '';
        const searchTerm = searchFiles?.value.toLowerCase() || '';
        const fileRows = document.querySelectorAll('.file-row');
        
        fileRows.forEach(row => {
            const fileName = row.querySelector('.col-name span').textContent.toLowerCase();
            const fileCategory = row.getAttribute('data-category');
            
            const matchesCategory = !category || fileCategory === category;
            const matchesSearch = !searchTerm || fileName.includes(searchTerm);
            
            if (matchesCategory && matchesSearch) {
                row.style.display = 'grid';
            } else {
                row.style.display = 'none';
            }
        });
    }

    function handleFileAction(e) {
        const action = e.target.classList.contains('download') ? 'download' :
                      e.target.classList.contains('view') ? 'view' : 'delete';
        const fileRow = e.target.closest('.file-row');
        const fileName = fileRow.querySelector('.col-name span').textContent;
        
        switch(action) {
            case 'download':
                alert(`Download iniciado para: ${fileName}`);
                break;
            case 'view':
                alert(`Visualizando: ${fileName}`);
                break;
            case 'delete':
                if (confirm(`Deseja excluir o arquivo: ${fileName}?`)) {
                    fileRow.remove();
                }
                break;
        }
    }

    // Add progress bar styles
    const progressStyles = document.createElement('style');
    progressStyles.textContent = `
        .upload-progress {
            margin: 1rem 0;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            border: 1px solid var(--primary-blue);
        }
        
        .progress-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }
        
        .progress-bar {
            height: 8px;
            background: var(--light-gray);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: var(--accent-yellow);
            border-radius: 4px;
            transition: width 0.3s ease;
        }
    `;
    document.head.appendChild(progressStyles);
});
