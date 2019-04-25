'use strict';

const inputEl = document.getElementById('show__title');
const buttonEl = document.querySelector('.btn');
const listEl = document.querySelector('.search__output');
const favListEl = document.querySelector('.fav__list');
const favArr = [];
const resultsArr = [];


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

    const handleItemClick = function (){
      newItem.classList.toggle('swap__style');
    };

    newItem.addEventListener('click', handleItemClick);
    newImg.setAttribute('alt', showName +' image');
    if(imgObj === 'null'){
      newImg.setAttribute('src', imgSrcPh);
    }else{
      const imgSrcMedium = `${show.show.image.medium}`;
      newImg.setAttribute('src', imgSrcMedium);
    }
    resultsArr.push(newItem);
  }
  console.log(resultsArr);
};


function handleButtonClick(e){
  e.preventDefault();
  const inputValue = inputEl.value;
  if (resultsArr.length !==0){
    while (listEl.firstChild){
      listEl.removeChild(listEl.firstChild);
    }
    fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
      .then(response=>response.json())
      .then(displayResponse)
      .catch(error=> console.error(`Ha sucedido un error: ${error}`));
  }else{
    fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
      .then(response=>response.json())
      .then(displayResponse)
      .catch(error=> console.error(`Ha sucedido un error: ${error}`));
  }
}
buttonEl.addEventListener('click', handleButtonClick);

function handleListClick(){
  for(const item of resultsArr){
    if (item.classList.contains('swap__style')){
      const dupItem = item.cloneNode(true);
      console.log(dupItem.id);
      favArr.push(dupItem);
    }
  }
  for (const fav of favArr){
    favListEl.appendChild(fav);
  } 
}

listEl.addEventListener('click', handleListClick);