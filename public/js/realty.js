(function(document, window) {

    let input = document.querySelector('form input');

document.querySelector('.search').addEventListener("submit",e=>{

    e.preventDefault()
    setTimeout(() => {
        
        let value = input.value
        console.log(value);
        fetch(`/${value}`).then(res=>console.log(res)).catch(err=>console.log(err))
    }, 2000);

})
    
document.querySelector('input').addEventListener("input",(e)=>{

    
    setTimeout(() => {
        
        let value = e.target.value
        fetch(`/${value}`).then(res=>res).then(data=>console.log(data)).catch(err=>console.log(err))
    }, 3000);
   


})

}(document, window));
