let container = document.querySelector(".container");
let columns = Array.prototype.slice.call(document.querySelectorAll(".column"))
let cards = Array.prototype.slice.call(document.querySelectorAll(".card"))



let x;
let y;



// columns[1].style.transform = "translate(-100%)"

console.log(columns[1].offsetLeft)


let currentCard = null;
let parentElement = null;
let clone = null;
let translatePercent = 0;

for(let i = 0; i < cards.length; i++){

        cards[i].addEventListener("mousedown", (e)=>{
            e.preventDefault()

            x = e.clientX - container.offsetLeft;
            y = e.clientY - container.offsetTop;


            currentCard = cards[i];
            parentElement = currentCard.parentElement;
            currentCard.classList.add("card-drag")
            
            clone = currentCard.cloneNode();
            // clone.style.position = "absolute";
            // clone.style.display = "block";
            container.appendChild(clone);
            
            
            clone.style.top = `${currentCard.offsetTop}px`;
            clone.style.left = `${currentCard.offsetLeft}px`;
            
            console.log(clone.offsetLeft)
            console.log(currentCard.offsetLeft)
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

    
    console.log(clone.offsetLeft, currentCard.offsetTop);


    clone.style.left = `${clone.offsetLeft + dx}px`;
    clone.style.top = `${clone.offsetTop + dy}px`;

    



    
    let closest = {
        col: null,
        distance: Number.NEGATIVE_INFINITY
    };

    let rightClosest = Number.POSITIVE_INFINITY;
    let col;

    columns.forEach((column)=>{
        if(parentElement === column) return;
         
        // if(column.offsetLeft - x > 0 && closest.distance > column.offsetLeft - x){
        //     // console.log(closest.column);
        //     closest = {
        //         distance: column.offsetLeft - x,
        //         col: column
        //     };
        // }


        if(dx > 0){
            //going right
            if(column.offsetLeft - x < 0 && column.offsetLeft > currentCard.parentElement.offsetLeft){
               
                // rightClosest = column.offsetLeft - x
                column.style.transform = "translateX(-100%)"
                if(column.offsetLeft + column.offsetWidth - x > closest.distance){

                    let off = (column.offsetLeft - currentCard.parentElement.offsetLeft) / 210 
                    closest.col = off
                    console.log(column.offsetLeft , currentCard.parentElement.offsetLeft)
            
                    closest.distance = column.offsetLeft + column.offsetWidth - x;
                }
    
            }
          
        }else{
            //going left
        
            // if(column.offsetLeft + column.offsetWidth  > x ){
            //     // console.log(column)
    
    
    
    
            // }


        }


    });




    currentCard.parentElement.style.transform = `translate(${closest.col * 100}%)`;

    if(col !== undefined){

    }

}


function mouseup(e){
    
    if(currentCard !== null){
      currentCard.classList.remove("card-drag");
    //   currentCard.style.display = "block"

      container.removeChild(clone);

    //   clone.style.top = "";
    //   clone.style.left = "";
    }
    currentCard = null;
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

