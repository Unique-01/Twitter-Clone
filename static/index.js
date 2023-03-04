function changeDiv(e) {
    var target = document.getElementById('divdiv');
    var section = e.getAttribute("data-section");
    console.log(section);
    target.innerHTML = document.getElementById(section).innerHTML;

}