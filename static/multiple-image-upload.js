// const previewContainer = document.getElementById('preview-container');
// const modalPreviewContainer = document.getElementById('modal-preview-container');
// const fileInput = document.getElementById('file-input');
// const modalFileInput = document.getElementById('modal-file-input')
// const maxUploads = 4; // Set the maximum number of uploads here

// function imageUpload(files, extraCodeInLoop, extraCodeAfterLoop) {
//     const fileCount = files.length;
//     if (fileObjects.length + fileCount > maxUploads) {
//         alert(`You can only upload up to ${maxUploads} files.`);
//         return;
//     }

//     for (let i = 0; i < fileCount; i++) {
//         const file = files[i];
//         const reader = new FileReader();
//         reader.onload = function (event) {
//             const previewImageContainer = document.createElement('div');
//             previewImageContainer.classList.add('preview-image-container');
//             const previewImage = document.createElement('img');
//             previewImage.classList.add('preview-image');
//             previewImage.src = event.target.result;
//             previewImageContainer.appendChild(previewImage);
//             const deleteButton = document.createElement('button');
//             deleteButton.classList.add('delete-button');
//             deleteButton.setAttribute('data-file', file.name); // add an attribute to identify the associated file
//             deleteButton.innerHTML = 'X';
//             previewImageContainer.appendChild(deleteButton);

//             if (extraCodeInLoop) {
//                 extraCodeInLoop(previewImageContainer);
//             }
//         };
//         reader.readAsDataURL(file);
//         formData.append('file', file);
//         fileObjects.push(file);
//         if (extraCodeAfterLoop) {
//             extraCodeAfterLoop();
//         }
//     }
// }

// if (fileInput != null) {
//     fileInput.addEventListener('change', function () {
//         const files = fileInput.files;
//         function extraCodeInLoop(previewImageContainer) {
//             previewContainer.appendChild(previewImageContainer);
//             const imageCount = previewContainer.querySelectorAll('.preview-image-container').length;
//             const columnCount = Math.min(Math.ceil(Math.sqrt(imageCount)), 2);
//             previewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
//             const rowCount = Math.ceil(imageCount / columnCount);
//             previewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
//         }
//         imageUpload(files, extraCodeInLoop, inputEmptyOrNot);
//     });
// }

// if (modalFileInput != null) {
//     modalFileInput.addEventListener('change', function () {
//         const files = modalFileInput.files;
//         function extraCodeInLoop(previewImageContainer) {
//             modalPreviewContainer.appendChild(previewImageContainer);
//             const imageCount = modalPreviewContainer.querySelectorAll('.preview-image-container').length;
//             const columnCount = Math.min(Math.ceil(Math.sqrt(imageCount)), 2);
//             modalPreviewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
//             const rowCount = Math.ceil(imageCount / columnCount);
//             modalPreviewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
//         }
//         imageUpload(files, extraCodeInLoop, modalInputEmptyOrNot);
//     });
// }

// function deleteImage(event, extraCode) {
//     if (event.target.classList.contains('delete-button')) {
//         const previewImageContainer = event.target.parentNode;
//         const deleteBtn = previewImageContainer.querySelector('.delete-button');
//         const fileName = deleteBtn.getAttribute('data-file');
//         removeFileFromFormData(fileName);
//         previewImageContainer.remove();
//         const remainingImages = document.querySelectorAll('.preview-image');
//         const imageCount = remainingImages.length;
//         const columnCount = Math.min(Math.ceil(Math.sqrt(imageCount)), 2);
//         const rowCount = Math.ceil(imageCount / columnCount);
//         if (extraCode) {
//             extraCode(columnCount, rowCount);
//         }
//     }
// }

// if (previewContainer != null) {
//     previewContainer.addEventListener('click', function (event) {
//         deleteImage(event, function (columnCount, rowCount) {
//             previewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
//             previewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
//             inputEmptyOrNot();
//         });
//     });
// }
// if (modalPreviewContainer != null) {
//     modalPreviewContainer.addEventListener('click', function (event) {
//         deleteImage(event, function (columnCount, rowCount) {
//             modalPreviewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
//             modalPreviewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
//             modalInputEmptyOrNot();
//         });
//     });
// }
