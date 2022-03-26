var util = require('util');
var roleBatedorLink = {
    
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
        
       if(creep.store.getFreeCapacity() == 0){
          creep.memory.descarregar = true;
       }else
       if(creep.store.getFreeCapacity() == creep.store.getCapacity()){
           creep.memory.descarregar = false;
       }
       
        
	    if(creep.store.getFreeCapacity() > 0 && creep.memory.descarregar == false) {
	        
	        var sources = creep.room.find(FIND_SOURCES);
            if( (engPersonalizada && creep.harvest(energia) == ERR_NOT_IN_RANGE )  || (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && engPersonalizada==false) ) {    
                if(engPersonalizada){
                    creep.moveTo(energia, {visualizePathStyle: {stroke: '#74fb00'}});
                }else{
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#74fb00'}});
                }
                
                creep.say('🔄😎');
            }

        }
        else {
        
            var linkArmazem = Game.getObjectById(LINK_ARMAZEM);

            if(creep.transfer(linkArmazem, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(linkArmazem, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.say('L');
            }
        }
	}
};

module.exports = roleBatedorLink;