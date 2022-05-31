document.querySelector('.btn').addEventListener('click', function(){
    let title = document.querySelector('#title').value
    let link = document.querySelector('link').value
    let ul = document.querySelector('.ullist')
    let newlist = document.createElement('li');
    newlist.innerHTML = `<span class="span1">${title}</span><span class="span2">${link}</span>`
    ul.appendChild(newlist)
})