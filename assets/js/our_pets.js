///////////////PAGINATION/////////////

import pets from './pets.js';

const BTN_LEFT_first = document.querySelector("#left_arrow_first");
const BTN_LEFT_second = document.querySelector("#left_arrow_second");
const BTN_RIGHT_first = document.querySelector("#right_arrow_first");
const BTN_RIGHT_second = document.querySelector("#right_arrow_second");
const PAGE_COUNTER = document.querySelector('#center_button');
const Slider = document.querySelector('#our_pets_slider');

let PageCount = 1;

let maxPageCount = 6;

let countElement = 8;

let Cards_Array = [];

let WindowsSIze = window.innerWidth;



function checkWindowWidth(WindowsSIze){
    if(WindowsSIze >= 1280){
        maxPageCount = 6;
        countElement = 8;
        if(PageCount > maxPageCount){
            PageCount = maxPageCount;
            
            PAGE_COUNTER.innerHTML = PageCount ;
            CreateCards(((maxPageCount -1) * countElement) ,((maxPageCount -1) * countElement) + countElement );
        }else{
            
            CreateCards(((PageCount-1) * countElement) ,((PageCount -1) * countElement) + countElement );
        }
        checkStatusBtn();
       
        
    }
    else if(WindowsSIze >= 768){
        maxPageCount = 8;
        countElement = 6;
        if(PageCount > maxPageCount){
            PageCount = maxPageCount;
        
            PAGE_COUNTER.innerHTML = PageCount ;
            CreateCards(((maxPageCount -1) * countElement) ,((maxPageCount -1) * countElement) + countElement );
        }else{
            
            CreateCards(((PageCount-1) * countElement) ,((PageCount -1) * countElement) + countElement );
        }
        checkStatusBtn();

        
    }else{
        maxPageCount = 16;
        countElement = 3;
        if(PageCount > maxPageCount){
            PageCount = maxPageCount;
         
            PAGE_COUNTER.innerHTML = PageCount ;
            CreateCards(((maxPageCount -1) * countElement) ,((maxPageCount -1) * countElement) + countElement );
        }else{
            
            CreateCards(((PageCount-1) * countElement) ,((PageCount -1) * countElement) + countElement );
        }
        checkStatusBtn();
    }
}

window.addEventListener(`resize`, event => {
    WindowsSIze = window.innerWidth;

    checkWindowWidth(WindowsSIze);
  });





const createCardTemplate = () => {
    const card = document.createElement("div");
    card.classList.add("card");
    return card;
  }

const PetsMoveLeft = () => {
    if(PageCount > 1){
        PageCount--;

        PAGE_COUNTER.innerHTML = PageCount;
        let firstIndex = ((PageCount-1) * countElement); 
        let lastIndex = ((PageCount -1) * countElement) + countElement ;
        CreateCards(firstIndex,lastIndex );
    } 
    checkStatusBtn();
        
  }; 
  const PetsMoveRight = () => {
    if(PageCount < maxPageCount ){
   
        PAGE_COUNTER.innerHTML = PageCount +1;
        let firstIndex = (PageCount * countElement) ; 
        let lastIndex = (PageCount * countElement) + countElement ;
        CreateCards(firstIndex,lastIndex );
        PageCount++;
        
    }
    checkStatusBtn();
  };

  
  BTN_LEFT_first.addEventListener("click",PetsMoveLeft);

  BTN_LEFT_second.addEventListener("click", () =>{
    if(PageCount > 1){
        PageCount = 1;
 
        PAGE_COUNTER.innerHTML = PageCount;
        let firstIndex = 0;
        let lastIndex = countElement ;
        CreateCards(firstIndex,lastIndex );
       
    } 
    checkStatusBtn();
  }
  );
  BTN_RIGHT_first.addEventListener("click",PetsMoveRight);

  BTN_RIGHT_second.addEventListener("click", () =>{
      if(PageCount < maxPageCount){

        PAGE_COUNTER.innerHTML = maxPageCount;
        let firstIndex = ((maxPageCount -1) * countElement) ; 
        let lastIndex = ((maxPageCount -1) * countElement) + countElement ;
        CreateCards(firstIndex,lastIndex );
        PageCount = maxPageCount;
      }
      checkStatusBtn();
  }
  );


   function randomCards() { 
      for(let k = 0 ; k < 6; k++){
        let cardNums = [...pets];
        let i = cardNums.length,
        j = 0;
        while (i--) {
        j = Math.floor(Math.random() * (i+1));
        Cards_Array.push(cardNums[j]);
        cardNums.splice(j,1);
        } 
      }
} 


function CreateCards(firstIndex , lastIndex) {
    Slider.innerHTML = "";
    for(let i = firstIndex; i < lastIndex; i++){
        const card = createCardTemplate();
        let card_img = document.createElement("IMG");
        let text = document.createElement("p");
        let btn= document.createElement('button');
        btn.classList.add('card_button');
        btn.innerHTML = 'Learn more';
        text.classList.add('card_text');
        text.innerHTML = Cards_Array[i].name;
        card_img.src = Cards_Array[i].img;
        Slider.appendChild(card);
        card.appendChild(card_img);
        card.appendChild(text);
        card.appendChild(btn);
    }
}

randomCards();
function firstCardsRow(){
    Slider.innerHTML = ""; 
    CreateCards(0 , 8);
}

firstCardsRow();


function checkStatusBtn(){
    if(PageCount  <= 1){
        BTN_LEFT_first.setAttribute("disabled", "disabled");
        BTN_LEFT_second.setAttribute("disabled", "disabled");
        BTN_RIGHT_first.removeAttribute("disabled", "disabled");
        BTN_RIGHT_second.removeAttribute("disabled", "disabled");
    }
    else if(PageCount == maxPageCount){
        BTN_RIGHT_first.setAttribute("disabled", "disabled");
        BTN_RIGHT_second.setAttribute("disabled", "disabled");
        BTN_LEFT_first.removeAttribute("disabled", "disabled");
        BTN_LEFT_second.removeAttribute("disabled", "disabled");
    }
    else{
        BTN_LEFT_first.removeAttribute("disabled", "disabled");
        BTN_LEFT_second.removeAttribute("disabled", "disabled");
        BTN_RIGHT_first.removeAttribute("disabled", "disabled");
        BTN_RIGHT_second.removeAttribute("disabled", "disabled");
    }
}


const modal = document.getElementById("myModal");

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



Slider.addEventListener('click', (e) => {

    let cards; 

    cards = e.target.parentNode.childNodes[1].textContent;

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
            modal_img.src = item.img;
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

checkWindowWidth(WindowsSIze);
