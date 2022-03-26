var roleAtualizadores = {
    
    /** @param {Creep} creep **/
    run: function(creep,idEnergia='') {
        
        var engPersonalizada = false;
        
        if(idEnergia != ''){
            engPersonalizada=true;
        }
        
        var energia = Game.getObjectById(idEnergia);
        
        if(creep.memory.sala != 'E44N43'){
            if(creep.room.name != NOME_SALA){
                creep.say('⛔');
                creep.moveTo(energia, {visualizePathStyle: {stroke: '#74fb00'}});
                return;
            }
        }
        //--- controle para ficar Full 50 antes de ir para o up
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            //creep.say('🔄 Cons');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        //creep.say('🚧 Construir');
	    }
        
	    if(!creep.memory.upgrading) {

            //pega primeiro no link
            const linksWithEnergy = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_LINK 
                                &&  i.store[RESOURCE_ENERGY] >= creep.store.getFreeCapacity() 
                                &&  i.id == LINK_RECEPTOR
                               
            });

            //pega segundo no container
            const containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER 
                                &&  i.store[RESOURCE_ENERGY] >= creep.store.getFreeCapacity() 
                                &&  i.id == STORE_ATUALIZADOR
                               
            });


            if(linksWithEnergy.length>0){
                
                if(creep.withdraw(linksWithEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(linksWithEnergy[0]);
                 }
                 
            }else
            if(containersWithEnergy.length>0){
                
                if(creep.withdraw(containersWithEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containersWithEnergy[0]);
                 }
                 
             }else{
                
                var sources = creep.room.find(FIND_SOURCES);

                if( (engPersonalizada && creep.harvest(energia) == ERR_NOT_IN_RANGE )  || (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && engPersonalizada==false) ) { 
                    if(engPersonalizada){
                        creep.moveTo(energia, {visualizePathStyle: {stroke: '#74fb00'}});
                    }else{
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#74fb00'}});
                    }
                    creep.say('⚙️🔄');
                }
            }

        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                
                
                if(creep.pos.x <= 7){
                    creep.memory.travaPos = true;
                    creep.say('merda');
                }
                if(creep.memory.travaPos && ((creep.pos.x >= 28 && creep.pos.y <= 25) || (creep.pos.x >= 35)) ){
                    creep.memory.travaPos = false;
                }
                
                if(creep.memory.travaPos){
                    creep.moveTo(29,14);
                    creep.say('-.-'); 
                }else{
                    creep.moveTo(creep.room.controller);
                    creep.say('⚙️');
                }
            }
        }
	}
};

module.exports = roleAtualizadores;