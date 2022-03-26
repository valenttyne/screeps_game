var util = require('util');
var roleBatedorDrop = {
    
    /** @param {Creep} creep **/
    run: function(creep,energiaTrabalhador='') {
        
        var engPersonalizada = false;
        
        if(energiaTrabalhador != ''){
            engPersonalizada=true;
        }
        
        var energia = Game.getObjectById(energiaTrabalhador);
        
        if(creep.room.name != NOME_SALA){
            creep.say('⛔');
            creep.moveTo(energia, {visualizePathStyle: {stroke: '#74fb00'}});
            return;
        }
        
        /*
        creep.room.find(FIND_TOMBSTONES).forEach(tombstone => {
            if(tombstone.creep instanceof PowerCreep) {
                console.log('`Power creep died here`');   
            }    
        });*/
        
       if(creep.store.getFreeCapacity() == 0){
          creep.memory.descarregar = true;
       }else
       if(creep.store.getFreeCapacity() == creep.store.getCapacity()){
           creep.memory.descarregar = false;
       }
            
	    if(creep.store.getFreeCapacity() > 0 && creep.memory.descarregar == false) {

	        
	        const targetDrop = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if(targetDrop) {
                if(creep.pickup(targetDrop) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetDrop, {visualizePathStyle: {stroke: '#74fb00'}});
                    creep.say('🐇 📦');
                }
            }else{
                var sources = creep.room.find(FIND_SOURCES);
                if( (engPersonalizada && creep.harvest(energia) == ERR_NOT_IN_RANGE )  || (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && engPersonalizada==false) ) {    
                    if(engPersonalizada){
                        creep.moveTo(energia, {visualizePathStyle: {stroke: '#74fb00'}});
                    }else{
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#74fb00'}});
                    }
                    
                    creep.say('🔄🐇');
                }
            }

        }
        else {
            
            if(creep.memory.erro){
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN 
                                || structure.structureType == STRUCTURE_TOWER
                                ) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }else
            if(GUERRA){
               var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {  return ( structure.structureType == STRUCTURE_TOWER)  > 0; }
                }); 
            }else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER) && 
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                });
            }

            if(targets.length > 0) { 

                var localDeposito = util.retornaElementoMaisProximo(targets,creep);

                if(creep.transfer(localDeposito, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(localDeposito);
                    creep.say('🐇 🚚');
                }else{
                    console.log('ERRO: '+creep.transfer(targets[0], RESOURCE_ENERGY));
                    creep.memory.erro = true;
                    console.log('RESOLVIDO: CREEP LIBERADOR PARA TODAS SOURCES');
                    //creep.suicide();
                }

            }
            
        }
	}
};

module.exports = roleBatedorDrop;