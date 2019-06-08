 /*Equipe: Ana Beatriz da Silva Nunes - Subturma 1C (Líder) 
          Joyce Karoline da Silva Araújo - Subturma 1D */

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
var vidas = 3; //Quantidade de vidas no início do jogo.
var pontos = 0; //Quantidade de pontos no início do jogo.
var nivel = 1; //Nível inicial do jogo.
var qtObj = 10; //Quantidade de objetos.
var barreiradepontos = 500; /*Pontos a serem atingidos para passar de nível.*/
var vxO = []; //Vetor para a posição x do objeto.  
var vyO = []; //Vetor para a posição y do objeto.
var imagem1;
var imagem2;
var jogador0;
var objeto0;
var explosao = []; //Efeito da explosão na hora da colisão.
var estadoExplosao = false; 
var explosaoX;
var explosaoY;
var contFrame = 0;
          
function preload(){
    imagem1 = loadImage("telainicial.jpg");
    imagem2 = loadImage("bg.jpg");
    jogador0 = loadImage("jogador0.png");
    objeto0 = loadImage("mine0.png");
    for(i=0; i <= 10; i++){
        explosao[i] = loadImage("boom" + i + ".png");
    }
}
          
function setup(){
    createCanvas(500, 500);
    //Complemento da etapa 7.
    for(i = 0; i < qtObj; i++){
        vxO[i] = random(0, 350);
        vyO[i] = -100;
    }
}
          
function draw(){
//Etapa 9: Mudança de tela.
    if(tela == 1){
        background(0);
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
        background(0);
        image(imagem2, 0, 0);
        imageMode(CENTER);
        //Etapa 1: Fazer duas figuras geométricas (elipse = jogador e quadrado = obstáculo).
        //Obstáculo:
        for(i = 0; i < qtObj; i++){
            noFill(0); 
            noStroke(0);
            ellipse(vxO[i], vyO[i], 2*raioO, 2*raioO);
            image(objeto0, vxO[i], vyO[i]);
            imageMode(CENTER);
        }
        //Jogador:
        noFill('#6eb7ad');
        noStroke('#67dbd1');
        ellipse(x, y, 2*raioJ, 2*raioJ);
        image(jogador0, x, y);
        imageMode(CENTER);
        //Animação da explosão.
        //image(explosao[0], explosaoX, explosaoY);
        if(estadoExplosao == true){
            imageMode(CENTER);
            image(explosao[contFrame], explosaoX, explosaoY, 50, 50);
            contFrame++;
            if(contFrame > 10){
                estadoExplosao = false;
                contFrame = 0;
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
        for(i = 0;i < 2;i++){
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
            fill('#ff0101');
            stroke('#930505');
            ellipse(xd, yd, 2*raioD, 2*raioD);
            yd -= 10
            if(yd < 0){
                estadoDisp = false;
            }
        }
            
        //Etapa 5: Apresentar as informações sobre o jogo na tela.
        fill('#458da8');
        stroke('#66a9c1');
        textSize(12);
        textFont('VT323');
        text('Vidas: '+vidas, 19, 30);
        text('Pontos: '+pontos, 210, 30);
        text('Nível: '+nivel, 420, 30);
            
        //Etapa 8: Implementar a mudança de nível de dificuldade para o jogo.
        if(pontos > barreiradepontos){
            nivel++
            barreiradepontos = barreiradepontos + 500;
        }
            
        //Etapa 6: Detectar colisão entre o jogador e um objeto do cenário + Complemento da etapa 7.
        for(i = 0; i < qtObj; i++){
            //Colsao com o objeto.
            if(dist(x, y, vxO[i], vyO[i]) < (raioJ + raioO)){
                x = 250; 
                y = 400;
                vidas = vidas - 1;    
            }
            //Colisao do disparo com o objeto.
            if (dist(xd, yd, vxO[i], vyO[i]) < (raioD + raioO) && estadoDisp == true){
                estadoDisp = false;
                pontos++;
                vyO[i] = -random(100, 500);
                vxO[i] = random(50, 450);
                estadoExplosao = true; 
                explosaoX = xd;
                explosaoY = yd;
                   
            }
        }
        if(vidas <= 0){
            tela = 3;
        } 
    } 
    if(tela == 3){
        background(0);
        image(imagem2, 0, 0);
        imageMode(CENTER);
        fill('#ffffff');
        textSize(80);
        textFont('VT323');
        text('GAME OVER', 110, 235);
        textSize(40);
        text('Press ENTER to restart', 80, 290);
        if(keyIsDown(ENTER)){
            tela = 2;
            vidas = 3;
            pontos = 0;
            nivel = 1;
            x = 250;   
            y = 400;
            for(i = 0; i < qtObj; i++){
                vxO[i] = random(0, 350);
                vyO[i] = -100;
            }
        }
    }
}
