(function(document, window) {

const socket = io.connect(document.location.host);

document.querySelector('button').addEventListener("click",e=>{

    // request.session.user = user;
    socket.on('emit', (socket) => {
      console.log('Connexion');
    });

})
}(document, window));
