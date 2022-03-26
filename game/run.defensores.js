var runWhiteTiger = require('run.whitetiger');
var roleBatedorLink = require('role.batedorLink');

var runDefensores = {

    /** @param {Creep} creep **/
    run: function(creep,hostiles,hostilesPower) {
        
        if(creep.ticksToLive < 60){
            runWhiteTiger.run(creep);
        }else
        if(creep.memory.role == 'rangeC' || creep.memory.role == 'wtDefR') {                    
                
                
                if(creep.room.name != NOME_SALA){
                    creep.say('⛔');
                    //creep.moveTo(FONTE_MINERADORES, {visualizePathStyle: {stroke: '#74fb00'}});
                    creep.moveTo(new RoomPosition(POSICAO_DEFENSOR_X,POSICAO_DEFENSOR_Y,NOME_SALA));
                    
                }else{
                    
                    if(hostiles.length >0){
                    
                        const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
                        
                        if(targets.length > 0) {
                            creep.rangedAttack(targets[1]);
                            creep.say('🔫');
                        }else{
                            const localizacao = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                            creep.moveTo(localizacao);
                            creep.say('🏃️');
                        }
                    }else
                    if(hostilesPower.length >0){
                        
                        const targets = creep.pos.findInRange(FIND_HOSTILE_POWER_CREEPS);
                        
                        if(targets.length > 0) {
                            creep.rangedAttack(targets[0]);
                            creep.say('🔫');
                        }else{
                            const localizacao = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                            creep.moveTo(localizacao);
                            creep.say('🏃️');
                        }
                    }else{
                        if(creep.memory.trabalha){

                            roleBatedorLink.run(creep,FONTE_ATUALIZADORES);

                        }else{
                            creep.moveTo(POSICAO_DEFENSOR_X-1,POSICAO_DEFENSOR_Y-1);
                            creep.say('⚔️');
                        }
                    }                    
                    
                }
               
                
            }else
            if(creep.memory.role == 'meleeC' || creep.memory.role == 'wtDefM') {
                      
                if(creep.room.name != NOME_SALA){
                    creep.say('⛔');
                    creep.moveTo(new RoomPosition(POSICAO_DEFENSOR_X,POSICAO_DEFENSOR_Y,NOME_SALA));
                
                 }else{
                     const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            
                    if(target) {
                        if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                            creep.say('⚔️🏃️');
                        }else{
                            creep.say('⚔️');
                        }
                    }else{
                        
                        if(creep.memory.trabalha){
                            roleBatedorLink.run(creep,FONTE_ATUALIZADORES);
                        }else{
                            creep.moveTo(POSICAO_DEFENSOR_X,POSICAO_DEFENSOR_Y);
                            creep.say('⚔️');
                        }

                    }
                 }
                
            }
        }
};

module.exports = runDefensores;