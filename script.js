document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('upload-area');
    const selectFolderButton = document.getElementById('select-folder');
    const successMessage = document.getElementById('success-message');
    const successText = document.getElementById('success-text');
    let directoryHandle;
    let folderName = '';
    let imageCount = 0;

    selectFolderButton.addEventListener('click', async () => {
        try {
            directoryHandle = await window.showDirectoryPicker();
            folderName = directoryHandle.name;
            selectFolderButton.textContent = `Selected Folder: ${folderName}`;
            
            // Show the input box for the base name
            document.getElementById('base-name').style.display = 'inline-block';
        } catch (err) {
            console.error('Error selecting folder:', err);
        }
    });

    uploadArea.addEventListener('click', async () => {
        // This should be replaced by actual image handling code
    });

    uploadArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        uploadArea.classList.add('highlight'); // Add highlight class
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('highlight'); // Remove highlight class
    });
    
    uploadArea.addEventListener('drop', (event) => {
        event.preventDefault();
        uploadArea.classList.remove('highlight'); // Remove highlight class when the file is dropped
        const files = event.dataTransfer.files;
        let isValidFile = false;
        for (let file of files) {
            if (file.type.indexOf('image') !== -1) {
                isValidFile = true;
                const blob = file;
                saveImage(blob, true);
            }
        }
        if (!isValidFile) {
            showErrorMessage("Please drop an image file only.");
        }
    });
    

    document.addEventListener('paste', async function (event) {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        let isValidFile = false;
        for (let item of items) {
            if (item.type.indexOf('image') !== -1) {
                isValidFile = true;
                const blob = item.getAsFile();
                await saveImage(blob, true);
            }
        }
        if (!isValidFile) {
            showErrorMessage("Please Paste an image file only.");
        }
    });

    async function saveImage(blob, autoSave = false) {
        if (directoryHandle && autoSave) {
            try {
                const baseNameInput = document.getElementById('base-name');
                const baseName = baseNameInput.value || 'image'; // Default to 'image' if no name is entered
                imageCount += 1;
                const fileName = `${baseName}-${imageCount}.png`;
                
                const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
                const writable = await fileHandle.createWritable();
                
                await writable.write(blob);
                await writable.close();
    
                showSuccessMessage(`Image saved successfully as ${fileName} in the selected folder!`);
            } catch (err) {
                console.error('Error saving image:', err);
            }
        } else {
            if (!window.showSaveFilePicker) {
                alert('Your browser does not support the File System Access API.');
                return;
            }
    
            try {
                const opts = {
                    suggestedName: 'image.png',
                    types: [
                        {
                            description: 'PNG Images',
                            accept: { 'image/png': ['.png'] },
                        },
                    ],
                };
    
                const fileHandle = await window.showSaveFilePicker(opts);
                const writable = await fileHandle.createWritable();
                
                await writable.write(blob);
                await writable.close();
    
                showSuccessMessage('Image saved successfully!');
            } catch (err) {
                console.error('Error saving image:', err);
            }
        }
    }

    function showSuccessMessage(message) {
        successText.textContent = message;
        successMessage.style.display = 'flex';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
    function showErrorMessage(message) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';

        // Hide error after 3 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }

});
