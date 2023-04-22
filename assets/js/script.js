import pets from './pets.js';


const BTN_LEFT = document.querySelector("#left_arrow");
const BTN_RIGHT = document.querySelector("#right_arrow");
const LEFT_BTN = document.querySelector("#left_btn");
const RIGHT_BTN = document.querySelector("#right_btn");
const CAROUSEL = document.querySelector("#pets_slider_carousel");
const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_RIGHT = document.querySelector("#item-right");

let k = 8;
let count = 0 ; 
let ranNums;



 const createCardTemplate = () => {
    const card = document.createElement("div");
    card.classList.add("card");
    return card;
  }

  const moveLeft = () => {
    countNodes++;
    count++; 
      if(count == 2){
        count = 0;
        random();
    }
 
    CAROUSEL.classList.add("transition-left");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
    LEFT_BTN.removeEventListener("click", moveLeft);
    RIGHT_BTN.removeEventListener("click", moveRight);
   
   
  }; 
  
  const moveRight = () => {
    countNodes++;
    count++; 
    if(count == 2){
        count = 0;
        random();
    }
      
    CAROUSEL.classList.add("transition-right");
    BTN_LEFT.removeEventListener("click", moveLeft);
    LEFT_BTN.removeEventListener("click", moveLeft);
    RIGHT_BTN.removeEventListener("click", moveRight);
    BTN_RIGHT.removeEventListener("click", moveRight);
    
 
  };
  
  BTN_LEFT.addEventListener("click", moveLeft );
  BTN_RIGHT.addEventListener("click", moveRight );
  LEFT_BTN.addEventListener("click", moveLeft);
RIGHT_BTN.addEventListener("click", moveRight);
  
  CAROUSEL.addEventListener("animationend", (animationEvent) => {
    let changedItem;
    if (animationEvent.animationName === "move-left") {
      CAROUSEL.classList.remove("transition-left");
      changedItem = ITEM_LEFT;
      document.querySelector("#item-active").innerHTML = ITEM_LEFT.innerHTML;
    } else {
      CAROUSEL.classList.remove("transition-right");
      changedItem = ITEM_RIGHT;
      document.querySelector("#item-active").innerHTML = ITEM_RIGHT.innerHTML;
    }

    
    changedItem.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      const card = createCardTemplate();
      let card_img = document.createElement("IMG");
      let text = document.createElement("p");
      let btn= document.createElement('button');
      btn.classList.add('card_button');
      btn.innerHTML = 'Learn more';
      text.classList.add('card_text');
      text.innerHTML = ranNums[i].name;
      card_img.src = ranNums[i].img.slice(1);
      card_img.classList.add('card_img');
      if(i == 1 ){
          card.classList.add('card_2');
      }
      else if(i == 2){
        card.classList.add('card_3');
      }
      changedItem.appendChild(card);
      card.appendChild(card_img);
      card.appendChild(text);
      card.appendChild(btn);
      ranNums.splice(i,1);
    }
    LEFT_BTN.addEventListener("click", moveLeft);
    RIGHT_BTN.addEventListener("click", moveRight);
    BTN_LEFT.addEventListener("click", moveLeft );
    BTN_RIGHT.addEventListener("click", moveRight );
  })

function random() { 
    let nums = [...pets];
    ranNums = [];
    let i = nums.length,
    j = 0;
    while (i--) {
    j = Math.floor(Math.random() * (i+1));
    ranNums.push(nums[j]);
    nums.splice(j,1);
    } 
 
    //создать стек для перезапуска рандома если цифры повторяются
}


random();

let countNodes = 0;
CAROUSEL.addEventListener('click', (e) => {
   
    let cards; 
    if(countNodes < 2){
        cards = e.target.parentNode.childNodes[3].textContent;
    }
    else{
        cards = e.target.parentNode.childNodes[1].textContent;
    }
    pets.forEach((item) => {
        if( cards == item.name){
            modal.style.display = "block";
            document.querySelector('body').classList.add('scroll_hide');
            let modal_img = document.createElement("IMG");
            let modal_title = document.createElement("h3");
            let modal_subtitle = document.createElement("h4");
            let modal_text = document.createElement("h5");
            let modal_list_ul = document.createElement("ul");
            let modal_div = document.createElement("div");
            modal_img.src = item.img.slice(1);
            document.querySelector('#container_popup').innerHTML = "";
            document.querySelector('#container_popup').appendChild(modal_img);
            document.querySelector('#container_popup').appendChild(modal_div);
            modal_div.classList.add('modal_text');
            modal_div.appendChild(modal_title);
            modal_div.appendChild(modal_subtitle);
            modal_div.appendChild(modal_text);
            modal_div.appendChild(modal_list_ul);
            for(let i = 0; i < 4; i++){
              modal_list_ul.appendChild(document.createElement("li"));
              modal_list_ul.childNodes[i].classList.add('modal_list_li');
            }
            let modal_list_li = modal_list_ul.childNodes;
            modal_title.innerHTML = item.name;
            modal_subtitle.innerHTML = `${item.type} - ${item.breed}`;
            modal_img.classList.add('modal_img');
            modal_text.innerHTML = item.description;
            modal_list_li[0].insertAdjacentHTML("afterbegin",  `Age: <span class="li_info">
            ${item.age} </span>`);
            modal_list_li[1].insertAdjacentHTML("afterbegin",  `Inoculations: <span class="li_info">
            ${item.inoculations} </span>`);
            modal_list_li[2].insertAdjacentHTML("afterbegin",  `Diseases: <span class="li_info">
            ${item.diseases} </span>`);
            modal_list_li[3].insertAdjacentHTML("afterbegin",  `Parasites: <span class="li_info">
            ${item.parasites} </span>`);
            modal_list_ul.classList.add('modal_list_ul');
        }
    });

})








/////MODAL/////

const modal = document.getElementById("myModal");

const btnModal = document.getElementById("myBtn");

const span = document.getElementsByClassName("close")[0];





span.onclick = function() {
  modal.style.display = "none";
  document.querySelector('body').classList.remove('scroll_hide');
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.querySelector('body').classList.remove('scroll_hide');
  }
}

