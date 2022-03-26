var configOperarios = {

    /** @param {Creep} creep **/
    retornaOperario: function() {        


        var energia = ENERGIA_ATUAL;
        var operario=[];
        do{

            operario.push(WORK);             
            energia -=100;
            if(energia<50) return operario;

            operario.push(CARRY);
            energia -=50;
            if(energia<50) return operario;

            operario.push(CARRY);
            energia -=50;
            if(energia<50) return operario;

            operario.push(MOVE);
            energia -=50;
            if(energia<50) return operario;

            operario.push(MOVE);
            energia -=50;
            if(energia<50) return operario;


        }while(energia>50)

        return operario;                
        
    }
        
};

module.exports = configOperarios;