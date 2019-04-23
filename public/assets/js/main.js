'use strict';

const inputEl = document.getElementById('show__title');
const buttonEl = document.querySelector('.btn');
const listEl = document.querySelector('.search__output');
const favListEl = document.querySelector('.fav__list');
const favArr = [];
const resultsArr = [];
const addToCache = function(){
  localStorage.setItem('fav',favArr);
};

const displayFav = function(){
  for (const fav of favArr){
    favListEl.appendChild(fav);
  }
};
const displayResponse = function(showsArr){
  for(const show of showsArr){
    const imgObj =`${show.show.image}`;
    const imgSrcPh = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    const showName =`${show.show.name}`;
    const newItem = document.createElement('li');
    const newP = document.createElement('p');
    const newContent = document.createTextNode(showName);
    const newImg = document.createElement('img');
    newP.appendChild(newContent);
    newItem.appendChild(newP);
    newItem.appendChild(newImg);
    listEl.appendChild(newItem);

    const swapColors = function(){
      newItem.classList.toggle('swap__style');
    };
    const addToFav = function(){
      favArr.push(newItem);
    };
    const handleItemClick = function (){
      swapColors();
      addToFav();
      displayFav();
      addToCache();
    };

    newItem.addEventListener('click', handleItemClick);
    newImg.setAttribute('alt', showName +' image');
    if(imgObj === 'null'){
      newImg.setAttribute('src', imgSrcPh);
    }else{
      const imgSrcMedium = `${show.show.image.medium}`;
      newImg.setAttribute('src', imgSrcMedium);
    }
    newItem.setAttribute('tabIndex', 0);
    resultsArr.push(newItem);
  }
};

function handleButtonClick(e){
  e.preventDefault();
  const inputValue = inputEl.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(response=>response.json())
    .then(displayResponse)
    .catch(error=> console.error(`Ha sucedido un error: ${error}`));
}
console.log(resultsArr, favArr);
buttonEl.addEventListener('click', handleButtonClick);
//# sourceMappingURL=main.js.map
