
// definir las constantes o variables que quiero que sean globales en mi aplicacion 


// si vamos a desplegar app a un servidor como heroku , heroku nos da lo que es process.env.PORT (si lee de la siguiene manera) (asi si existe lo toma sino toma el or || )
export const SERVER_PORT: number = Number( process.env.PORT ) || 5000;