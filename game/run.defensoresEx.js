var runDefensoresEx = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        //findClosestByPath
        const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: { owner: { username: 'Invader' } }
        });
        
        if(target){
            
            var alvo = Game.getObjectById(target.id);
        
            if(creep.room.name != SALA_CLAIM_DIREITA){
                creep.moveTo(new RoomPosition(30, 20, SALA_CLAIM_DIREITA));
                creep.say('⛔');
                return;
            }
    
            if(creep.memory.role == 'rangeCEX' || creep.memory.role == 'rangeCEX') {    
                if(creep.rangedAttack(alvo) == ERR_NOT_IN_RANGE){
                   creep.moveTo(alvo);
                    creep.say('⛔');
                } 
            }else if(creep.memory.role == 'meleeCEX' || creep.memory.role == 'wtDefMEX'){
                if(creep.attack(alvo) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(alvo);
                    creep.say('⚔️🏃️');
                }else{
                    creep.say('⚔️');
                    
                }
            }
            
            INVASOR_CORE = true;
            INVASOR_SALA = creep.room.name;
            
        }else{
            INVASOR_CORE = false;
            INVASOR_SALA = '';
        }     

        /*
        if(alvo.length >0){
            
            const targets = creep.pos.findInRange(FIND_HOSTILE_POWER_CREEPS);
            
            if(targets.length > 0) {
                creep.rangedAttack(targets[0]);
                creep.say('🔫');
            }else{
                const localizacao = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                creep.moveTo(localizacao);
                creep.say('🏃️');
            }
        }
        */
        /*
        if(alvo.length >0){
            
            const targets = creep.pos.findClosestByRange(FIND_HOSTILE_POWER_CREEPS);
            
            if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                creep.say('⚔️🏃️');
            }else{
                creep.say('⚔️');
            }
        }else{
            creep.moveTo(new RoomPosition(37, 09, 'E44N43'));
            creep.say('👁️');
        }*/

    }
};

module.exports = runDefensoresEx;