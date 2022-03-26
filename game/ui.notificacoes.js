var roleNotificacoes = {

    /** @param {Creep} creep **/
    topo: function(mensagem,x,y) {
        
         Game.spawns[NOME_SPAW].room.visual.text(
                mensagem,
                Game.spawns[NOME_SPAW].pos.x + x, 
                Game.spawns[NOME_SPAW].pos.y + y, 
                {align: 'left', opacity: 0.8});
	}
};

module.exports = roleNotificacoes;