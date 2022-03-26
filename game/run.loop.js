var util = require('util');

var runMineradorExternos = require('run.mineradoresExternos');
var runClaim = require('run.claim');
var runDefensores = require('run.defensores');
var runDefensoresEx = require('run.defensoresEx');
var runHealer = require('run.healer');
var runWhiteTiger = require('run.whitetiger');
var runConstrutorExterno = require('run.construtorExterno');

var runMinerador = require('run.minerador');
var roleAtualizadores = require('role.atualizadores');
var roleConstrutor = require('role.construtor');
var roleBatedorDrop = require('role.batedorDrop');
var roleMuralhas = require('role.muralhas');
var roleBatedorEnergia = require('role.batedorEnergia');

var runAjudantesAtualizadores = require('run.ajudantesAtualizadores');

var runLoop = {

    /** @param {Creep} creep **/
    loop: function(hostiles,hostilesPower) {
        
        //var hostiles = Game.rooms[nomeRoom].find(FIND_HOSTILE_CREEPS);
        //var hostilesPower = Game.rooms[nomeRoom].find(FIND_HOSTILE_POWER_CREEPS);
        
        if(hostiles.length>0){
            GUERRA = true;
        }else{
            GUERRA = false;
        }

        NUMERO_MINERADORES_ATIVOS=0;

        for(var name in Game.creeps) {
        
            var creep = Game.creeps[name];
            
            if(creep.memory.role == 'MineradorExternoEsquerdo' || creep.memory.role == 'MineradorExternoDireito' ) {
               runMineradorExternos.run(creep); 
            }else
            if(creep.memory.role == 'claim' || creep.memory.role == 'claimWT' || creep.memory.role == 'claimE' || creep.memory.role == 'claimEWT'){
                runClaim.run(creep);
            }else
            if(creep.memory.role == 'rangeC' || creep.memory.role == 'wtDefR' || creep.memory.role == 'meleeC' || creep.memory.role == 'wtDefM'){
                if(GUERRA ==false && INVASOR_CORE){
                    creep.memory.role = creep.memory.role+'EX';
                }else{
                    runDefensores.run(creep,hostiles,hostilesPower);
                }
                
            }else
            if(creep.memory.role == 'rangeCEX' || creep.memory.role == 'wtDefREX' || creep.memory.role == 'meleeCEX' || creep.memory.role == 'wtDefMEX'){
               runDefensoresEx.run(creep); 
            }else
            if(creep.memory.role == 'healer') {
                runHealer.run(creep);
            }else
            if(creep.ticksToLive < 100 && creep.room.name != NOME_SALA){

               runWhiteTiger.run(creep);

            }else 
            if(creep.ticksToLive <= 40){
                
                runWhiteTiger.run(creep);
                
            }else
            if(GUERRA && ENERGIA_ATUAL <= ENERGIA_MAXIMA){
                
                if(creep.memory.role == 'construtor') {
                    runMinerador.run(creep,FONTE_ATUALIZADORES,false);
                }else if(creep.memory.role == 'batedorDrop'){
                    roleBatedorDrop.run(creep,FONTE_MINERADORES);
                }else if(creep.memory.role == 'muralhas'){
                    roleMuralhas.run(creep,FONTE_ATUALIZADORES);
                }else if(creep.memory.role == 'batedorEnergia'){
                    roleBatedorEnergia.run(creep,FONTE_MINERADORES);
                }else if(creep.memory.role == 'ajudanteAtualizador'){
                    runAjudantesAtualizadores.run(creep,FONTE_ATUALIZADORES);
                }else{ 
                    runMinerador.run(creep,FONTE_MINERADORES,true);
                }
            }else
            if(ENERGIA_ATUAL >= ENERGIA_MAXIMA){
                 
                if(creep.memory.role == 'construtor') {
                   runConstrutorExterno.run(creep,FONTE_CONSTRUTORES);
                }else if(creep.memory.role == 'batedorDrop') {
                   roleBatedorDrop.run(creep,FONTE_MINERADORES);
                }else if(creep.memory.role == 'muralhas') {
                   roleMuralhas.run(creep,FONTE_MINERADORES);
                }else if(creep.memory.role == 'batedorEnergia'){
                    runMinerador.run(creep,FONTE_MINERADORES,GUERRA);
                }else if(creep.memory.role == 'ajudanteAtualizador'){
                    runAjudantesAtualizadores.run(creep,FONTE_ATUALIZADORES);
                }else{
                    if(creep.memory.sala == 'E44N43'){
                        roleAtualizadores.run(creep,'5bbcaf909099fc012e63ac7f');
                    }else{
                        roleAtualizadores.run(creep,FONTE_ATUALIZADORES);
                    }
                }
                
            }else{
                if(creep.memory.role == 'minerador') {
                    if(creep.memory.sala == 'E44N43'){
                        runMinerador.run(creep,'5bbcaf909099fc012e63ac7e',APENAS_DEPOSITA);
                    }else{
                        NUMERO_MINERADORES_ATIVOS++;
                        runMinerador.run(creep,FONTE_MINERADORES,APENAS_DEPOSITA);
                    }
                }else
                if(creep.memory.role == 'atualizador') {                    
                    if(creep.memory.sala == 'E44N43'){
                        roleAtualizadores.run(creep,'5bbcaf909099fc012e63ac7f');
                    }else{
                        roleAtualizadores.run(creep,FONTE_ATUALIZADORES);
                    }
                }else 
                if(creep.memory.role == 'construtor') {
                    runConstrutorExterno.run(creep,FONTE_CONSTRUTORES);
                }else
                if(creep.memory.role == 'batedorDrop') {
                    roleBatedorDrop.run(creep,FONTE_MINERADORES);
                }else
                if(creep.memory.role == 'muralhas') {
                    roleMuralhas.run(creep,FONTE_ATUALIZADORES);
                }else if(creep.memory.role == 'batedorEnergia'){
                    roleBatedorEnergia.run(creep,FONTE_MINERADORES);
                    NUMERO_MINERADORES_ATIVOS++;
                }else if(creep.memory.role == 'ajudanteAtualizador'){
                    runAjudantesAtualizadores.run(creep,FONTE_ATUALIZADORES);
                }else{
                   //runMinerador.run(creep,FONTE_ATUALIZADORES,APENAS_DEPOSITA);
                }
            }
            
            
        }

        //atualizando variaveis de contole
        TRAB_MINIMO_IDEAL = util.pert(MENOR_TRABALHOR_POSSIVEL,util.calcularMedia([MENOR_TRABALHOR_POSSIVEL,MAIOR_TRABALHOR_POSSIVEL]),MAIOR_TRABALHOR_POSSIVEL);
        ENERGIA_MINIMA_OPERARIO = NUMERO_MINERADORES_ATIVOS == 0?MENOR_TRABALHOR_POSSIVEL:TRAB_MINIMO_IDEAL;
        RESERVA_ENERGIA_CREEP = ENERGIA_MINIMA_OPERARIO*PERC_AJUSTE; 
        
        
    }
};

module.exports = runLoop;