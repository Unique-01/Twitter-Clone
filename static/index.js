const previewContainer = document.getElementById('preview-container');
const fileInput = document.getElementById('file-input');
const maxUploads = 4; // Set the maximum number of uploads here
const seen_by = document.getElementById('id_seen_by');
const seenByContainer = document.getElementById('seen_by_container')
const content = document.getElementById('id_content');
const tweetBtn = document.getElementById('tweet-submit-button');
const imageDiv = document.getElementById('preview-container');
const tweetForm = document.getElementById('tweetForm');
const replyForm = document.getElementById('reply-form')
const tweetFormFieldContainer = document.getElementById('form-field-container');
const formData = new FormData();
const fileObjects = []; // Array to store the File objects
const tweetDisplay = document.getElementById('tweet-display');
const forYouTweet = document.getElementById('for-you');

function defaultTweets() {
  tweetDisplay.innerHTML = forYouTweet.innerHTML
}

function changeDiv(e) {
  document.getElementById('maincontent').scrollTop = 0;
  const section = e.getAttribute('data-section');
  tweetDisplay.innerHTML = document.getElementById(section).innerHTML;

  if (tweetDisplay.innerHTML = document.getElementById(section).innerHTML) {
    document.getElementById('maincontent').scrollTop = 0;

  }
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


if (fileInput != null) {
  fileInput.addEventListener('change', function () {
    const files = this.files;
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
        previewContainer.appendChild(previewImageContainer);
  
        const imageCount = previewContainer.querySelectorAll('.preview-image-container').length;
        const columnCount = Math.min(Math.ceil(Math.sqrt(imageCount)), 2);
        previewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
        const rowCount = Math.ceil(imageCount / columnCount);
        previewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
      };
      reader.readAsDataURL(file);
      formData.append('file', file);
      fileObjects.push(file);
      inputEmptyOrNot()
    }
  });
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


if (previewContainer != null) {
  previewContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
      const previewImageContainer = event.target.parentNode;
      const deleteBtn = previewImageContainer.querySelector('.delete-button');
      const fileName = deleteBtn.getAttribute('data-file');
      removeFileFromFormData(fileName);
      previewImageContainer.remove();
      const remainingImages = document.querySelectorAll('.preview-image');
      const imageCount = remainingImages.length;
      const columnCount = Math.min(Math.ceil(Math.sqrt(imageCount)), 2);
      previewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
      const rowCount = Math.ceil(imageCount / columnCount);
      previewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
  
    }
    inputEmptyOrNot()
  
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




const imageContainers = document.querySelectorAll('.image-container');

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


const tweetContainers = document.querySelectorAll('.tweet-container');
    const detailUrls = document.querySelectorAll('.tweet-link');

    for (let i = 0; i < tweetContainers.length; i++) {
        const tweetContainer = tweetContainers[i];
        const tweetDetailUrl = detailUrls[i].value;

        tweetContainer.addEventListener('click', () => {
            window.location.href = tweetDetailUrl;
        });
    }



