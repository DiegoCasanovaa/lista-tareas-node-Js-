const Tarea = require('./tarea')

class Tareas { 

    _listado = {};

    get listadoArr(){
        
        const listado = [];

        Object.keys(this._listado).forEach( key => { 
            const tarea = this._listado[key];
            listado.push( tarea );
        })

        return listado;
    }

    constructor(){

        this._listado = { }
    }

    borrarTarea(id = ''){

        if( this._listado[id]){
            delete this._listado[id];
        }

    }

    cargarTareasFromArray( tareas = []){ 

        tareas.forEach( tarea => { 
            this._listado[tarea.id] = tarea;
        })

    }

    crearTarea( desc = ''){

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){
   
        this.listadoArr.forEach( (tarea, idx )=> { 

            const index = `${idx + 1}`.green;
            const {  desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? 'Compleatada'.green
                                : 'Pendiente'.red;
            console.log(` \n ${ index } ${ desc } :: ${ estado }`);


        })

    }

    listarPendientesCompletadas( completadas = true){

        let contador = 0  
        this.listadoArr.forEach( tarea=> { 

            const {  desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? 'Compleatada'.green
                                : 'Pendiente'.red;

            if(completadas){

                if( completadoEn ){

                    contador += 1;
                    console.log(` \n ${ (contador + '.').green } ${ desc } :: ${ estado }`);
                    
                }
            } else { 

                if( !completadoEn){

                    contador += 1;
                    console.log(` \n ${ (contador + '.').green } ${ desc } :: ${ estado }`);

                }
            }


        })
    }

    toggleCompletadas ( ids = [  ]){ 

        ids.forEach( id => { 

            const tarea = this._listado[id];

            if( !tarea.completadoEn ){ 

                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea => { 

            if ( !ids.includes(tarea.id) ){
                
                this._listado[tarea.id].completadoEn = null;
            } 

        })

    }

}


module.exports = Tareas;