'use strict';

const inputEl = document.getElementById('show__title');
const buttonEl = document.querySelector('.btn');
const listEl = document.querySelector('.search__output');
const favListEl = document.querySelector('.fav__list');
const buttonLogEl = document.querySelector('.log');
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
    const timeShow = show.show.schedule.time;
    const imgSrcPh = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    const showName =`${show.show.name}`;
    const newItem = document.createElement('li');
    const newP = document.createElement('p');
    const timeP = document.createElement('p');
    const timeContent = document.createTextNode(timeShow);
    const newContent = document.createTextNode(showName);
    const newImg = document.createElement('img');
    newP.setAttribute('class', 'title');
    newP.appendChild(newContent);
    newItem.setAttribute('class', 'card');
    newItem.appendChild(newP);
    newItem.appendChild(timeP);
    timeP.appendChild(timeContent);
    newItem.appendChild(newImg);
    listEl.appendChild(newItem);

    const swapColors = function(){//I'm aware this is not working as expected because it's inside the for loop, I'm trying to fix it in another branch.
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
buttonEl.addEventListener('click', handleButtonClick);
function handleLogButton(){
  const cardElArr =  document.querySelectorAll('.card');
  for (const card of cardElArr){
    const title = card.querySelector('.title');
    console.log(title.innerHTML);
  }
}
buttonLogEl.addEventListener('click',handleLogButton);