var roleNotificacoes = require('ui.notificacoes');

var roleDefensores = {

    /** @param {Creep} creep **/
    defesa: function(hostiles,hostilesPower) {
        
        
        var en = ENERGIA_ATUAL;
        var enMax = ENERGIA_MAXIMA;
        
        if(NUMERO_ARQUEIROS_DEFENSORES < hostiles.length || NUMERO_GUERREIROS_DEFENSORES < hostiles.length){ // || NUMERO_ARQUEIROS_DEFENSORES < hostilesPower.length
            NUMERO_ARQUEIROS_DEFENSORES = hostiles.length+1;
            NUMERO_GUERREIROS_DEFENSORES = hostiles.length+1;//hostilesPower.length
        }
        
        var ajusteDefensorGuerra = 150;
        var trabalha = true;
        if(GUERRA){

            ajusteDefensorGuerra = 0;
            trabalha=false;
            var defensores = [ 
                         [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK, MOVE] //500e + ranged 0
                        ,[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK, MOVE] //550e + ranged 1
                        ,[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE] //650e ranged 2
                        ,[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE] //800e ranged 3
                        ,[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE] //900e ranged 4
                        ,[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,MOVE] //500e + Meele 5
                        ,[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE] //800e + Meele 6
                      ];
        }else{


           var defensores = [ 
                         [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK, MOVE,CARRY,WORK] //500e + ranged 0 +150 = 650
                        ,[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK, MOVE,CARRY,WORK] //550e + ranged 1 +150 = 700
                        ,[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,CARRY,WORK] //650e ranged 2 +150 = 800
                        ,[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,CARRY,WORK] //800e ranged 3 +150 = 950
                        ,[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,CARRY,WORK] //900e ranged 4 +150 = 1050
                        ,[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,MOVE,CARRY,WORK] //500e + Meele 5 +150 = 650
                        ,[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,CARRY,WORK] //800e + Meele 6 +150 = 950
                      ];
        }

        var rangeC = _.filter(Game.creeps, (creep) => creep.memory.role == 'rangeC');
        var meleeC = _.filter(Game.creeps, (creep) => creep.memory.role == 'meleeC');
        
        var tx01 = '🏹 DEF: ' + rangeC.length+ '/' +NUMERO_ARQUEIROS_DEFENSORES;
        roleNotificacoes.topo(tx01,-0+(NOTIFICACOES_X), -2+(NOTIFICACOES_Y));
        var tx01 = '⚔️ DEF: ' + meleeC.length+ '/' +NUMERO_GUERREIROS_DEFENSORES;
        roleNotificacoes.topo(tx01,-0+(NOTIFICACOES_X), -1+(NOTIFICACOES_Y));


        if(en >=500+ajusteDefensorGuerra){
            
            if(rangeC.length < NUMERO_ARQUEIROS_DEFENSORES ) {
                if(en >=900+ajusteDefensorGuerra){
                    var newName = 'Ranger' + Game.time;
                    roleNotificacoes.topo('Spawning new Ranger: ' + newName,-0+(NOTIFICACOES_X),-10+(NOTIFICACOES_Y));
                    Game.spawns[NOME_SPAW].spawnCreep(defensores[4], newName,{memory: {role: 'rangeC',trabalha:trabalha}}); 
                }else if(en >=800+ajusteDefensorGuerra){
                    var newName = 'Ranger' + Game.time;
                    roleNotificacoes.topo('Spawning new Ranger: ' + newName,-0+(NOTIFICACOES_X),-10+(NOTIFICACOES_Y));
                    Game.spawns[NOME_SPAW].spawnCreep(defensores[3], newName,{memory: {role: 'rangeC',trabalha:trabalha}}); 
                }else{
                    var newName = 'Ranger' + Game.time;
                    roleNotificacoes.topo('Spawning new Ranger: ' + newName,-0+(NOTIFICACOES_X),-10+(NOTIFICACOES_Y));
                    Game.spawns[NOME_SPAW].spawnCreep(defensores[2], newName,{memory: {role: 'rangeC',trabalha:trabalha}}); 
                }
            }
            if(meleeC.length < NUMERO_GUERREIROS_DEFENSORES ) { 
                if(en >=800+ajusteDefensorGuerra){
                    var newName = 'Guerreiro' + Game.time;
                    roleNotificacoes.topo('Spawning new Guerreiro: ' + newName,-0+(NOTIFICACOES_X),-10+(NOTIFICACOES_Y));
                    Game.spawns[NOME_SPAW].spawnCreep(defensores[6], newName,{memory: {role: 'meleeC',trabalha:trabalha}});
                }else if(en >=500+ajusteDefensorGuerra){
                    var newName = 'Guerreiro' + Game.time;
                    roleNotificacoes.topo('Spawning new Guerreiro: ' + newName,-0+(NOTIFICACOES_X),-10+(NOTIFICACOES_Y));
                    Game.spawns[NOME_SPAW].spawnCreep(defensores[5], newName,{memory: {role: 'meleeC',trabalha:trabalha}});
                }        
            }
        }
	  
	    
	}
};

module.exports = roleDefensores;