var roleMuralhas = {

    /** @param {Creep} creep **/
    run: function(creep,idEnergia='') {
        
        var engPersonalizada = false;
        
        if(idEnergia != ''){
            engPersonalizada=true;
        }
        
        var energia = Game.getObjectById(idEnergia);

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        
	        //configurando quem reparar / fortificar
	        /*
	        const targetsReparo = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax,
            });
            */
            const targetsReparoRampart = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART ) && structure.hits < structure.hitsMax;
                    }
                  });
            
            targetsReparoRampart.sort((a,b) => a.hits - b.hits);
            // fim da configuracao de reparo
            
            //repara prioritariamente
            if(targetsReparoRampart.length > 0) {
                if(creep.repair(targetsReparoRampart[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetsReparoRampart[0]);
                }
                creep.say('🧱');
            }

	    }
	    else {
            
            //pega primeiro no container
	        const containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                               i.store[RESOURCE_ENERGY] > 0
            });
    
            if(containersWithEnergy.length>0){
                    
                    if(creep.withdraw(containersWithEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containersWithEnergy[0]);
                    }
                
            }else{
                
    	        var sources = creep.room.find(FIND_SOURCES);
	        
                if( (engPersonalizada && creep.harvest(energia) == ERR_NOT_IN_RANGE )  || (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && engPersonalizada==false) ) {
                    //console.log('builder info fonte: '+creep.harvest(sources[0]));
                    if(engPersonalizada){
                        creep.moveTo(energia, {visualizePathStyle: {stroke: '#74fb00'}});
                    }else{
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#74fb00'}});
                    }
                   
                }
            }
            
             creep.say('🔄 🧱');
    
            
	    }
	}
};

module.exports = roleMuralhas;