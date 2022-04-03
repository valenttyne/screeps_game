require('constantes');

var util = require('util');
var exploracao = require('exploracao');

var controleOperarios = require('role.operarios');
var controleDefensores = require('role.defensores');
var controleTorres = require('role.torres');
var controleHealer = require('role.healer');
var controleNotificacoes = require('ui.notificacoes');
var controleClaim = require('role.claim');
var controleOperarioExternos = require('role.mineradorExternos');
var controleMovimentoGeral = require('run.loop');


module.exports.loop = function () {
    

    var hostiles = Game.rooms[NOME_SALA].find(FIND_HOSTILE_CREEPS);
    var hostilesPower = Game.rooms[NOME_SALA].find(FIND_HOSTILE_POWER_CREEPS);

    //Game.spawns['Forever'].room.controller.activateSafeMode();
    //console.log(Game.creeps[0].room.name);
    /*
    for(var name in Game.creeps) {
        NOME_SALA = Game.creeps[name].room.name;
        break;
    }*/
    
    //limpando a memoria dos creeps mortos
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Limpando creep morto da memoria:', name);
        }
    }

    /* todos eventos hostis em minhas estrutura e creeps
    _.forEach(Game.rooms, room => {
        let eventLog = room.getEventLog();
        let attackEvents = _.filter(eventLog, {event: EVENT_ATTACK});
        attackEvents.forEach(event => {
            let target = Game.getObjectById(event.data.targetId);
            if(target && target.my) {
                console.log(event);
            }
        });
    });
    */
    
    //configurando a prioridade dos operarios
    ENERGIA_ATUAL = Game.rooms[NOME_SALA].energyAvailable;
    ENERGIA_MAXIMA = Game.rooms[NOME_SALA].energyCapacityAvailable;
    
    
    var percPower = util.arredondar((ENERGIA_ATUAL / ENERGIA_MAXIMA)*100,2);    
    var energiaArray = [RESERVA_ENERGIA_CREEP,ENERGIA_MAXIMA];
    var media = util.calcularMedia(energiaArray);
    var limiteTolerado = util.pert(RESERVA_ENERGIA_CREEP,media,ENERGIA_MAXIMA);
    var percIdeal = util.arredondar(limiteTolerado/ENERGIA_MAXIMA,2);
    
    
    if( ((ENERGIA_ATUAL / ENERGIA_MAXIMA) < percIdeal) ){
        APENAS_DEPOSITA = true;
    }else{
        APENAS_DEPOSITA = false;
    }
    //fim da configuracao de prioridade

    var percIdeal100 = percIdeal *100;
    var tx01 = '🔋: ' + ENERGIA_ATUAL+ '/' +ENERGIA_MAXIMA+' - 🔌'+percPower+'% - ⭐Ideal: '+percIdeal100+'%';
    controleNotificacoes.topo(tx01,-0+(NOTIFICACOES_X), -6+(NOTIFICACOES_Y));
    
    /*
    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }*/
    
    
    //padrao room principal
    controleOperarios.colocaParaTrabalhar();
    
    //torres
    var towers = Game.rooms[NOME_SALA].find( FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    if(towers.length > 0){
        controleTorres.emGuarda(towers,hostiles);
    }       
    
    //war Claim
    if(SALA_CLAIM_DIREITA != '' || SALA_CLAIM_ESQUERDA != ''){
      controleClaim.claim();  
    }    

    //Mineradores
    if(SALA_COLETA_DIREITA != '' || SALA_COLETA_ESQUERDA != ''){
        controleOperarioExternos.coletar();
    }
    
    //Defensores
    controleDefensores.defesa(hostiles,hostilesPower);
    
    //Healer
    controleHealer.curar(hostiles);
    
    //LOOP geral dos creeps
    controleMovimentoGeral.loop(hostiles,hostilesPower);

    if(LINK_ARMAZEM != ''){
        var linkFrom = Game.getObjectById(LINK_ARMAZEM);
        var linkTo = Game.getObjectById(LINK_RECEPTOR);
        linkFrom.transferEnergy(linkTo);
    }
   
}
