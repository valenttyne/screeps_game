function reparar(torre){
    
    var closestDamagedStructure = torre.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && (structure.structureType != STRUCTURE_WALL || structure.hits < 100000) && (structure.structureType != STRUCTURE_RAMPART || structure.hits < 600000)
            //filter: (structure) => structure.hits < structure.hitsMax && ((structure.structureType != STRUCTURE_WALL || structure.hits < 10000)||(structure.structureType == STRUCTURE_RAMPART))
        });
   
    if(closestDamagedStructure) {
        torre.repair(closestDamagedStructure);
    }else{
        curar(torre);
    }
} 
function curar(torre){
    
    var creepTarget = torre.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (creeps) => creeps.hits < creeps.hitsMax
        });
   
    if(creepTarget) {
        torre.heal(creepTarget);
    }
    
}   
var roleTorres = {
       
        
        /** @param {Creep} creep **/
        emGuarda: function(towers,hostiles) {
            
            //Game.spawns['Forever'].room.createConstructionSite( 40, 37, STRUCTURE_TOWER );            
            //var towers = Game.rooms[NOME_SALA].find( FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            //var hostiles = Game.rooms[NOME_SALA].find(FIND_HOSTILE_CREEPS);
            
            if(hostiles.length > 0) {
                
                var username = hostiles[0].owner.username;
                
                //Game.notify(`User ${username} spotted in room ${NOME_SALA}`);
                //console.log(`User ${username} spotted in room ${NOME_SALA}`);
                
                towers.forEach(tower => tower.attack(hostiles[0]));
                
            }else{
                //controlando para a torre sempre ter pelo menos um estoque de 400e 
                //para mitigar inimigos ou alguma nescessidade pontual
                for(var idT in towers) {
                    
                    if(towers[idT].store.getFreeCapacity(RESOURCE_ENERGY) < 600){
                        reparar(towers[idT]);
                    }
                    
                }                
            }
            
        }
	
};

module.exports = roleTorres;