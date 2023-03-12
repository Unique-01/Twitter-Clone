// const previewContainer = document.getElementById('preview-container');
// var fileInput = document.getElementById('file-input');
// const maxUploads = 4; // Set the maximum number of uploads here
// var seen_by = document.getElementById('id_seen_by');
// var content = document.getElementById('id_content');
// var tweetBtn = document.getElementById('tweet-submit-button');
// var imageDiv = document.getElementById('preview-container');


// function changeDiv(e) {
//     var target = document.getElementById('divdiv');
//     var section = e.getAttribute("data-section");
//     console.log(section);
//     target.innerHTML = document.getElementById(section).innerHTML;

// }

// // content.className='content-box';
// seen_by.className = 'hidden';
// document.getElementById('id_content').onclick = function () {
//     seen_by.className = '';
//     seen_by.classList.add("btn", "rounded-pill", "seen_by", "font-weight-bold", "py-0", "pl-1", "ml-3")
//     // content.className='';
// }

// function inputEmptyOrNot() {

//     if (fileInput.files.length > 0 || content.value.length != 0) {
//         tweetBtn.disabled = false;
//     } else {
//         tweetBtn.disabled = true;
//     }
// }
// content.setAttribute('onkeyup', 'inputEmptyOrNot()')



// fileInput.addEventListener('change', function() {
//   const files = this.files;
//   const fileCount = files.length;
  
//   for (let i = 0; i < fileCount; i++) {
//     const file = files[i];
//     const reader = new FileReader();
//     reader.onload = function(event) {
//       const previewImageContainer = document.createElement('div');
//       previewImageContainer.classList.add('preview-image-container');
//       const previewImage = document.createElement('img');
//       previewImage.classList.add('preview-image');
//       previewImage.src = event.target.result;
//       previewImageContainer.appendChild(previewImage);
//       const deleteButton = document.createElement('button');
//       deleteButton.classList.add('delete-button');
//       deleteButton.innerHTML = 'X';
//       previewImageContainer.appendChild(deleteButton);
//       previewContainer.appendChild(previewImageContainer);
      
//       const imageCount = previewContainer.querySelectorAll('.preview-image-container').length;
//       const columnCount = Math.min(Math.ceil(Math.sqrt(imageCount)), 2);
//       previewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
//       const rowCount = Math.ceil(imageCount / columnCount);
//       previewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
//     };
//     reader.readAsDataURL(file);
//     // fileInput.files = reader.readAsDataURL(file);
//   }
// });

// previewContainer.addEventListener('click', function(event) {
//   if (event.target.classList.contains('delete-button')) {
//     event.target.parentNode.remove();
//     const remainingImages = document.querySelectorAll('.preview-image');
//     const imageCount = remainingImages.length;
//     const columnCount = Math.min(Math.ceil(Math.sqrt(imageCount)), 2);
//     previewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
//     const rowCount = Math.ceil(imageCount / columnCount);
//     previewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
//   }
// });

const previewContainer = document.getElementById('preview-container');
const fileInput = document.getElementById('file-input');
const maxUploads = 4; // Set the maximum number of uploads here
const seen_by = document.getElementById('id_seen_by');
const content = document.getElementById('id_content');
const tweetBtn = document.getElementById('tweet-submit-button');
const imageDiv = document.getElementById('preview-container');

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
  const formData = new FormData();
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
