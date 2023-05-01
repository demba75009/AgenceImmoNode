(function(document, window) {


let image = document.querySelectorAll('.imageDetail');

let button = document.querySelector('.Show');

let toogleButton = false;


for (let index = 0; index < image.length; index++) {
    const element = image[index];

    if(index > 0){

        element.hidden = true
    }
    
}



button.addEventListener("click",e=>{

    toogleButton = !toogleButton

if(toogleButton)
{
    image.forEach(element => {


        element.hidden = false
    })

  


    button.textContent = "SHOW LESS"
}

else
{
    for (let index = 0; index < image.length; index++) {
        const element = image[index];
    
        if(index > 0){
    
            element.hidden = true
        }
        
    }

   
    button.textContent = "SHOW MORE"
}
  
})


}(document, window));
