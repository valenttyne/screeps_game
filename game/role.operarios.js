var roleNotificacoes = require('ui.notificacoes');
var configOperarios = require('config.operarios');

/** @param {Creep} creep **/
var roleOperarios = {

    /** @param {Creep} creep **/
    colocaParaTrabalhar: function() {
        
        var hostiles = Game.rooms[NOME_SALA].find(FIND_HOSTILE_CREEPS);
        
        if(hostiles.length>0){
            GUERRA = true;
        }else{
            GUERRA = false;
        }
        
        var en = ENERGIA_ATUAL;
        var enMax = ENERGIA_MAXIMA;

        var minerador = _.filter(Game.creeps, (creep) => creep.memory.role == 'minerador'  && creep.memory.sala != SALA_CLAIM_DIREITA);
        var atualizador = _.filter(Game.creeps, (creep) => creep.memory.role == 'atualizador' && creep.memory.sala != SALA_CLAIM_DIREITA);
        var construtor = _.filter(Game.creeps, (creep) => creep.memory.role == 'construtor' && creep.memory.sala != SALA_CLAIM_DIREITA);
        var muralhas = _.filter(Game.creeps, (creep) => creep.memory.role == 'muralhas' && creep.memory.sala != SALA_CLAIM_DIREITA);
        var batedorDrop = _.filter(Game.creeps, (creep) => creep.memory.role == 'batedorDrop' && creep.memory.sala != SALA_CLAIM_DIREITA);
        var batedorEnergia = _.filter(Game.creeps, (creep) => creep.memory.role == 'batedorEnergia' && creep.memory.sala != SALA_CLAIM_DIREITA);
        var ajudanteAtualizador = _.filter(Game.creeps, (creep) => creep.memory.role == 'ajudanteAtualizador' && creep.memory.sala != SALA_CLAIM_DIREITA);
        
                          
        //tipo do operario
        var tipoOperador='';
        if(minerador.length < NUMERO_MINEIROS){
            tipoOperador='minerador';
        }else if(atualizador.length < NUMERO_ATUALIZADORES){
            tipoOperador='atualizador';
        }else if(construtor.length < NUMERO_CONSTRUTORES){
            tipoOperador='construtor';
        }else if(batedorEnergia.length < NUMERO_BATEDORES_ENERGIA ){
            tipoOperador='batedorEnergia';
        }else if(batedorDrop.length < NUMERO_BATEDORES_DROP){
            tipoOperador='batedorDrop';
        }else if(muralhas.length < NUMERO_MURALHA ){
            tipoOperador='muralhas';
        }else if(ajudanteAtualizador.length < NUMERO_AJUDANTE_ATUALIZADOR ){
            tipoOperador='ajudanteAtualizador';
        }
        
        var novoOperario = false;
        
        if(en >= ENERGIA_MINIMA_OPERARIO){
            //nivel do operarios a ser feito
            var operario = configOperarios.retornaOperario();
            novoOperario = true;
        }
        
        
        //verifica se tem que spawing alguem e o faz       
        if(tipoOperador != '' && novoOperario){
            var newName = tipoOperador + Game.time;
            Game.spawns[NOME_SPAW].spawnCreep(operario, newName,{memory: {role: tipoOperador,sala:NOME_SPAW}});    
        }         
        
        //---spaw 2
        if(NOME_SPAW2 != ''){
            var minerador2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'minerador'  && creep.memory.sala == SALA_CLAIM_DIREITA);
            var atualizador2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'atualizador' && creep.memory.sala == SALA_CLAIM_DIREITA);
            var construtor2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'construtor' && creep.memory.sala == SALA_CLAIM_DIREITA);
            
            //tipo do operario
            var tipoOperador='';
            if(minerador2.length < NUMERO_MINEIROS){
                tipoOperador='minerador';
            }else if(atualizador2.length < NUMERO_ATUALIZADORES){
                tipoOperador='atualizador';
            }else if(construtor2.length < NUMERO_CONSTRUTORES){
                tipoOperador='construtor';        }
            
            novoOperario = false;
            
            if(en >= 200){
                //nivel do operarios a ser feito
                var operario = configOperarios.retornaOperario();
                novoOperario = true;
            }
            
            
            //verifica se tem que spawing alguem e o faz  
            if(tipoOperador != '' && novoOperario){
                var newName = tipoOperador + Game.time+SALA_CLAIM_DIREITA;
                console.log(tipoOperador);
                Game.spawns[NOME_SPAW2].spawnCreep(operario, newName,{memory: {role: tipoOperador,sala:SALA_CLAIM_DIREITA}});    
            } 
        }
        //------------------------

        
        //inicio notificações na tela para controle
        if(GUERRA){
            roleNotificacoes.topo("💣Guerra - ☠️: "+hostiles.length,-0+(NOTIFICACOES_X),-12+(NOTIFICACOES_Y));
        }
        
        var tx01 = 'TRAB ⚒️: ' + minerador.length +'/'+NUMERO_MINEIROS;
            tx01 += ' | UP ⚙️: ' +atualizador.length +'/'+NUMERO_ATUALIZADORES;
            tx01 += ' | CONST 👷: '+construtor.length+'/'+ NUMERO_CONSTRUTORES;
            tx01 += ' | BAT EN 😎: '+batedorEnergia.length+'/'+ NUMERO_BATEDORES_ENERGIA;
            tx01 += ' | BAT D 🐇: '+batedorDrop.length+'/'+NUMERO_BATEDORES_DROP;
            tx01 += ' | RAMP 🧱: '+muralhas.length+'/'+ NUMERO_MURALHA;
            
        roleNotificacoes.topo(tx01,-0+(NOTIFICACOES_X),-4+(NOTIFICACOES_Y),NOME_SPAW);
        
        //status da operação dos mineradores
        var msnStatusDeposito = APENAS_DEPOSITA?'Sim':'Não';
        roleNotificacoes.topo('Apenas Depositar 🚒: '+msnStatusDeposito ,-0+(NOTIFICACOES_X),-7+(NOTIFICACOES_Y));
        
        if(Game.spawns[NOME_SPAW].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns[NOME_SPAW].spawning.name];
            roleNotificacoes.topo('🛠️'+'Novo Trabalhador: ' + spawningCreep.memory.role,10+(NOTIFICACOES_X),-10+(NOTIFICACOES_Y));
        }
        //fim notificações
    }
};

module.exports = roleOperarios;