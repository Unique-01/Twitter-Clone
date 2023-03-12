const previewContainer = document.getElementById('preview-container');
const fileInput = document.getElementById('file-input');
const maxUploads = 4; // Set the maximum number of uploads here
const seen_by = document.getElementById('id_seen_by');
const content = document.getElementById('id_content');
const tweetBtn = document.getElementById('tweet-submit-button');
const imageDiv = document.getElementById('preview-container');
const tweetForm = document.getElementById('tweetForm');
const formData = new FormData();

function changeDiv(e) {
  const target = document.getElementById('divdiv');
  const section = e.getAttribute('data-section');
  console.log(section);
  target.innerHTML = document.getElementById(section).innerHTML;
}

seen_by.classList.add('hidden');
content.onclick = function () {
  seen_by.classList.remove('hidden');
  seen_by.classList.add('btn', 'rounded-pill', 'seen_by', 'font-weight-bold', 'py-0', 'pl-1', 'ml-3');
};

function inputEmptyOrNot() {
  if (fileInput.files.length > 0 || content.value.length !== 0) {
    tweetBtn.disabled = false;
  } else {
    tweetBtn.disabled = true;
  }
}
content.setAttribute('onkeyup', 'inputEmptyOrNot()');

fileInput.addEventListener('change', function () {
  const files = this.files;
  const fileCount = files.length;

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
  }
  // Append the new files to the FormData object
  // const formData = new FormData();
  const existingFiles = Array.from(fileInput.files);
  existingFiles.forEach((file) => {
    formData.append('file', file);
  });
  for (let i = 0; i < fileCount; i++) {
    formData.append('file', files[i]);
  }
  fileInput.files = formData.getAll('file');
});



previewContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-button')) {
    event.target.parentNode.remove();
    const remainingImages = document.querySelectorAll('.preview-image');
    const imageCount = remainingImages.length;
    const columnCount = Math.min(Math.ceil(Math.sqrt(imageCount)), 2);
    previewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
    const rowCount = Math.ceil(imageCount / columnCount);
    previewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
  }
});

tweetForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value; // get the CSRF token value from the hidden input field in your form
  formData.append('csrfmiddlewaretoken', csrfToken);
  formData.append('content',content.value);
  const selectedOptionSeenBy = seen_by.options[seen_by.selectedIndex]
  formData.append('seen_by',selectedOptionSeenBy.value)

  const response = await fetch('/upload_tweet/', {
    method: 'POST',
    body: formData,
  });

  // handle the response
});
