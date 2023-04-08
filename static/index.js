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
const fileObjects = []; // Array to store the File objects
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
const maxUploads = 4; // Set the maximum number of uploads here





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


function inputEmptyOrNot() {
  if (formData.has('file') || content.value.length !== 0) {
    tweetBtn.disabled = false;
  } else {
    tweetBtn.disabled = true;
  }
}


if (content != null) {
  content.setAttribute('onkeyup', 'inputEmptyOrNot()');
}


function modalInputEmptyOrNot() {
  if (formData.has('file') || modalcontent.value.length !== 0) {
    modalTweetBtn.disabled = false;
  } else {
    modalTweetBtn.disabled = true;
  }
}


if (modalcontent != null) {
  modalcontent.setAttribute('onkeyup', 'modalInputEmptyOrNot()');
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




function imageUpload(files, extraCodeInLoop, extraCodeAfterLoop) {
    const fileCount = files.length;
    if (fileObjects.length + fileCount > maxUploads) {
        alert(`You can only upload up to ${maxUploads} files.`);
        return;
    }

    for (let i = 0; i < fileCount; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function (event) {
            const previewImageContainer = document.createElement('div');
            previewImageContainer.classList.add('preview-image-container');
            const previewImage = document.createElement('img');
            previewImage.classList.add('preview-image');
            previewImage.src = event.target.result;
            previewImageContainer.appendChild(previewImage);
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.setAttribute('data-file', file.name); // add an attribute to identify the associated file
            deleteButton.innerHTML = 'X';
            previewImageContainer.appendChild(deleteButton);

            if (extraCodeInLoop) {
                extraCodeInLoop(previewImageContainer);
            }
        };
        reader.readAsDataURL(file);
        formData.append('file', file);
        fileObjects.push(file);
        if (extraCodeAfterLoop) {
            extraCodeAfterLoop();
        }
    }
}

if (fileInput != null) {
    fileInput.addEventListener('change', function () {
        const files = fileInput.files;
        function extraCodeInLoop(previewImageContainer) {
            previewContainer.appendChild(previewImageContainer);
            const imageCount = previewContainer.querySelectorAll('.preview-image-container').length;
            const columnCount = Math.min(Math.ceil(Math.sqrt(imageCount)), 2);
            previewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
            const rowCount = Math.ceil(imageCount / columnCount);
            previewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
        }
        imageUpload(files, extraCodeInLoop, inputEmptyOrNot);
    });
}

if (modalFileInput != null) {
    modalFileInput.addEventListener('change', function () {
        const files = modalFileInput.files;
        function extraCodeInLoop(previewImageContainer) {
            modalPreviewContainer.appendChild(previewImageContainer);
            const imageCount = modalPreviewContainer.querySelectorAll('.preview-image-container').length;
            const columnCount = Math.min(Math.ceil(Math.sqrt(imageCount)), 2);
            modalPreviewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
            const rowCount = Math.ceil(imageCount / columnCount);
            modalPreviewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
        }
        imageUpload(files, extraCodeInLoop, modalInputEmptyOrNot);
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
    }
}

if (previewContainer != null) {
    previewContainer.addEventListener('click', function (event) {
        deleteImage(event, function (columnCount, rowCount) {
            previewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
            previewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
            inputEmptyOrNot();
        });
    });
}
if (modalPreviewContainer != null) {
    modalPreviewContainer.addEventListener('click', function (event) {
        deleteImage(event, function (columnCount, rowCount) {
            modalPreviewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
            modalPreviewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
            modalInputEmptyOrNot();
        });
    });
}



if (tweetForm != null) {
  tweetForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value; // get the CSRF token value from the hidden input field in your form
    formData.append('csrfmiddlewaretoken', csrfToken);
    formData.append('content', content.value);
    const selectedOptionSeenBy = seen_by.options[seen_by.selectedIndex]
    formData.append('seen_by', selectedOptionSeenBy.value)

    const response = await fetch('/upload_tweet/', {
      method: 'POST',
      body: formData,
    });

    // handle the response
    if (response.ok) {
      // redirect to the desired URL
      window.location.href = '/';
    } else {
      // handle the error
      console.log('Error:', response.statusText);
    }
  });

}


if (tweetFormModalForm != null) {
  tweetFormModalForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value; // get the CSRF token value from the hidden input field in your form
    formData.append('csrfmiddlewaretoken', csrfToken);
    formData.append('content', modalcontent.value);
    const selectedOptionSeenBy = modalSeenBy.options[modalSeenBy.selectedIndex]
    formData.append('seen_by', selectedOptionSeenBy.value)

    const response = await fetch('/upload_tweet/', {
      method: 'POST',
      body: formData,
    });

    // handle the response
    if (response.ok) {
      // redirect to the desired URL
      window.location.href = '/';
    } else {
      // handle the error
      console.log('Error:', response.statusText);
    }
  });

}


if (replyForm != null) {
  replyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const tweetAuthor = JSON.parse(document.getElementById('tweetAuthor').textContent);;
    const tweetId = JSON.parse(document.getElementById('tweetId').textContent);
    const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value; // get the CSRF token value from the hidden input field in your form
    formData.append('csrfmiddlewaretoken', csrfToken);
    formData.append('content', content.value);

    const response = await fetch('/' + tweetAuthor + '/status/' + tweetId + '/', {
      method: 'POST',
      body: formData,
    });

    // handle the response
    if (response.ok) {
      // redirect to the desired URL
      window.location.href = '/' + tweetAuthor + '/status/' + tweetId + '/';
    } else {
      // handle the error
      console.log('Error:', response.statusText);
    }
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


document.getElementById("closeButton").addEventListener("click", function (event) {
  event.preventDefault();
  if ($('#modal-form-content textarea').val().trim() === "" && formData.entries().next().done) {
    $('#tweetFormModal').modal('hide');
    return;
  }
  // Show confirm modal
  $('#confirmModal').modal('show');

  // Handle Save button click
  document.getElementById("confirmModalSaveButton").addEventListener("click", function () {
    
    // Close confirm modal and tweet form modal
    $('#confirmModal').modal('hide');
    $('#tweetFormModal').modal('hide');
  });

  // Handle Discard button click
  document.getElementById("confirmModalDiscardButton").addEventListener("click", function () {
    
    $('#modal-form-content textarea').val('');
    $('#modal-file-input').val('');
    $('#modal-preview-container').empty();

    // Close confirm modal and tweet form modal
    $('#confirmModal').modal('hide');
    $('#tweetFormModal').modal('hide');

    formData = new FormData();
    modalInputEmptyOrNot()
  });
});


