# Screeps

# Sobre o Jogo

"World é um jogo sandbox MMO RTS de código aberto para entusiastas de programação, em que a mecânica principal é programar suas unidades AI. Você controla sua colônia escrevendo JavaScript que opera 24 horas por dia, 7 dias por semana no único mundo aberto persistente preenchido por outros jogadores no mesmo nível que você." (tradução do site https://screeps.com/ em 2022/03/26)

A documentação do jogo pode ser encontrada em https://docs.screeps.com/ 

# Porque esse Git 

Mesmo com a melhora da documentação do Game com o passar dos anos, eu notei que ainda tem uma barreia de entrada para novos programadores e pensando em ajudar amigos que queriam iniciar no game e quem mais da comunidade possa precisar eu estou liberando uma versão estável do código que estou usando atualmente. Lembrando que ele ainda está em desenvolvimento e constante melhoria.

Todos estão livres para contribuir =) 

# Versão 2.2

Informações da versão:

Na versão 2.2 o game irá criar os screeps de forma automática e já os fará minerar, fazer upgrade e coletar drops e energia, além de manter as muralhas.
Para isso o scritp usará as informações definidas no arquivo de constantes, porém os tamanhos e tipo de corpo dos screeps é escolhido de forma automática de acordo com a quantidade de energia disponível.

É utilizado usa cálculos de energia mínima ideal para manter a saúde da sala e quando a energia cai em um nível considerado crítico os screeps vão automaticamente minerar como prioridade. Essas fórmulas matemáticas podem ser achadas no arquivo util.js.

Essa versão conta com um recurso para defesas automáticas de ataques (“guerra = true”), onde todos os screeps “normais” virarão mineradores e o deferentes vão automaticamente defender. Esse recurso é ativado e desativado automaticamente e no final da guerra os screeps voltam as ações normais. 

As torres fora de “guerra” ajudam a fazer a manutenção das muralhas e demais itens que precisem se energia para se manter e durante a guerra focam nos inimigos. Além disso elas mantem sempre uma quantidade mínima de energia para se defender quando necessário. 

Além disso essa versão já tem o controle de torres (criação e controle em si), coleta em salas adjacentes, claim, e transferências entre armazéns. 


Configurações mais importantes:

Para começar a utilizar o código você deve mudar o arquivo constantes.js com as informações da sua room. 

global.NOME_SPAW -> nessa variável você deve colocar o nome do seu Spaw

Eu faço o controle separado da fonte que os construtores, atualizadores e mineradores utilização durante o jogo, logo você precisa inserir o código delas nas variáveis abaixo. Se sua sala não tiver 03 fontes não tem problema colocar o mesmo código em mais de uma.

global.FONTE_CONSTRUTORES 
global.FONTE_ATUALIZADORES 
global.FONTE_MINERADORES 

Durante o jogo eu fiz um mini HUD que fica exibindo algumas informações importantes para o jogado, como o posicionamento das salas são diferentes, você precisa configurar a posição ideal para HUD na sua sala.

global.NOTIFICACOES_X=-38;
global.NOTIFICACOES_Y=5;
global.POSICAO_DEFENSOR_X=42;
global.POSICAO_DEFENSOR_Y=30;

Nas variáveis abaixo, você poderá seta o numero ideal de cada tipo de screep que você quer ter atualmente. 

Esses são os básicos para início do jogo.
global.NUMERO_MINEIROS = 2; 
global.NUMERO_ATUALIZADORES =3; 
global.NUMERO_CONSTRUTORES = 3; 

Os batedores de Drop são mineradores que focam em pegar drop de screeps mortos, com intuito de coletar ele antes que ele suma.
global.NUMERO_BATEDORES_DROP = 1; 

O screps para manutenção da muralharas são importantes quando você já tiver as colocado.
global.NUMERO_MURALHA = 1;

global.NUMERO_BATEDORES_ENERGIA = 0;
global.NUMERO_AJUDANTE_ATUALIZADOR = 1;

Os guerreiros são defensores importantes, mas normalmente não precisam ser criados no início do jogo.
global.NUMERO_GUERREIROS_DEFENSORES = 0;
global.NUMERO_ARQUEIROS_DEFENSORES = 1;

Os mineradores de outras salas e o claim só deve ser criado quando a sala atua já estiver em um nível sustentável. 

global.NUMERO_MINERADOR_DIREITA = 3;
global.NUMERO_MINERADOR_ESQUERDA = 2;
global.NUMERO_CLAIM_DIREITA = 0;
global.NUMERO_CLAIM_ESQUERDA = 1;


