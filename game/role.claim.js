var roleNotificacoes = require('ui.notificacoes');

var roleClaim = {

    /** @param {Creep} creep **/
    claim: function() {
        
       
        var estruturaClaim = [ 
                                 [MOVE,MOVE,CLAIM,MOVE,MOVE] //800e
                                ,[MOVE,MOVE,CLAIM,CLAIM] //1300e
                              ];
                    
        var tipoClaim = ENERGIA_ATUAL >=1300?1:0;

        var clam = _.filter(Game.creeps, (creep) => creep.memory.role == 'claim');
        var clamE = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimE');
        
        var tx01 = '🔓 CLAIM: ' + clam.length+ '/' +NUMERO_CLAIM_DIREITA + ' | 🔓 CLAIM E: ' + clamE.length+ '/' +NUMERO_CLAIM_ESQUERDA;
        roleNotificacoes.topo(tx01,-0+(NOTIFICACOES_X), -0+(NOTIFICACOES_Y));
        
        if(ENERGIA_ATUAL >=800){
            if(clam.length < NUMERO_CLAIM_DIREITA ) {
                if(ENERGIA_ATUAL >=800){
                    var newName = 'Claim' + Game.time;
                    roleNotificacoes.topo('Spawning new Claim: ' + newName,-0+(NOTIFICACOES_X),-10+(NOTIFICACOES_Y));
                    Game.spawns[NOME_SPAW].spawnCreep(estruturaClaim[tipoClaim], newName,{memory: {role: 'claim'}}); 
                }
            }else if(clamE.length < NUMERO_CLAIM_ESQUERDA ) {
                if(ENERGIA_ATUAL >=800){
                    var newName = 'Claim' + Game.time;
                    roleNotificacoes.topo('Spawning new Claim: ' + newName,-0+(NOTIFICACOES_X),-10+(NOTIFICACOES_Y));
                    Game.spawns[NOME_SPAW].spawnCreep(estruturaClaim[tipoClaim], newName,{memory: {role: 'claimE'}}); 
                }
            }
        }
        
        
	    
	}
};

module.exports = roleClaim;