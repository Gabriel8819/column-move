let container = document.querySelector(".container");
let columns = Array.prototype.slice.call(document.querySelectorAll(".column"))
let cards = Array.prototype.slice.call(document.querySelectorAll(".card"))



let x;
let y;



// columns[1].style.transform = "translate(-100%)"

console.log(columns[1].offsetLeft)
// columns[1].style.transform = `translate(100%)`
console.log(columns[1].offsetLeft)


let currentCard = null;
let switchColumn = null;
let parentElement = null;
let clone = null;
let translatePercent = 0;



let orderColumns= [];



for(let i = 0; i < cards.length; i++){

        cards[i].addEventListener("mousedown", (e)=>{
            e.preventDefault()

            x = e.clientX - container.offsetLeft;
            y = e.clientY - container.offsetTop;


            currentCard = cards[i];
            // currentCard.parentElement.style.visibility = "hidden"
            parentElement = currentCard.parentElement;
            
            clone = currentCard.cloneNode();
            clone.classList.add("card-drag")
            // clone.style.position = "absolute";
            // clone.style.display = "block";
            container.appendChild(clone);
            // clone.style.top
            
            
            clone.style.top = `${currentCard.offsetTop}px`;
            clone.style.left = `${currentCard.offsetLeft}px`;
            
         
            // currentCard.style.display = "none";
            

            document.addEventListener("mousemove", mousemove);
            document.addEventListener("mouseup", mouseup);

        });



};






function mousemove(e){
    let dx = e.clientX - container.offsetLeft - x;
    let dy = e.clientY - container.offsetTop - y;

    x = e.clientX - container.offsetLeft;
    y = e.clientY - container.offsetTop;




    clone.style.left = `${clone.offsetLeft + dx}px`;
    clone.style.top = `${clone.offsetTop + dy}px`;

    



    
    let closest = {
        col: null,
        distance: Number.NEGATIVE_INFINITY
    };



    columns.forEach((column)=>{
        if(parentElement === column) return;
         
            if(column.offsetLeft - x < 0 && column.offsetLeft > currentCard.parentElement.offsetLeft){
              
                column.style.transform = "translateX(-100%)";
         
                if(column.offsetLeft - x > closest.distance){
                    switchColumn = closest.col = column
                    closest.distance = column.offsetLeft - x
                }
    
            }else if(column.offsetLeft + column.offsetWidth > x && column.offsetLeft < currentCard.parentElement.offsetLeft){
                column.style.transform = "translateX(100%)"

                if(x - column.offsetLeft + column.offsetWidth > closest.distance){
                    switchColumn = closest.col = column
                    closest.distance = x - column.offsetLeft + column.offsetWidth
                }

            }else{
                column.style.transform = "";
                
            }
    });

    

    if(closest.col !== null){
        let s = (closest.col.offsetLeft - currentCard.parentElement.offsetLeft) / 210
        // console.log(closest.col.offsetLeft , currentCard.parentElement.offsetLeft)
        console.log(s)
        currentCard.parentElement.style.transform = `translate(${s * 100}%)`;
    }else{
        currentCard.parentElement.style.transform = "";
    }



}


function mouseup(e){

    //@todo
    //keep track of the column into a data structure to switch  between appendChild or insertafter


    currentCard.parentElement.style.transform = "";
    
    columns.forEach((column)=>{
        column.style.transform = ""
    })

    let moveColumn = currentCard.parentElement.parentElement;
    let parentSwitch = switchColumn.parentElement;


    let toMove = moveColumn.removeChild(currentCard.parentElement);
    let toSwitch = parentSwitch.removeChild(switchColumn);

    moveColumn.appendChild(toSwitch)
    parentSwitch.appendChild(toMove)


    // console.log(toMove, toSwitch, parentSwitch)



    if(currentCard !== null){
        currentCard.classList.remove("card-drag");
        currentCard.parentElement.style.visibility = ""
        //   currentCard.style.display = "block"


        container.removeChild(clone);
        
        //   clone.style.top = "";
        //   clone.style.left = "";
    }
    
    currentCard = null;
    switchColumn = null;
    clone = null;
    document.removeEventListener("mousemove", mousemove)
    document.removeEventListener("mouseup", mouseup)


}








/*

    add event listener mousedown
        - prevent default, if not it will complaint about drag
        - get x and y mouse position
        - add classlist for absolute positioning
        - set top and left position to offset left and top  (important that the container have relative positioning and not the column)




    add event listener mousemove
        - get the differrence between the current mouse position and the last mouse position
        - reset the mouse position to current mouse position
        - set the new left and top style position to offsetLeft and offsetTop plus the  delta mouse position between events call




    add event listener mouseup
        - remove classlist that add absolute positionning
        - set top and left style  to empty string
        - set currentcard to null
        - remove event listener mousemove and mouseup from document object




*/













// codepend trello, full opacity
//timeline , moving 10unit each time
//shadow root

