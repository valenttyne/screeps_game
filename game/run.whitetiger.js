var util = require('util');
var runWhiteTiger = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.role == 'MineradorExternoEsquerdo' || creep.memory.role == 'MineradorExternoDireito'){
            //salaColetaDireita
            if ( creep.room.name == creep.memory.salacoleta ){
                creep.say('🐯⛪');
                creep.moveTo(new RoomPosition(30, 42, NOME_SALA));
            }else{
                //muda o tipo de creep para coletor para ele pegar a outra rotina do trigre branco e depositar o que tiver
                if(creep.memory.role == 'MineradorExternoEsquerdo' || creep.memory.role == 'MineradorExternoDireito' ){
                    creep.memory.role = 'minerador'; 
                }
            }
        }else if(creep.memory.role == 'rangeC' || creep.memory.role == 'wtDefR' || creep.memory.role == 'meleeC' || creep.memory.role == 'wtDefM'){
            //salaColetaDireita
            if ( (creep.memory.role == 'meleeC')  ){
                creep.say('🐯🔫');
                creep.memory.role = 'wtDefM';
            }else if ( (creep.memory.role == 'rangeC') ){
                creep.say('🐯⚔️');
                creep.memory.role = 'wtDefR';
            }
        }else if(creep.memory.role == 'claim' || creep.memory.role == 'claimE' || creep.memory.role == 'claimWT' || creep.memory.role == 'claimEWT' ){ 
            
            // console.log(creep.memory.role);
            creep.say('🐯');
            
            //salaColetaDireita
            if (creep.memory.role == 'claim' ){
                creep.memory.role = 'claimWT';
            }else if(creep.memory.role == 'claimE'){
                creep.memory.role = 'claimEWT';
            }

        }else {
        
            creep.memory.role = 'whiteTiger';
                    
            if(creep.store.getFreeCapacity() < creep.store.getCapacity() ){
            
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN 
                                || structure.structureType == STRUCTURE_TOWER
                                ) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
    
                if(targets.length > 0) {
                    //analisa qual o melhor lugar de deposito
                    var localDeposito = util.retornaElementoMaisProximo(targets,creep);

                    if(creep.transfer(localDeposito, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(localDeposito, {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('🐯🚚'); 
                    }
                }
                
            }else{
                creep.say('🐯⛪');
                creep.suicide();
                //creep.moveTo(30,42);
            }
        }
	}
};

module.exports = runWhiteTiger;