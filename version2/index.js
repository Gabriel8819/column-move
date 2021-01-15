import {moveColumn} from "./utils.js";






let container = document.querySelector(".container");
let colWrappers = Array.prototype.slice.call(document.querySelectorAll(".col-wrapper"))
let columns = Array.prototype.slice.call(document.querySelectorAll(".column"))
let cards = Array.prototype.slice.call(document.querySelectorAll(".card"))



let x;
let y;






let currentCard = null;
let currentCardPos = null;
let switchColumn = null;
let parentElement = null;
let clone = null;
let translatePercent = 0;



for(let i = 0; i < cards.length; i++){
        
        cards[i].addEventListener("mousedown", (e)=>{
     
            e.preventDefault()

            x = e.clientX - container.offsetLeft;
            y = e.clientY - container.offsetTop;
          
            document.addEventListener("mousemove", mousemove);
            document.addEventListener("mouseup", mouseup);

            currentCard = cards[i];
            cards[i].classList.add("card-drag");




            
           






        });



};



function mousemove(e){
    let dx = e.clientX - container.offsetLeft - x;
    let dy = e.clientY - container.offsetTop - y;

    x = e.clientX - container.offsetLeft;
    y = e.clientY - container.offsetTop;

    currentCard.style.left = `${currentCard.offsetLeft + dx}px`;
    currentCard.style.top = `${currentCard.offsetTop + dy}px`;
    

    moveColumn(columns, currentCard, x, y)
    
    


}


function mouseup(e){
        

        if(currentCard !== null){
            currentCard.classList.remove("card-drag")
            currentCard.style.left = "";
            currentCard.style.top = "";





            let startPos = currentCard.parentElement.offsetLeft / currentCard.parentElement.offsetWidth
            let endPos = Math.floor(x / 210);
            // console.log(endPos, startPos)
    
            for (let i = 0; i < columns[i]; i++) {



            }






            currentCard = null;

        }




      
        document.removeEventListener("mousemove", mousemove)
        document.removeEventListener("mouseup", mouseup)
  
    
}





