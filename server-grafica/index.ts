import Server from './classes/server'; // esta clase implementa patron singlton 






//const server = new Server(); // era clase normar - ahora pasa de implementar patron singlton ver video 23
const server = Server.instance; // accedo a un getter






server.start( () => {
  console.log(`Servidor corriendo en el puerto ${ server.port }`);
   
});


