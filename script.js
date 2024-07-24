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
        } catch (err) {
            console.error('Error selecting folder:', err);
        }
    });

    uploadArea.addEventListener('click', async () => {
        // This should be replaced by actual image handling code
    });

    uploadArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', async (event) => {
        event.preventDefault();
        uploadArea.classList.remove('dragover');

        const files = event.dataTransfer.files;
        for (let file of files) {
            if (file.type.indexOf('image') !== -1) {
                const blob = file;
                await saveImage(blob, true);
            }
        }
    });

    document.addEventListener('paste', async function(event) {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (let item of items) {
            if (item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile();
                await saveImage(blob, true);
            }
        }
    });

    async function saveImage(blob, autoSave = false) {
        if (directoryHandle && autoSave) {
            try {
                imageCount += 1;
                const fileName = `image-${imageCount}.png`;
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

});
