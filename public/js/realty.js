(function(document, window) {

    let input = document.querySelector('form input');

   

document.querySelector('.search').addEventListener("submit",e=>{

    e.preventDefault()
        
        let value = input.value
        console.log(value);
        fetch(`/${value}`).then(res=>location.assign(`/${value}`)).catch(err=>console.log(err))

}) 
    
document.querySelector('input').addEventListener("input",(e)=>{

    
    setTimeout(() => {
        
        let value = e.target.value
        fetch(`/${value}`).then(data=>{

            let f = document.querySelectorAll('.town');
            console.log(f);


        }).catch(err=>console.log(err))
    }, 3000);
   


})



}(document, window));
