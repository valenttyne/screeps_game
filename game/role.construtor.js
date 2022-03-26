/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.construtor');
 * mod.thing == 'a thing'; // true
 */

var roleConstrutor = {

    /** @param {Creep} creep **/
    run: function(creep,idEnergia='') {
        
        var engPersonalizada = false;
        
        if(idEnergia != ''){
            engPersonalizada=true;
        }
        
        var energia = Game.getObjectById(idEnergia);

        if(creep.room.name != NOME_SALA){
            creep.say('⛔');
            creep.moveTo(energia, {visualizePathStyle: {stroke: '#74fb00'}});
            return;
        }


	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            //creep.say('🔄 Cons');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        //creep.say('🚧 Construir');
	    }

	    if(creep.memory.building) {
	        
	        //configurando quem reparar / fortificar
	        /*const targetsReparo = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });*/
            
            const targetsReparo = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.hits < structure.hitsMax;
                }
              });
            
            targetsReparo.sort((a,b) => a.hits - b.hits);
            // fim da configuracao de reparo
            

            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('🏗️');
                }
            }else 
            if(targetsReparo.length > 0) {
                if(creep.repair(targetsReparo[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetsReparo[0]);
                    //console.log(targetsReparo[0]);
                }
                creep.say('🚧❤️️');
            }
            else{
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                    creep.say('👷⚙️');
                }
            }
            

	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
	        
            if( (engPersonalizada && creep.harvest(energia) == ERR_NOT_IN_RANGE )  || (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && engPersonalizada==false) ) {
                
                if(engPersonalizada){
                    creep.moveTo(energia, {visualizePathStyle: {stroke: '#74fb00'}});
                }else{
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#74fb00'}});
                }
                creep.say('🔄 👷');;
            }else{
                creep.say('?');
            }
	    }
	}
};

module.exports = roleConstrutor;