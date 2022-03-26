var roleNotificacoes = require('ui.notificacoes');
var configOperarios = require('config.operarios');

var roleMineradorExternos = {

    /** @param {Creep} creep **/
    coletar: function() {
       
        /*
        if(ENERGIA_MAXIMA >= 800){
           NUMERO_MINERADOR_ESQUERDA = 1;
           NUMERO_MINERADOR_DIREITA = 2;
        }*/


        var coletorexE = _.filter(Game.creeps, (creep) => creep.memory.role == 'MineradorExternoEsquerdo');
        var coletorexD = _.filter(Game.creeps, (creep) => creep.memory.role == 'MineradorExternoDireito');
        
        var tx01 = '✔️ Col Ex: E ' + coletorexE.length+ '/' +NUMERO_MINERADOR_ESQUERDA+' | ✔️ Col Ex: D ' + coletorexD.length+ '/' +NUMERO_MINERADOR_DIREITA;
        roleNotificacoes.topo(tx01,-0+(NOTIFICACOES_X), 1+(NOTIFICACOES_Y));
        
        if(ENERGIA_ATUAL >=700){
            if(coletorexE.length < NUMERO_MINERADOR_ESQUERDA && (INVASOR_SALA_COLETA_D==false)) {
                if(ENERGIA_ATUAL >=700){
                    
                    var operario = configOperarios.retornaOperario();
                    var newName = 'ColExE' + Game.time;
                    roleNotificacoes.topo('Spawning new Coletor Ex: ' + newName,-0+(NOTIFICACOES_X),-10+(NOTIFICACOES_Y));
                    Game.spawns[NOME_SPAW].spawnCreep(operario, newName,{memory: {role: 'MineradorExternoEsquerdo',salacoleta:SALA_COLETA_ESQUERDA,posx:'39',poxy:'34',energia:SALA_ENERGIA_ESQUERDA}});    
                    
                }
            }else
            if(coletorexD.length < NUMERO_MINERADOR_DIREITA && (INVASOR_SALA_COLETA_E==false) ) {
                if(ENERGIA_ATUAL >=700){
                    
                    var operario = configOperarios.retornaOperario();
                    var newName = 'ColExD' + Game.time;
                    roleNotificacoes.topo('Spawning new Coletor Ex: ' + newName,-0+(NOTIFICACOES_X),-10+(NOTIFICACOES_Y));
                    Game.spawns[NOME_SPAW].spawnCreep(operario, newName,{memory: {role: 'MineradorExternoDireito',salacoleta:SALA_COLETA_DIREITA,posx:'30',poxy:'42',energia:SALA_ENERGIA_DIREITA}});    
                    
                }
            
            }
        } 
        
    }
};

module.exports = roleMineradorExternos;