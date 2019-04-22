'use strict';

//Get elements from HTML and save them in const
const inputEl = document.getElementById('show__title');
const buttonEl = document.querySelector('.btn');
const listEl = document.querySelector('.search__output');

function handleButtonClick(e){
  e.preventDefault();
  const inputValue = inputEl.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(response=>response.json())
    .then(showsArr=>{
      for(const show of showsArr){
        const imgSrcMedium = `${show.show.image.medium}`
        const imgSrcPh = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        const showName =`${show.show.name}`
        const newItem = document.createElement('li');
        const newP = document.createElement('p');
        const newContent = document.createTextNode(showName);
        const newImg = document.createElement('img');
        newP.appendChild(newContent);
        newItem.appendChild(newP);
        newItem.appendChild(newImg);
        listEl.appendChild(newItem);
        newImg.setAttribute('alt', showName +' image');
        if(imgSrcMedium){
          newImg.setAttribute('src', imgSrcMedium);
        }else{
          newImg.setAttribute(imgSrcPh);
        }
      }
    })
    .catch(error=> console.error(`Ha sucedido un error: ${error}`));
}

buttonEl.addEventListener('click', handleButtonClick);

//# sourceMappingURL=main.js.map
