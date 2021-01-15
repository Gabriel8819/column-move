function moveColumn(columns, currentCard, x, y){

    let colPos = [];
    let currPos;
    let startPos;

    for (let i = 0; i < columns.length; i++) {
    
        
        if(currentCard.parentElement == columns[i]) {
            startPos = i;
            continue;
        }

        
        if(x > columns[i].offsetLeft && columns[i].offsetLeft > currentCard.parentElement.offsetLeft){
           

            currPos = columns[i].offsetLeft / columns[i].offsetWidth;
            columns[i].style.transform = `translateX(-100%)`;


        }else if(x < columns[i].offsetLeft + columns[i].offsetWidth && currentCard.parentElement.offsetLeft > columns[i].offsetLeft){

            currPos = columns[i].offsetLeft / columns[i].offsetWidth;
            columns[i].style.transform = "translateX(100%)";


        }else {
            columns[i].style.transform = "";
         
        }


      
    }   


    let p = currPos;
    for(let i = 0; i < columns.length; i++) {

        console.log(startPos , currPos)

        if(currentCard.parentElement === columns[i]){
            colPos[currPos] = currentCard.parentElement;
            continue
        }
       
        if(startPos < currPos && columns[i].offsetLeft / columns[i].offsetWidth <= currPos){
            
            colPos[currPos - p] = columns[i];
            p--;
        }else if(startPos > currPos && columns[i].offsetLeft / columns[i].offsetWidth >= currPos){
            if(currPos === undefined) currPos = startPos; 
            console.log("reverse",currPos - p)
            colPos[i+1] = columns[i];
            p++;
  
        }else{
            colPos[i] = columns[i];
        }
        
    
        
    }
  
    console.log(colPos)





}












export {
    moveColumn
};




// rippple canvas
// 3d canvas 2d
