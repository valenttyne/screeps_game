var roleBatedorLink = require('role.batedorLink');

var runAjudantesAtualizadores = {
    
    /** @param {Creep} creep **/
    run: function(creep,energiaTrabalhador='',apenasDeposita=APENAS_DEPOSITA) {
        
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
                
       if(creep.store.getFreeCapacity() == 0){
          creep.memory.descarregar = true;
       }else
       if(creep.store.getFreeCapacity() == creep.store.getCapacity()){
           creep.memory.descarregar = false;
       }
           
        if(creep.store.getFreeCapacity() > 0 && creep.memory.descarregar == false) {
            
            const targetDrop = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if(targetDrop && false) { // desativado para usar uma batedor individual
                if(creep.pickup(targetDrop) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetDrop);
                    creep.say('🔄');
                }
            }else{
                var sources = creep.room.find(FIND_SOURCES);
                if( (engPersonalizada && creep.harvest(energia) == ERR_NOT_IN_RANGE )  || (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && engPersonalizada==false) ) {    
                    if(engPersonalizada){
                        creep.moveTo(energia, {visualizePathStyle: {stroke: '#74fb00'}});
                    }else{
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#74fb00'}});
                    }
                    
                    creep.say('🔄');
                }
            }

        }else{

            if(ATUALIZADOR_STORE){
                //var target = = Game.getObjectById(STORE_ATUALIZADOR);   

                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (i) => i.structureType == STRUCTURE_CONTAINER 
                                    &&  i.store[RESOURCE_ENERGY] < 2000 
                                    &&  i.id == STORE_ATUALIZADOR
                                   
                });
                //se o container estiver cheio ele faz upgrade
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('🚚');
                    }
                }else{
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                        creep.say('⚙️');
                    }
                }
            }else{
                roleBatedorLink.run(creep,FONTE_ATUALIZADORES);
            }
           
            
            
        }
    }
};

module.exports = runAjudantesAtualizadores;