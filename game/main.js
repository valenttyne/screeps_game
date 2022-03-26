require('constantes');

var roleOperarios = require('role.operarios');
var roleDefensores = require('role.defensores');
var roleTorres = require('role.torres');
var roleHealer = require('role.healer');
var roleNotificacoes = require('ui.notificacoes');
var util = require('util');
var roleClaim = require('role.claim');
var roleMineradorExternos = require('role.mineradorExternos');
var runLoop = require('run.loop');
var exploracao = require('exploracao');

module.exports.loop = function () {
    

    //console.log(getCidades());

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
    
    //criando e controlando os operarios
    ENERGIA_ATUAL = Game.rooms[NOME_SALA].energyAvailable;
    ENERGIA_MAXIMA = Game.rooms[NOME_SALA].energyCapacityAvailable;
    
    //console.log(ENERGIA_MAXIMA);
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
    var percIdeal100 = percIdeal *100;
    var tx01 = '🔋: ' + ENERGIA_ATUAL+ '/' +ENERGIA_MAXIMA+' - 🔌'+percPower+'% - ⭐Ideal: '+percIdeal100+'%';
    roleNotificacoes.topo(tx01,-0+(NOTIFICACOES_X), -6+(NOTIFICACOES_Y));
    
    /*
    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }*/
    
    
    //padrao room principal
    roleOperarios.colocaParaTrabalhar();
    
    //torres
    var towers = Game.rooms[NOME_SALA].find( FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    if(towers.length > 0){
        roleTorres.emGuarda(towers,hostiles);
    }       
    
    //war Claim
    roleClaim.claim();

    //Mineradores
    roleMineradorExternos.coletar();
    
    //Defensores
    roleDefensores.defesa(hostiles,hostilesPower);
    
    //Healer
    roleHealer.curar(hostiles);
    
    //LOOP geral dos creeps
    runLoop.loop(hostiles,hostilesPower);

    //console.log(getCidades());

    //TODO
    var linkFrom = Game.getObjectById(LINK_ARMAZEM);
    var linkTo = Game.getObjectById(LINK_RECEPTOR);
    linkFrom.transferEnergy(linkTo);
   
}
