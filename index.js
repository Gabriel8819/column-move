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

            currentCard = cards[i];
            parentElement = currentCard.parentElement;
            currentCardPos = parentElement.offsetLeft / 210;
            // currentCard.parentElement.style.visibility = "hidden";

            
            clone = currentCard.cloneNode();
            clone.classList.add("card-drag");
            container.appendChild(clone);
            
            
            clone.style.top = `${currentCard.offsetTop}px`;
            clone.style.left = `${currentCard.offsetLeft}px`;

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



    for(let i = 0; i < columns.length; i++){
        
        if(parentElement === columns[i])  continue;

        if(columns[i].offsetLeft - x < 0 && columns[i].offsetLeft > currentCard.parentElement.offsetLeft){
            //Go right
           
            columns[i].style.transform = "translateX(-100%)";

            if(columns[i].offsetLeft - x > closest.distance){
                switchColumn = columns[i].parentElement.offsetLeft / 210
                
                closest.col = columns[i];
                closest.distance = columns[i].offsetLeft - x;
            }

        }else if(columns[i].offsetLeft + columns[i].offsetWidth > x && columns[i].offsetLeft < currentCard.parentElement.offsetLeft){
            //Go left
            columns[i].style.transform = "translateX(100%)";
            
            if(x - columns[i].offsetLeft + columns[i].offsetWidth > closest.distance){
                switchColumn = columns[i].parentElement.offsetLeft / 210 

                closest.col = columns[i];
                closest.distance = x - columns[i].offsetLeft + columns[i].offsetWidth;
            }

        }else{
            columns[i].style.transform = "";
            
            
        }
        
    }



    if(closest.col !== null){
        let s = (closest.col.offsetLeft - currentCard.parentElement.offsetLeft) / 210
        
        currentCard.parentElement.style.transform = `translate(${s * 100}%)`;


    }else{
        currentCard.parentElement.style.transform = "";
        switchColumn = null
        


    }

    console.log(switchColumn)

}


function mouseup(e){
        

        currentCard.parentElement.style.transform = "";
        
        columns.forEach((column)=>{
        column.style.transform = "";
        })

        if(switchColumn !== null){
            // console.log(currentCardPos);
            // console.log(switchColumn);



            // let currentColumnWrapper = columns[0].parentElement;
            // let columnWrapper2 = columns[1].parentElement;
            // let columnWrapper3 = columns[2].parentElement;

            // let c = currentColumnWrapper.removeChild(currentCard.parentElement);
            // let c1 = columnWrapper2.removeChild(columns[1]);
            // let c2 = columnWrapper3.removeChild(columns[2]);

            
            // currentColumnWrapper.appendChild(c1);
            // columnWrapper2.appendChild(c2);
            // columnWrapper3.appendChild(c);


            // columns[switchColumn].parentElement.appendChild(currentCard.parentElement);
            





            if(currentCardPos < switchColumn){

                let lastColumn;
                let lastCard;

                for (let i = currentCardPos; i <= switchColumn; i++) {
                    
                    let bufferCol = columns[i].parentElement;
                    
                    if(i === currentCardPos){
                        lastColumn = bufferCol;
                        lastCard = bufferCol.removeChild(columns[i]);
                        continue;
                    }

                    bufferCol.removeChild(columns[i]);
                    lastColumn.appendChild(columns[i])
                    lastColumn = bufferCol;


                    if(i === switchColumn){
                        bufferCol.appendChild(lastCard)
                    }
                }
            }else{
                
                let lastColumn;
                let lastCard;
                
                
                for (let i = currentCardPos; i >= switchColumn; i--) {
                    console.log("test")
                
                    let bufferCol = columns[i].parentElement;
                    
                    if(i === currentCardPos){
                        lastColumn = bufferCol;
                        lastCard = bufferCol.removeChild(columns[i]);
                        continue;
                    }

                    lastColumn.appendChild(bufferCol.removeChild(columns[i]));
                    lastColumn = bufferCol;

                    if(i === switchColumn){
                        lastColumn.appendChild(lastCard);
                    }
                }
            }
         

            //a lenvers+
        



            // let moveParent = columns[currentCardPos].parentElement;
            // let switchParent = columns[switchColumn].parentElement;

            // // console.log(moveParent, switchParent)


            // let c = moveParent.removeChild(columns[currentCardPos])
            // let s = switchParent.removeChild(columns[switchColumn])

            // moveParent.appendChild(s)
            // switchParent.appendChild(c)




        }
        
        if(currentCard !== null){
            currentCard.classList.remove("card-drag");
            currentCard.parentElement.style.visibility = ""
            //   currentCard.style.display = "block"

            container.removeChild(clone);

            
            //   clone.style.top = "";
            //   clone.style.left = "";
        }

        columns = Array.prototype.slice.call(document.querySelectorAll(".column"))
        
        currentCard = null;
        switchColumn = null;
        clone = null;
        document.removeEventListener("mousemove", mousemove)
        document.removeEventListener("mouseup", mouseup)
    // }
    
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

