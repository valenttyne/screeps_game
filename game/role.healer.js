var roleNotificacoes = require('ui.notificacoes');

var nHealer = 0;

var roleHealer = {

    /** @param {Creep} creep **/
    curar: function(hostiles) {


        if(nHealer < hostiles.length){
            nHealer = hostiles.length;            
        }
        
        var curador = [ 
                     [MOVE,MOVE,HEAL] //350e
                    ,[MOVE,MOVE,MOVE,MOVE,HEAL] //450e
                    ,[MOVE,MOVE,HEAL,HEAL] //600e
                    ,[MOVE,MOVE,MOVE,MOVE,HEAL,HEAL] //700e
                  ];
        
        var tipoCurador=0;
        
        if(ENERGIA_ATUAL <= 350 ){
            tipoCurador=0;
        }else if(ENERGIA_ATUAL <= 450){
            tipoCurador=1; 
        }else if(ENERGIA_ATUAL <= 600){
            tipoCurador=2;
        }else if(ENERGIA_ATUAL <= 700){
            tipoCurador=3;
        }
        
       
        var healer = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
        
        var tx01 = '👼 DEF: ' + healer.length+ '/' +nHealer;//+' - Atual: '+curador[tipoCurador];
        roleNotificacoes.topo(tx01,-0+(NOTIFICACOES_X), -3+(NOTIFICACOES_Y));
        
        if(ENERGIA_ATUAL >=350){
            if(healer.length < nHealer ) {
                //if(ENERGIA_ATUAL >=650){
                    var newName = 'Healer' + Game.time;
                    roleNotificacoes.topo('Spawning new Healer: ' + newName,-0+(NOTIFICACOES_X),-5+(NOTIFICACOES_Y));
                    Game.spawns[NOME_SPAW].spawnCreep(curador[tipoCurador], newName,{memory: {role: 'healer'}}); 
                //}
            }
        }
        
	    
	}
};

module.exports = roleHealer;