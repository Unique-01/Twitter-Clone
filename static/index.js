function changeDiv(e) {
    var target = document.getElementById('divdiv');
    var section = e.getAttribute("data-section");
    console.log(section);
    target.innerHTML = document.getElementById(section).innerHTML;

}

// var form = document.getElementById('tweetForm');

var seen_by = document.getElementById('id_seen_by');
seen_by.className='hidden';
document.getElementById('id_content').onclick = function () {
    seen_by.className='';
}