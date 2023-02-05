//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let ponto;
let ping;

//variáveis erros
let chanceDeErrar = 0;

function preload(){
  ping = loadSound("ping.mp3");
  
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(3,0,28);
  
  mostraBolinha();
  
  movimentaBolinha();
  
  verificaColisaoBorda();
  
  mostraRaquete(xRaquete, yRaquete);
  
  movimentaMinhaRaquete();
  
  //verificaColisaoRaquete();
  
  verificaColisaoRaquete(xRaquete, yRaquete);
  
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  fill(182,234,218);
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}


function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}


function mostraRaquete(x,y){
  fill(91,30,170);
  rect(x, y, raqueteComprimento, 
      raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
      yBolinha - raio < yRaquete + raqueteAltura && 
      yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
     pingpong.play();
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y,raqueteComprimento,raqueteAltura,
                              xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    ping.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
   calculaChanceDeErrar()
}

//caso queira testar com um amigo, é só substituir o codigo acima por "multiplayer();"

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 5
    if (chanceDeErrar >= 45){
    chanceDeErrar = 50
    }
  } else {
    chanceDeErrar -= 2
    if (chanceDeErrar <= 37){
    chanceDeErrar = 37
    }
  }
}

function incluiPlacar(){
  stroke(150);
  textAlign(CENTER);
  textSize(16);
  fill(color(48,30,103));
  rect(200, 10, 40, 20);
  fill(color(100,180,200));
  text(meusPontos, 220, 26);
  fill(color(48,30,103));
  rect(400, 10, 40, 20);
  fill(color(100,180,200));
  text(pontosDoOponente, 420, 26)
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function multiplayer(){
     if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}









