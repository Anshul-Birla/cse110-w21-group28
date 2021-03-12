var coll = document.getElementById('table-header');
coll.onclick = toggleTable();

function toggleTable() {
    coll.classList.toggle("active");
    var content = coll.parentElement;
    if (content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    } 
}