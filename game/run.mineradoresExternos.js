var runWhiteTiger = require('run.whitetiger');
var util = require('util');
var runMineradorExternos = {

    /** @param {Creep} creep **/
    run: function(creep) {


            if(INVASOR_SALA_COLETA_E){
                creep.memory.role='minerador';
            }
            if(INVASOR_SALA_COLETA_D){
                creep.memory.role='minerador';
            }
            
            if(creep.ticksToLive < 60){
                
                runWhiteTiger.run(creep);
                
            }else{
            
               if(creep.store.getFreeCapacity() == 0){
                  creep.memory.descarregar = true;
               }else
               if(creep.store.getFreeCapacity() == creep.store.getCapacity()){
                   creep.memory.descarregar = false;
               }
               
               
               if(creep.store.getFreeCapacity() <= creep.store.getCapacity() && creep.memory.descarregar == false) {
                   
                   if(creep.room.name != creep.memory.salacoleta){
                       
                        creep.say('⛔');  
                        creep.moveTo(new RoomPosition(creep.memory.posx, creep.memory.posy, creep.memory.salacoleta));
                        
                    }else if(creep.room.name == creep.memory.salacoleta ){
                        
                        const invasor = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                        
                        if(invasor){
                            if(creep.room.name == SALA_COLETA_ESQUERDA){
                                INVASOR_SALA_COLETA_E=true;
                            }else{
                                INVASOR_SALA_COLETA_D=true;
                            }
                        }

                        
                        if(GUERRA == false){
                            
                            const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: { owner: { username: 'Invader' } }
                            });
                            
                            if(target){
                                creep.memory.role = 'minerador';
                                INVASOR_CORE = true;
                                INVASOR_SALA = creep.memory.salacoleta;
                                
                                if(creep.room.name == SALA_COLETA_ESQUERDA){
                                    INVASOR_SALA_COLETA_E=true;
                                }else{
                                    INVASOR_SALA_COLETA_D=true;
                                }
                            }

                        }else{
                            INVASOR_CORE = false;
                        }
                       
                        creep.say('?');
                        
                        const targetDrop = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                        
                        if(targetDrop) {
                            if(creep.pickup(targetDrop) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targetDrop, {visualizePathStyle: {stroke: '#74fb00'}});
                                creep.say('🐇 📦');
                            }
                        }else{
                           var sources = creep.room.find(FIND_SOURCES);
                           var sourcePerto = util.retornaElementoMaisProximo(sources,creep);
                            if( creep.harvest(sourcePerto) == ERR_NOT_IN_RANGE  ) {    
                                creep.moveTo(sourcePerto, {visualizePathStyle: {stroke: '#74fb00'}});
                                creep.say('✔️');
                            }else{
                                if(creep.harvest(sources[0]) == -1){
                                    creep.say('⛔');  
                                    creep.memory.role = "minerador";
                                }
                                creep.say('👍');
                            } 
                        }
                        
                        
                    }
               }else{
                   
                   
                   if(creep.room.name != NOME_SALA){
                        creep.say('cheio ⛔'  );
                        creep.moveTo(Game.getObjectById(FONTE_MINERADORES), {visualizePathStyle: {stroke: '#ffffff'}});
                        //creep.moveTo(new RoomPosition(creep.memory.posx, creep.memory.posy, NOME_SALA), {visualizePathStyle: {stroke: '#ffffff'}});
                        return;
                    }else{
                        creep.say('✔️');
                        
                        //só coloca na torre se tudo esta no maximo
                        if(ENERGIA_ATUAL >= ENERGIA_MAXIMA){

                            var targets = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {  return ( structure.structureType == STRUCTURE_TOWER ) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 200;  } });
                            //se a torres estiverem cheia vai nos containers
                            if(targets.length == 0) {
                                var targets = creep.room.find(FIND_STRUCTURES, {  filter: (i) => i.structureType == STRUCTURE_CONTAINER });
                            }

                        }else{
                            var targets = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.structureType == STRUCTURE_EXTENSION ||  structure.structureType == STRUCTURE_SPAWN ) 
                                            && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                                }
                            });
                        }

                        if(targets.length > 0) {
                            //analisa qual o melhor lugar de deposito
                            var localDeposito = util.retornaElementoMaisProximo(targets,creep);

                            if(creep.transfer(localDeposito, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(localDeposito, {visualizePathStyle: {stroke: '#ffffff'}});
                                creep.say('🚚✔️' );
                            }
                        }
                        
                    }
               }

               
                
            }
            
        
        
    }
};

module.exports = runMineradorExternos;