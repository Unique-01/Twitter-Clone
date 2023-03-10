function changeDiv(e) {
    var target = document.getElementById('divdiv');
    var section = e.getAttribute("data-section");
    console.log(section);
    target.innerHTML = document.getElementById(section).innerHTML;

}

// var form = document.getElementById('tweetForm');

var seen_by = document.getElementById('id_seen_by');
var content = document.getElementById('id_content');
var tweetBtn = document.getElementById('tweet-submit-button');
// content.className='content-box';
seen_by.className='hidden';
document.getElementById('id_content').onclick = function () {
    seen_by.className='';
    seen_by.classList.add("btn","rounded-pill","seen_by","font-weight-bold","py-0" ,"pl-1","ml-3")
    // content.className='';
}

content.onkeyup = function inputEmptyOrNot() {
    if (content.value.length == 0) {
        tweetBtn.setAttribute('disabled','');
    } else{
        tweetBtn.removeAttribute('disabled');
    }
}

const previewContainer = document.getElementById('preview-container');
const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', function() {
  const files = this.files;
  const fileCount = files.length;
  
  for (let i = 0; i < fileCount; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = function(event) {
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
      
      const columnCount = Math.ceil(Math.sqrt(fileCount));
      previewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
      const rowCount = Math.ceil(fileCount / columnCount);
      previewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
    };
    reader.readAsDataURL(file);
  }
});

previewContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-button')) {
    event.target.parentNode.remove();
    const remainingImages = document.querySelectorAll('.preview-image');
    const fileCount = remainingImages.length;
    const columnCount = Math.ceil(Math.sqrt(fileCount));
    previewContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
    const rowCount = Math.ceil(fileCount / columnCount);
    previewContainer.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
  }
});
