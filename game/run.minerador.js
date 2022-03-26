var util = require('util');
var runMinerador = {
    
    /** @param {Creep} creep **/
    run: function(creep,energiaTrabalhador='',apenasDeposita=APENAS_DEPOSITA) {
        
        var engPersonalizada = false;
        
 
        if(energiaTrabalhador != ''){
            engPersonalizada=true;
        }
        
        var energia = Game.getObjectById(energiaTrabalhador);
        
        if(creep.memory.sala != 'E44N43'){
            if(creep.room.name != NOME_SALA){
                creep.say('⛔');
                creep.moveTo(energia, {visualizePathStyle: {stroke: '#74fb00'}});
                return;
            }
        }       
       if(creep.store.getFreeCapacity() == 0){
          creep.memory.descarregar = true;
       }else
       if(creep.store.getFreeCapacity() == creep.store.getCapacity()){
           creep.memory.descarregar = false;
       }
           
	    if(creep.store.getFreeCapacity() > 0 && creep.memory.descarregar == false) {
	        
	        if(engPersonalizada){
                var sourcesPersonalizado = creep.room.find(FIND_SOURCES, { filter: (i) => i.id == energiaTrabalhador});  
            }

            if(sourcesPersonalizado.length > 0){

                if( creep.harvest(sourcesPersonalizado[0]) == ERR_NOT_IN_RANGE  ) {    
                    creep.moveTo(sourcesPersonalizado[0], {visualizePathStyle: {stroke: '#74fb00'}});                            
                    creep.say('🔄⚒️');
                }

            }else{

                var sources = creep.room.find(FIND_SOURCES);

                if( creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#74fb00'}});
                    creep.say('🔄⚒️');
                }
                
            }

        }else {

        
            if(apenasDeposita){
                 var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN 
                                //|| structure.structureType == STRUCTURE_TOWER
                                ) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN 
                                || structure.structureType == STRUCTURE_TOWER
                                ) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }
            /*
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ( structure.structureType == STRUCTURE_TOWER ) ;
                    }
                });*/
            
            if(targets.length > 0) {
                //analisa qual o melhor lugar de deposito
                var localDeposito = util.retornaElementoMaisProximo(targets,creep);

                if(creep.transfer(localDeposito, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(localDeposito, {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('🚚');
                }
            }
        }
	}
};

module.exports = runMinerador;