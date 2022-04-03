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
global.NOME_SPAW = ""; // coloquei aqui o nome do seu spaw
global.FONTE_CONSTRUTORES = ''; // coloquei aqui o id da font que será usada pelos construtores
global.FONTE_ATUALIZADORES = ''; // coloquei aqui o id da font que será usada pelos atualizadores 
global.FONTE_MINERADORES = ''; // coloquei aqui o id da font que será usada pelos mineradores

global.ENERGIA_MAXIMA = Game.rooms[NOME_SALA].energyCapacityAvailable;
global.ENERGIA_ATUAL = Game.rooms[NOME_SALA].energyAvailable;

 
global.NOTIFICACOES_X=-38; // ajuste no x até as notificações ficarem em um boa posição
global.NOTIFICACOES_Y=5; // ajuste no y até as notificações ficarem em um boa posição
global.POSICAO_DEFENSOR_X=42; // ajuste no x até as notificações ficarem em um boa posição
global.POSICAO_DEFENSOR_Y=30; // ajuste no y até as notificações ficarem em um boa posição

global.APENAS_DEPOSITA = false;

//defina a quantidade de cada tipo de operario de acordo com a necessidade
global.NUMERO_MINEIROS = 2; 
global.NUMERO_ATUALIZADORES =2; 
global.NUMERO_CONSTRUTORES = 2; 
global.NUMERO_BATEDORES_DROP =0; 
global.NUMERO_MURALHA = 1;
global.NUMERO_BATEDORES_ENERGIA = 0;
global.NUMERO_AJUDANTE_ATUALIZADOR = 0;
global.NUMERO_GUERREIROS_DEFENSORES = 0;
global.NUMERO_ARQUEIROS_DEFENSORES = 1;
global.NUMERO_MINERADOR_DIREITA = 0;
global.NUMERO_MINERADOR_ESQUERDA = 0;
global.NUMERO_CLAIM_DIREITA = 0;
global.NUMERO_CLAIM_ESQUERDA = 0;


global.GUERRA = false;

global.NUMERO_MINERADORES_ATIVOS= 0; // numero minimo de mineradores ativos, padrao = 0
global.MENOR_TRABALHOR_POSSIVEL= 200;
global.MAIOR_TRABALHOR_POSSIVEL= ENERGIA_MAXIMA;
global.PERC_AJUSTE= 1.2;
global.TRAB_MINIMO_IDEAL = util.pert(MENOR_TRABALHOR_POSSIVEL,util.calcularMedia([MENOR_TRABALHOR_POSSIVEL,MAIOR_TRABALHOR_POSSIVEL]),MAIOR_TRABALHOR_POSSIVEL);
global.ENERGIA_MINIMA_OPERARIO = NUMERO_MINERADORES_ATIVOS == 0?MENOR_TRABALHOR_POSSIVEL:TRAB_MINIMO_IDEAL;
global.RESERVA_ENERGIA_CREEP = ENERGIA_MINIMA_OPERARIO*PERC_AJUSTE;   

global.SALA_CLAIM_DIREITA = ''; // coloque aqui o nome da sala a direita que vai dar claim
global.SALA_CLAIM_ESQUERDA = ''; // coloque aqui o nome da sala a esquerda que vai dar claim

global.SALA_COLETA_DIREITA = ''; // coloque aqui o nome da sala a direita que vai dar coletar
global.SALA_COLETA_ESQUERDA = ''; // coloque aqui o nome da sala a esquerda que vai dar coletar
global.SALA_ENERGIA_DIREITA = ''; // coloque aqui o nome da fonte da sala a direita que vai coletar
global.SALA_ENERGIA_ESQUERDA = ''; // coloque aqui o nome da fonte da sala a esquerda que vai coletar

global.STORE_ATUALIZADOR= ''; // quando tiver um store coloque o id dele aqui
global.ATUALIZADOR_STORE= false;

global.LINK_ARMAZEM= ''; // quando tiver um armazem coloque o id dele aqui
global.LINK_RECEPTOR= ''; // quando tiver um receptor coloque o id dele aqui

//especificos para atacar um creeps em uma sala
global.INVASOR_CORE = false;
global.INVASOR_SALA = '';
global.INVASOR_SALA_COLETA_D = false;
global.INVASOR_SALA_COLETA_E = false;

global.NOME_SALA2 = ''; // nome da sala do segundo spaw
global.NOME_SPAW2 = ''; // coloquei aqui o nome do seu 2 spaw

global.FONTE_CONSTRUTORES_SALA2 = ''; // coloquei aqui o id da font que será usada pelos construtores
global.FONTE_ATUALIZADORES_SALA2 = ''; // coloquei aqui o id da font que será usada pelos atualizadores 
global.FONTE_MINERADORES_SALA2 = ''; // coloquei aqui o id da font que será usada pelos mineradores
