var runWhiteTiger = require('run.whitetiger');

var runClaim = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.ticksToLive < 120){
           
           runWhiteTiger.run(creep);
            
        }
            
        if(creep.memory.role == 'claim' || creep.memory.role == 'claimWT') {
            
            var ctc = Game.getObjectById('5bbcaf909099fc012e63ac7d');
           
            if(creep.room.name != SALA_CLAIM_DIREITA){
                
                creep.say('🔓⛔');
                creep.moveTo(new RoomPosition(23, 22, SALA_CLAIM_DIREITA));
                
            }else if(creep.room.name == SALA_CLAIM_DIREITA ){ // && creep.pos.x != 39 && creep.pos.y != 34
            
                creep.say('🔓✔️');
                //creep.moveTo(new RoomPosition(39, 34, SALA_CLAIM_DIREITA));
                //creep.moveTo(ctc);
                //console.log(creep.claimController(ctc));
                
                //console.log(this.room.getRoomSetting('RESERVER_COUNT'));

                if(creep.room.controller && !creep.room.controller.my ) {
                    if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }

            }else
            if(creep.room.controller && !creep.room.controller.my) {
                //creep.say('🔓✔️ Chegou');
                if(creep.claimController(ctc) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(creep.room.controller);//
                    creep.moveTo(ctc);
                    creep.say('🔓✔️ A');
                }else{
                    creep.say('🔓✔️ B');
                    creep.moveTo(ctc);
                }
            }
           
            
        }else if(creep.memory.role == 'claimE' || creep.memory.role == 'claimEWT'){
            
            var ctc = Game.getObjectById('5bbcaf6b9099fc012e63a94e');
           
            if(creep.room.name != SALA_CLAIM_ESQUERDA){
                
                creep.say('🔓⛔');
                creep.moveTo(new RoomPosition(41, 32, SALA_CLAIM_ESQUERDA));
                
            }else if(creep.room.name == SALA_CLAIM_ESQUERDA ){ // && creep.pos.x != 39 && creep.pos.y != 34
            
                creep.say('🔓✔️');
                //creep.moveTo(new RoomPosition(39, 34, SALA_CLAIM_DIREITA));
                //creep.moveTo(ctc);
                //console.log(creep.claimController(ctc));
                
                if(creep.room.controller && !creep.room.controller.my ) {
                    if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }

            }else
            if(creep.room.controller && !creep.room.controller.my) {
                //creep.say('🔓✔️ Chegou');
                if(creep.claimController(ctc) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(creep.room.controller);//
                    creep.moveTo(ctc);
                    creep.say('🔓✔️ A');
                }else{
                    creep.say('🔓✔️ B');
                    creep.moveTo(ctc);
                }
            }
        }
            
        
	    
	}
};

module.exports = runClaim;