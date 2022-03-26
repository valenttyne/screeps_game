'use strict'
var exploracao = {

	getCidades:function () {
	  // Ao reaparecer, a primeira sala deve ser detectada automaticamente, após o que novas cidades precisarão ser adicionadas.
	  if (!Memory.territorio || Object.keys(Memory.territorio).length <= 0) {
	    Memory.territorio = {}
	    for (const roomName of Object.keys(Game.rooms)) {
	      const room = Game.rooms[roomName]
	      if (room.controller && room.controller.my) {
	        Memory.territorio[roomName] = {}
	      }
	    }
	  }
	  return Object.keys(Memory.territorio)
	},
	addCidade:function (roomName) {
	  if (!Memory.territorio[roomName]) {
	    Memory.territorio[roomName] = {}
	    console.log(`Adding city ${roomName} to empire`)
	  }
	},
	removeCidade:function(roomName) {
	  if (Memory.territorio && Memory.territorio[roomName]) {
	    delete Memory.territorio[roomName]
	    console.log(`Removing city ${roomName}`)
	  }
	},
	eCidade:function (roomName) {
	  return Boolean(Memory.territorio[roomName])
	},
	getMinas:function(roomName) {
	  if (!Memory.territorio || !Memory.territory[roomName]) {
	    return []
	  }
	  if (!Memory.territorio[roomName].minas) {
	    return []
	  }
	  return Memory.territorio[roomName].minas
	},
	addMina:function (mina,roomName) {
	  if (!Memory.territorio || !Memory.territorio[this.name]) {
	    return false
	  }
	  if (!Memory.territorio[roomName].minas) {
	    Memory.territorio[roomName].minas = []
	  }
	  Memory.territorio[roomName].minas.push(mina)
	  console.log(`Adding mine from ${roomName} to ${mina}`)
	},
	removeMina:function (mina,roomName) {
	  const id = getMinaId(mina) //TODO
	  if (!id || id < 0) {
	    return
	  }

	  console.log(`Removing mine ${mine} from ${this.name}`)
	  Memory.territorio[roomName].minas.splice(id, 1)
	},
	getMinaId:function (mina,roomName) {
	  const id = Memory.territorio[roomName].minas.indexOf(mina)
	  return id >= 0 ? id : false
	},
	getStatusSala:function (roomName){
		return Game.map.getRoomStatus(roomName).status;
	},
	getMineOwner:function (mina) {
	  if (!Memory.territorio) {
	    return false
	  }
	  if (!this.mineMap) {
	    this.mineMap = {}
	  } else if (this.mineMap[mina]) {
	    return this.mineMap[mina]
	  }
	  const roomNames = Object.keys(Memory.territorio)
	  let roomName
	  for (roomName of roomNames) {
	    if (!Memory.territorio[roomName] || !Memory.territorio[roomName].minas) {
	      continue
	    }
	    if (Memory.territorio[roomName].minas.indexOf(mina) >= 0) {
	      this.mineMap[mina] = roomName
	      return roomName
	    }
	  }
	  this.mineMap[mina] = false
	  return false
	},
	mapeaCidades:function(){
	/*
		let cidades = this.getCidades();
		
		for(var cidade in cidades){

			console.log(cidades[cidade]);

			var containers = Game.rooms[cidades[cidade]].find(FIND_STRUCTURES, {
                    filter: (structure) => { return (structure.structureType == STRUCTURE_EXTENSION );  } });
			var spawn = Game.rooms[cidades[cidade]].find(FIND_STRUCTURES, {
                    filter: (structure) => { return ( structure.structureType == STRUCTURE_SPAWN ); } });
			var torre = Game.rooms[cidades[cidade]].find(FIND_STRUCTURES, {
                    filter: (structure) => { return ( structure.structureType == STRUCTURE_TOWER ); } });
			var sources = creep.room.find(FIND_SOURCES);
			
				


		}

		*/
	}
	  



};

module.exports = exploracao;