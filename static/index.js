const getElement = (id) => document.getElementById(id);

const seen_by = getElement('id_seen_by');
const seenByContainer = getElement('seen_by_container');
const modalSeenByContainer = getElement('modal_seen_by_container');
const content = getElement('id_content');
const tweetBtn = getElement('tweet-submit-button');
const imageDiv = getElement('preview-container');
const tweetForm = getElement('tweetForm');
const tweetFormModal = getElement('tweetFormModal');
const tweetFormModalForm = getElement('tweetFormModalForm');
const replyForm = getElement('reply-form');
const tweetFormFieldContainer = getElement('form-field-container');
let formData = new FormData();
const fileObjects = [];
const tweetDisplay = getElement('tweet-display');
const forYouTweet = getElement('for-you');
const modalFormContent = getElement('modal-form-content');
const modalcontent = modalFormContent.querySelector('#id_content');
const modalSeenBy = modalSeenByContainer.querySelector('#id_seen_by');
const modalTweetBtn = getElement('modal-tweet-submit-button');
const imageContainers = document.querySelectorAll('.image-container');
const previewContainer = getElement('preview-container');
const modalPreviewContainer = getElement('modal-preview-container');
const fileInput = getElement('file-input');
const modalFileInput = getElement('modal-file-input');
const maxUploads = 4;

function defaultTweets() {
    tweetDisplay.innerHTML = forYouTweet.innerHTML
}


function changeDiv(e) {
    const mainContent = document.getElementById('maincontent');
    mainContent.scrollTop = 0;
    const section = e.dataset.section;
    tweetDisplay.innerHTML = document.getElementById(section).innerHTML;
    if (tweetDisplay.innerHTML === document.getElementById(section).innerHTML) {
        mainContent.scrollTop = 0;
    }
}

function updateTweetBtnStatus() {
    const contentLength = content.value.trim().length;
    const modalContentLength = modalcontent.value.trim().length;

    tweetBtn.disabled = !((formData.has('file') || contentLength !== 0) && contentLength <= 280);
    modalTweetBtn.disabled = !((formData.has('file') || modalContentLength !== 0) && modalContentLength <= 280);
}

if (content != null) {
    content.addEventListener('input', updateTweetBtnStatus);
}

if (modalcontent != null) {
    modalcontent.addEventListener('input', updateTweetBtnStatus);
}


function removeFileFromFormData(fileName) {
    for (let i = 0; i < fileObjects.length; i++) {
        if (fileObjects[i].name === fileName) {
            // Remove the corresponding File object from the array
            fileObjects.splice(i, 1);

            // Remove the file from the FormData object
            formData.delete('file');

            // Re-add all the File objects to the FormData object
            for (let j = 0; j < fileObjects.length; j++) {
                formData.append('file', fileObjects[j]);
            }

            break;
        }
    }
}

function createPreviewContainer(imageContainer, previewContainer) {
    previewContainer.appendChild(imageContainer);
    const imageCount = previewContainer.querySelectorAll('.preview-image-container').length;
    const columnCount = Math.min(Math.ceil(Math.sqrt(imageCount)), 2);
    previewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
    const rowCount = Math.ceil(imageCount / columnCount);
    previewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
}

function imageUpload(files, previewContainer) {
    const fileCount = files.length;
    if (fileObjects.length + fileCount > maxUploads) {
        // handle error more gracefully
        alert(`You can only upload up to ${maxUploads} files.`);
        console.error(`You can only upload up to ${maxUploads} files.`);
        return;
    }

    for (let i = 0; i < fileCount; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('preview-image-container');
            const previewImage = document.createElement('img');
            previewImage.classList.add('preview-image');
            previewImage.src = event.target.result;
            imageContainer.appendChild(previewImage);
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.setAttribute('data-file', file.name);
            deleteButton.innerHTML = 'X';
            imageContainer.appendChild(deleteButton);
            createPreviewContainer(imageContainer, previewContainer);
        };
        reader.readAsDataURL(file);
        formData.append('file', file);
        fileObjects.push(file);
        updateTweetBtnStatus();
    }
}

if (fileInput != null) {
    fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        imageUpload(files, previewContainer);
    });
}

if (modalFileInput != null) {
    modalFileInput.addEventListener('change', () => {
        const files = modalFileInput.files;
        imageUpload(files, modalPreviewContainer);
    });
}


function deleteImage(event, extraCode) {
    if (event.target.classList.contains('delete-button')) {
        const previewImageContainer = event.target.parentNode;
        const deleteBtn = previewImageContainer.querySelector('.delete-button');
        const fileName = deleteBtn.getAttribute('data-file');
        removeFileFromFormData(fileName);
        previewImageContainer.remove();
        const remainingImages = document.querySelectorAll('.preview-image');
        const imageCount = remainingImages.length;
        const columnCount = Math.min(Math.ceil(Math.sqrt(imageCount)), 2);
        const rowCount = Math.ceil(imageCount / columnCount);
        if (extraCode) {
            extraCode(columnCount, rowCount);
        }
        updateTweetBtnStatus();
    }
}

if (previewContainer != null) {
    previewContainer.addEventListener('click', function (event) {
        deleteImage(event, function (columnCount, rowCount) {
            previewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
            previewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
        });
    });
}
if (modalPreviewContainer != null) {
    modalPreviewContainer.addEventListener('click', function (event) {
        deleteImage(event, function (columnCount, rowCount) {
            modalPreviewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
            modalPreviewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
        });
    });
}


// Refactored form submission code
function submitForm(formData, url) {
    return fetch(url, {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '/';
            } else {
                console.log('Error:', response.statusText);
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

if (tweetForm != null) {
    tweetForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        await submitForm(formData, '/upload_tweet/');
    });
}

if (tweetFormModalForm != null) {
    tweetFormModalForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        await submitForm(formData, '/upload_tweet/');
    });
}

if (replyForm != null) {
    replyForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const tweetAuthor = JSON.parse(document.getElementById('tweetAuthor').textContent);
        const tweetId = JSON.parse(document.getElementById('tweetId').textContent);
        await submitForm(formData, `/${tweetAuthor}/status/${tweetId}/`);
    });
}

function tweetImage() {
    for (const imageContainer of imageContainers) {
        const imageCount = imageContainer.querySelectorAll('.tweet-image-container').length;
        const columnCount = Math.min(Math.ceil(Math.sqrt(imageCount)), 2);
        imageContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
        const rowCount = Math.ceil(imageCount / columnCount);
        imageContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
    }
}

// Call the function once to set the initial grid layout
tweetImage();

// Add an event listener to each image container element that listens for changes to its child elements
imageContainers.forEach(container => container.addEventListener('DOMSubtreeModified', tweetImage));


$(document).on('click', '#closeButton', function (event) {
    event.preventDefault();
    if ($('#modal-form-content textarea').val().trim() === "" && formData.entries().next().done) {
        $('#tweetFormModal').modal('hide');
        return;
    }
    $('#confirmModal').modal('show');


    $(document).on('click', '#confirmModalSaveButton', function () {
        $('#confirmModal').modal('hide');
        $('#tweetFormModal').modal('hide');
    });

    // Handle Discard button click
    $(document).on('click', '#confirmModalDiscardButton', function () {
        $('#modal-form-content textarea').val('');
        $('#modal-file-input').val('');
        $('#modal-preview-container').empty();
        $('#confirmModal').modal('hide');
        $('#tweetFormModal').modal('hide');
        formData = new FormData();
        updateTweetBtnStatus();
    });
});


