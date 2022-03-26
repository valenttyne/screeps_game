'use strict'
var util = require('util');
var exploracao = require('exploracao');

global.VERSION = "2.2";

if (!Memory.username) {
  const struc = _.find(Game.structures);
  const creep = _.find(Game.creeps);
  Memory.username = (struc && struc.owner.username) || (creep && creep.owner.username);
}

global.USERNAME = Memory.username;


global.NOME_SALA = exploracao.getCidades()[0];
global.NOME_SPAW = "Forever";
global.FONTE_CONSTRUTORES = '5bbcaf809099fc012e63aad5';
global.FONTE_ATUALIZADORES = '5bbcaf809099fc012e63aad5';
global.FONTE_MINERADORES = '5bbcaf809099fc012e63aad6';

global.ENERGIA_MAXIMA = Game.rooms[NOME_SALA].energyCapacityAvailable;
global.ENERGIA_ATUAL = Game.rooms[NOME_SALA].energyAvailable;

 
global.NOTIFICACOES_X=-38;
global.NOTIFICACOES_Y=5;
global.POSICAO_DEFENSOR_X=42;
global.POSICAO_DEFENSOR_Y=30;

global.APENAS_DEPOSITA = false;

global.NUMERO_MINEIROS = 2; 
global.NUMERO_ATUALIZADORES =3; 
global.NUMERO_CONSTRUTORES = 3; 
global.NUMERO_BATEDORES_DROP = 1; 
global.NUMERO_MURALHA = 1;
global.NUMERO_BATEDORES_ENERGIA = 0;
global.NUMERO_AJUDANTE_ATUALIZADOR = 1;
global.NUMERO_GUERREIROS_DEFENSORES = 0;
global.NUMERO_ARQUEIROS_DEFENSORES = 1;
global.NUMERO_MINERADOR_DIREITA = 3;
global.NUMERO_MINERADOR_ESQUERDA = 2;
global.NUMERO_CLAIM_DIREITA = 0;
global.NUMERO_CLAIM_ESQUERDA = 1;


global.GUERRA = false;

global.NUMERO_MINERADORES_ATIVOS= 0;
global.MENOR_TRABALHOR_POSSIVEL= 200;
global.MAIOR_TRABALHOR_POSSIVEL= ENERGIA_MAXIMA;
global.PERC_AJUSTE= 1.2;
global.TRAB_MINIMO_IDEAL = util.pert(MENOR_TRABALHOR_POSSIVEL,util.calcularMedia([MENOR_TRABALHOR_POSSIVEL,MAIOR_TRABALHOR_POSSIVEL]),MAIOR_TRABALHOR_POSSIVEL);
global.ENERGIA_MINIMA_OPERARIO = NUMERO_MINERADORES_ATIVOS == 0?MENOR_TRABALHOR_POSSIVEL:TRAB_MINIMO_IDEAL;
global.RESERVA_ENERGIA_CREEP = ENERGIA_MINIMA_OPERARIO*PERC_AJUSTE;   

global.SALA_CLAIM_DIREITA = 'E44N43';
global.SALA_CLAIM_ESQUERDA = 'E42N43';

global.SALA_COLETA_DIREITA = 'E44N43';
global.SALA_COLETA_ESQUERDA = 'E42N43';
global.SALA_ENERGIA_DIREITA = '5bbcaf909099fc012e63ac7f';
global.SALA_ENERGIA_ESQUERDA = '5bbcaf6b9099fc012e63a94d';

global.STORE_ATUALIZADOR= '609ff11b275ebc75ac9798b5';
global.ATUALIZADOR_STORE= false;

global.LINK_ARMAZEM= '60a086bf578cad2b47127476';
global.LINK_RECEPTOR= '60a082090b3acfca459600ad';

global.INVASOR_CORE = false;
global.INVASOR_SALA = '';
global.INVASOR_SALA_COLETA_D = false;
global.INVASOR_SALA_COLETA_E = false;

