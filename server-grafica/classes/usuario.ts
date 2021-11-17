

export class Usuario {
     
    // id de socket que se esta conectando required siempre debe existir 
    public id: string;
    public nombre: string;
    public sala: string;

    constructor( id: string ) { 
        
        this.id = id;
        // opcinal
        this.nombre = 'sin-nombre';
        this.sala   = 'sin-sala';

    }

}



// refresh al nav , genera nueva conexion de socket : es decir nuevo id socket - asi vamos a usar memoria clase en este caso , si numero de usuario alto es conviniente trabajamos con  modelos para grabacion db 
// memeria para identifcar usuario aun autenticado no estar depende de la ref del id socket que inestable .