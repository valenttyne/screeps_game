var util = {
    arredondar:function (num, places) {
        if (!("" + num).includes("e")) {
    		return +(Math.round(num + "e+" + places)  + "e-" + places);
    	} else {
    		let arr = ("" + num).split("e");
    		let sig = ""
    		if (+arr[1] + places > 0) {
    			sig = "+";
    		}
    
    		return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
    	}
    },
    pert:function (min,normal,max){
        return ((min+4*normal+max)/6);
    },
    calcularMedia:function (arrayElementos){
        var media = 0;
        for (elemento in arrayElementos) {
    		media += arrayElementos[elemento];			
    	}
    	return ((media/arrayElementos.length));
    },
    retornaElementoMaisProximo:function (dados,creep){
        
       var posicaoCreep = creep.pos.x+creep.pos.y;       
       var retorno = dados[0];
       var distancia = 99999;
       var distanciaPontos = 99999;
       for (elemento in dados) {

            distanciaPontos = Math.sqrt(Math.pow(creep.pos.x-dados[elemento].pos.x,2) + Math.pow(creep.pos.y-dados[elemento].pos.y,2));   

            if(distanciaPontos < distancia ){
                distancia = distanciaPontos;
                retorno = dados[elemento];
            }

                   
        }

        return retorno;

    },
    retornaElementoMaisLonge:function (dados,creep){
        
       var posicaoCreep = creep.pos.x+creep.pos.y;       
       var retorno = dados[0];
       var distancia = 0;
       var distanciaPontos = 0;
       for (elemento in dados) {

            distanciaPontos = Math.sqrt(Math.pow(creep.pos.x-dados[elemento].pos.x,2) + Math.pow(creep.pos.y-dados[elemento].pos.y,2));    

            if(distanciaPontos > distancia ){
                distancia = distanciaPontos;
                retorno = dados[elemento];
            }

                   
        }

        return retorno;

    },
    retornaDistanciaCreepElemento:function (dados,creep){              

        return Math.sqrt( Math.pow(creep.pos.x-dados.pos.x,2) + Math.pow(creep.pos.y-dados.pos.y,2) );

    }
    
};

module.exports = util;