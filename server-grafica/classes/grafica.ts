

export class GraficaData {

    private meses: string[] = ['enero', 'febrero', 'marzo', 'abril' ];
    private valores: number[] = [0, 0, 0, 0];

    constructor() { }

    getDataGrafica() {
        // debe regresar la data tal cual la necesita tipo de data para poder graficar 
        return [
            { data: this.valores , label: 'Ventas'}
        ];
    }

    incrementarValor( mes: string, valor: number ) {

        mes = mes.toLowerCase().trim();

        for( let i in this.meses ) {
          // diseño de data tengo 4 meses - 4 valores , - asi logro actualizar valor del mes que quiero , usando indexes respectivos
            if ( this.meses[i] === mes ) {
                this.valores[i] += valor;
            }

        }

        return this.getDataGrafica();

    }


}

// clase para controlar la data 
// la idea es crear servicioRest que se   dispara cuando entramos por primira vez al dashboard de la grafica para obtencion de informacion , 
// luego cuando haya la data cargada , nediante sockets se hay cambios vamos a disparar los cambios paraque se vuelva a graficar los cambios en tiempo real 