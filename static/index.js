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