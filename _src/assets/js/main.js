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
        console.log(`${show.show.image.medium}`);
        const newItem = document.createElement('li');
        const newP = document.createElement('p');
        const newContent = document.createTextNode(`${show.show.name}`);
        const newImg = document.createElement('img');
        newImg.setAttribute('src', `${show.show.image.medium}`);
        newP.appendChild(newContent);
        newItem.appendChild(newP);
        newItem.appendChild(newImg);
        listEl.appendChild(newItem);
      }
    })
    .catch(error=> console.error(`Ha sucedido un error: ${error}`));
}

buttonEl.addEventListener('click', handleButtonClick);
