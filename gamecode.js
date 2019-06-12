/*Equipe: Ana Beatriz da Silva Nunes - Turma 1C (Líder) 
          Joyce Karoline da Silva Araújo - Turma 1D */

var i;
var x = 250; //Posição x do jogador.   
var y = 400; //Posição y do jogador.
var xd = 0; //Posição x inicial do disparo.
var yd = 0; //Posição y inicial do disparo.
var raioO = 15; //Raio do objeto p/ ser usado na colisão.
var raioJ = 30; //Raio do jogador p/ ser usado na colisão.
var raioD = 7; //Raio do disparo p/ ser usado na colisão.
var tela = 1; //Valor inicial p/ troca de telas.
var estadoDisp = false; //Estado inicial de disparo.
var health = 3; //Quantidade de vidas no início do jogo.
var score = 0; //Quantidade de pontos no início do jogo.
var level = 1; //Nível inicial do jogo.
var qtMax = 6; //Quantidade máxima de objetos.
var qtAtual = 2; //Quantidade de objetos por nível.
var barreiraScore = 500; //Pontos a serem atingidos para passar de nível.
var vxO = []; //Vetor para a posição x do objeto.  
var vyO = []; //Vetor para a posição y do objeto.
var imagem1; //Tela inicial do jogo.
var imagem2; //Tela do jogo e do game over.
var musicadojogo; //Variável p/ guardar a música do jogo.
var musicagameover; //Variável p/ guardar a música game over.
var gameover = true; //Detecção de quando a música de game over tocará.
var jogador0; //Variável pra guardar a imagem do jogador.
var objeto0; //Variável pra guardar a imagem do objeto.
var objeto = []; //Vetor p/ as imagens dos objetos.
var explosao = []; //Efeito da explosão na hora da colisão.
var estadoExplosao = false; //Detecção de quando haverá a explosão.
var explosaoX; //Efeito no eixo x.
var explosaoY; //Efeito no eixo y.
var contExp = 0; //Contador p/ delimitar a a repetição dos frames das imagens.
var textX; //Posição do texto no eixo x.
var contText = 0; //Para o efeito pisca-pisca do texto.
          
function preload(){
    imagem1 = loadImage("telainicial.jpg");
    imagem2 = loadImage("bg.jpg");
    jogador = loadImage("ship.png");
    objeto = loadImage("mine0.png");
    disparo = loadImage("shot.png");
    musicadojogo = loadSound("musicatop.mp3");
    musicagameover = loadSound("losemusic.wav");
    for(i = 0; i <= 10; i++){
        explosao[i] = loadImage("boom" + i + ".png");
    }
}
          
function setup(){
    createCanvas(500, 500);
    musicadojogo = loadSound("musicatop.mp3");
    //Complemento da etapa 7.
    for(i = 0; i < qtMax; i++){
        vxO[i] = random(0, 350);
        vyO[i] = -90;
    }
}

function mousePressed() {
  if(musicadojogo.isPlaying()) {
    musicadojogo.stop();
    background(0);
  } else {
    musicadojogo.play();
    background(255)
  }
}
          
function draw(){
//Etapa 9: Mudança de tela.
    if(tela == 1){
        background(255);
        image(imagem1, 0, 0, 500, 500);
        fill('#ffffff');
        textSize(80);
        textFont('VT323');
        text('SpaceMine', 100, 260);
        textSize(40);
        text('Press ENTER to start', 90, 300);
        if(keyIsDown(ENTER)){
            tela = 2;
        }
    }
    if(tela == 2){
        background(255);
        image(imagem2, 0, 0);
        imageMode(CENTER);
        //Etapa 1: Fazer duas figuras geométricas (elipse = jogador e quadrado = obstáculo).
        //Obstáculo:
        for(i = 0; i < qtAtual; i++){
            noFill(0); 
            noStroke(0);
            ellipse(vxO[i], vyO[i], 2*raioO, 2*raioO);
            image(objeto, vxO[i], vyO[i]);
            imageMode(CENTER);
        }
        //Jogador:
        noFill('#6eb7ad');
        noStroke('#67dbd1');
        ellipse(x, y, 2*raioJ, 2*raioJ);
        image(jogador, x, y);
        imageMode(CENTER);
        //Animação da explosão.
        //image(explosao[0], explosaoX, explosaoY);
        if(estadoExplosao == true){
            imageMode(CENTER);
            image(explosao[contExp], explosaoX, explosaoY, 50, 50);
            contExp++;
            if(contExp > 10){
                estadoExplosao = false;
                contExp = 0;
            }
        }
            
        //Etapa 2: Fazer a movimentação do jogador com o teclado.
        if(keyIsDown(LEFT_ARROW)){
            x -= 8;
        }
        if(keyIsDown(RIGHT_ARROW)){
            x += 8;
        }
        if(keyIsDown(UP_ARROW)){
            y -= 8;
        }
        if(keyIsDown(DOWN_ARROW)){
            y += 8;
        }
            
        //Etapa 3: fazer o objeto andar no cenário do jogo. Ele deve sumir ao atravessar os limites do cenário e um novo objeto deve aparecer tempos depois.
        if(x > 490){
            x -= 10;
        }
        if(x < 0){
            x += 10;
        }
        if(y > 490){
            y -= 10;
        }
        if(y < 0){
            y += 10;
        }
            
        //Movimento dos obstáculos.
        for(i = 0;i < qtAtual;i++){
            vyO[i] = vyO[i] + 2;
            if(vyO[i] > 500){
                vxO[i] = random(0,350);
                vyO[i] = 0;
            }
        }
            
        //Etapa 4: fazer o jogador realizar disparos.
        if(keyIsDown(CONTROL) && estadoDisp == false){
            xd = x;
            yd = y;
            estadoDisp = true;
        }
        if(estadoDisp == true){
            noFill('#ff0101');
            noStroke('#930505');
            ellipse(xd, yd, 2*raioD, 2*raioD);
            image(disparo, xd, yd);
            yd -= 10
            if(yd < 0){
                estadoDisp = false;
            }
        }
            
        //Etapa 5: Apresentar as informações sobre o jogo na tela.
        fill(255);
        stroke('#247e87');
        textSize(25);
        textFont('VT323');
        text('Health: '+health, 19, 30);
        text('Score: '+score, 205, 30);
        text('Level: '+level, 400, 30);
            
        //Etapa 6: Detectar colisão entre o jogador e um objeto do cenário + Complemento da etapa 7.
        for(i = 0; i < qtAtual; i++){
            //Colsao com o objeto.
            if(dist(x, y, vxO[i], vyO[i]) < (raioJ + raioO)){
                x = 250; 
                y = 400;
                health -= 1;    
            }
            //Colisao do disparo com o objeto.
            if (dist(xd, yd, vxO[i], vyO[i]) < (raioD + raioO) && estadoDisp == true){
                estadoDisp = false;
                score += 50;
                vyO[i] = -random(100, 500);
                vxO[i] = random(50, 450);
                estadoExplosao = true; 
                explosaoX = xd;
                explosaoY = yd;
                   
            }
        }
        //Etapa 8: Implementar a mudança de nível de dificuldade para o jogo.
        if(score > barreiraScore){
            barreiraScore = barreiraScore + 500;
            level++
        }
        if(level == 2){
            qtAtual = 4;
        }
        if(level == 3){
            qtAtual = 6;
        }
        
        if(health <= 0){
            tela = 3;
        } 
    } 
    if(tela == 3){
        musicadojogo.setVolume(0);
        musicagameover.setVolume(0.5);
        if(gameover == true){
            musicagameover.play();
            gameover = false;
        }
        background(0);
        image(imagem2, 0, 0);
        imageMode(CENTER);
        fill('#ffffff');
        textSize(80);
        textFont('VT323');
        text('GAME OVER', 110, 235);
        textSize(40);
        text('Score:' + score, 198, 270);
        textSize(40);
        text('Press ENTER to restart', 80, 310);
        if(keyIsDown(ENTER)){
            gameover = true;
            musicadojogo.setVolume(0.5);
            tela = 2;
            health = 3;
            score = 0;
            level = 1;
            x = 250;   
            y = 400;
            for(i = 0; i < qtAtual; i++){
                vxO[i] = random(0, 350);
                vyO[i] = -90;
            }
        }
    }
}

