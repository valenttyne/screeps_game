var runHealer = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        //fazendo o cura sempre ficar atras
        var posicaoHealar = POSICAO_DEFENSOR_X -2;
        var posicaoHealerY = POSICAO_DEFENSOR_Y -2;

        if(creep.room.name != NOME_SALA){
            creep.say('⛔');
            //creep.moveTo(energia, {visualizePathStyle: {stroke: '#74fb00'}});
            creep.moveTo(new RoomPosition(posicaoHealar,posicaoHealerY,NOME_SALA));
            
        }else{
            const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
            });
            
            if(target) {
                if(creep.heal(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    creep.say('👼');
                }else{
                    creep.say('🏃 ️❤️');
                }
            }else{
                creep.moveTo(posicaoHealar,posicaoHealerY);
                //creep.moveTo(new RoomPosition(36, 17, 'E44N43'));
                creep.say('👼');
            }
            
            
        }
        
	}
};

module.exports = runHealer;