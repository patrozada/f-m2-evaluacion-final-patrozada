'use strict';

const inputEl = document.getElementById('show__title');
const buttonEl = document.querySelector('.btn');
const listEl = document.querySelector('.search__output');

const displayResponse = function(showsArr){
  for(const show of showsArr){    
    const itemArr =[];
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
    newImg.setAttribute('alt', showName +' image');
    if(imgObj === 'null'){
      newImg.setAttribute('src', imgSrcPh);
    }else{
      const imgSrcMedium = `${show.show.image.medium}`;
      newImg.setAttribute('src', imgSrcMedium);
    }
    itemArr.push(newItem);
    console.log(itemArr);
  }
};

function handleButtonClick(e){
  e.preventDefault();
  const inputValue = inputEl.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(response=>response.json())
    .then(displayResponse)
    .catch(error=> console.error(`Ha sucedido un error: ${error}`));

  // for(const li of itemArr){
  //   li.addEventListener('click', handleLiClick);
  // }
  // function handleLiClick(){
  //   console.log();
  //   const wishlistEl = document.createElement('ul');
  //   const favouritesEl = document.querySelector('.favourites__side');
  //   favouritesEl.appendChild(wishlistEl);
  // }
}
buttonEl.addEventListener('click', handleButtonClick);