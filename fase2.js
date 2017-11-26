var x, y; // coordenadas pacMan
var fx, fy; // coordenadas fantasma
var fx2, fy2; // coordenadas fantasma 2

var dfx, dfy; // velocidade fantasma
var dfx2, dfy2; // velocidade fantasma 2

var raio = 10; 

var canvasX = 380;
var canvasY = 460;

var tamBloco = 20;

var vidas = 3;
var pontos = 0;
var pontos2 = 0;

var tela = 0;
var jogo_iniciou = false

var img = [];
var cont = 1;
var cont2 = 1;


// carregar imagem
function preload() {
	for(i = 1; i <= 11;i++){
		img[i] = loadImage("Imagens/img"+i+".png");
	}
}

/*//carregar música
function preload() {
  soundFormats("mp3");
  mySound = loadSound("Música/PacMan_Original_Theme.mp3");
}*/


cenario = [
//		["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
/*1*/	["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
/*2*/	["#", "b", "c", "c", "c", "c", "c", "c", "c", "#", "c", "c", "c", "c", "c", "c", "c", "c", "#"],
/*3*/	["#", "c", "#", "#", "c", "#", "#", "#", "c", "#", "c", "#", "#", "#", "c", "#", "#", "c", "#"],
/*4*/	["#", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "#"],
/*5*/	["#", "c", "#", "#", "c", "#", "c", "#", "#", "#", "#", "#", "c", "#", "c", "#", "#", "c", "#"],
/*6*/	["#", "c", "c", "c", "c", "#", "c", "c", "c", "#", "b", "c", "c", "#", "c", "c", "c", "c", "#"],
/*7*/	["#", "#", "#", "#", "c", "#", "#", "#", "c", "#", "c", "#", "#", "#", "c", "#", "#", "#", "#"],
/*8*/	["v", "v", "v", "#", "c", "#", "c", "c", "c", "c", "c", "c", "c", "#", "c", "#", "v", "v", "v"],
/*9*/	["#", "#", "#", "#", "c", "#", "c", "#", "v", "v", "v", "#", "c", "#", "c", "#", "#", "#", "#"],
/*10*/	["c", "b", "c", "c", "c", "c", "c", "#", "v", "v", "v", "#", "c", "c", "c", "c", "c", "c", "c"],
/*11*/	["#", "#", "#", "#", "c", "#", "c", "#", "#", "#", "#", "#", "c", "#", "c", "#", "#", "#", "#"],
/*12*/	["v", "v", "v", "#", "c", "#", "c", "c", "c", "c", "c", "c", "c", "#", "c", "#", "v", "v", "v"],
/*13*/	["#", "#", "#", "#", "c", "#", "c", "#", "#", "#", "#", "#", "c", "#", "c", "#", "#", "#", "#"],
/*14*/	["#", "c", "c", "c", "c", "c", "c", "c", "c", "#", "c", "c", "c", "c", "c", "c", "c", "c", "#"],
/*15*/	["#", "c", "#", "#", "b", "#", "#", "#", "c", "#", "c", "#", "#", "#", "c", "#", "#", "c", "#"],
/*16*/	["#", "c", "c", "#", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "#", "c", "c", "#"],
/*17*/	["#", "#", "c", "#", "c", "#", "c", "#", "#", "#", "#", "#", "c", "#", "c", "#", "c", "#", "#"],
/*18*/	["#", "b", "c", "c", "c", "#", "c", "c", "c", "#", "c", "c", "c", "#", "c", "c", "c", "c", "#"],
/*19*/	["#", "c", "#", "#", "#", "#", "#", "#", "c", "#", "c", "#", "#", "#", "#", "#", "#", "c", "#"],
/*20*/	["#", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "#"],
/*21*/	["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],

	];
	
	
cenario2 = [
//		["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
/*1*/	["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
/*2*/	["#", "c", "b", "c", "c", "c", "b", "c", "c", "#", "c", "c", "c", "c", "c", "c", "c", "c", "#"],
/*3*/	["#", "c", "#", "#", "c", "#", "#", "#", "c", "#", "c", "#", "#", "#", "c", "#", "#", "c", "#"],
/*4*/	["#", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "#"],
/*5*/	["#", "c", "#", "#", "c", "#", "c", "#", "#", "#", "#", "#", "c", "#", "c", "#", "#", "c", "#"],
/*6*/	["#", "c", "c", "c", "c", "#", "c", "c", "c", "#", "b", "c", "c", "#", "c", "c", "c", "c", "#"],
/*7*/	["#", "#", "#", "#", "c", "#", "#", "#", "c", "#", "c", "#", "#", "#", "c", "#", "#", "#", "#"],
/*8*/	["v", "v", "v", "#", "c", "#", "c", "c", "c", "c", "c", "c", "c", "#", "c", "#", "v", "v", "v"],
/*9*/	["#", "#", "#", "#", "c", "#", "c", "#", "v", "v", "v", "#", "c", "#", "c", "#", "#", "#", "#"],
/*10*/	["c", "b", "c", "c", "c", "c", "c", "#", "v", "v", "v", "#", "c", "c", "c", "c", "c", "c", "c"],
/*11*/	["#", "#", "#", "#", "c", "#", "c", "#", "#", "#", "#", "#", "c", "#", "c", "#", "#", "#", "#"],
/*12*/	["v", "v", "v", "#", "c", "#", "c", "c", "c", "c", "c", "c", "b", "#", "c", "#", "v", "v", "v"],
/*13*/	["#", "#", "#", "#", "c", "#", "c", "#", "#", "#", "#", "#", "c", "#", "c", "#", "#", "#", "#"],
/*14*/	["#", "c", "c", "c", "c", "c", "c", "c", "c", "#", "c", "c", "c", "c", "c", "c", "c", "c", "#"],
/*15*/	["#", "c", "#", "#", "c", "#", "#", "#", "c", "#", "c", "#", "#", "#", "c", "#", "#", "c", "#"],
/*16*/	["#", "c", "c", "#", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "#", "c", "b", "#"],
/*17*/	["#", "#", "c", "#", "c", "#", "c", "#", "#", "#", "#", "#", "c", "#", "c", "#", "c", "#", "#"],
/*18*/	["#", "c", "c", "c", "c", "#", "c", "c", "c", "#", "c", "c", "c", "#", "c", "c", "c", "c", "#"],
/*19*/	["#", "c", "#", "#", "#", "#", "#", "#", "c", "#", "c", "#", "#", "#", "#", "#", "#", "c", "#"],
/*20*/	["#", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "#"],
/*21*/	["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],

	];

	
function pacMan (x, y) {
	stroke (250, 250, 5);
	strokeWeight (3);
	fill (230, 230, 0);
	arc (x, y, tamBloco, tamBloco, PI/6, 11*PI/6, PIE);
	strokeWeight (1);
	fill (0, 0, 0);
	ellipse (x, y - tamBloco/5, tamBloco/6, tamBloco/6);
}
	
//features nivel 1
	function colisao (px, py) {
	pColuna = Math.floor(px/tamBloco); 
	pLinha = Math.floor(py/tamBloco);
	
	if (cenario[pLinha][pColuna] == "#") {
		return true;
	}
	else {
		return false;
	}
}

function colisaocomidinha (cx, cy) {
	pColuna = Math.floor(cx/tamBloco); 
	pLinha = Math.floor(cy/tamBloco);
	
	if (cenario [pLinha][pColuna] == "c") {
		cenario [pLinha][pColuna] = "v";
		pontos++;
	}
}

function colisaobonus (bx, by) {
	pColuna = Math.floor(bx/tamBloco); 
	pLinha = Math.floor(by/tamBloco);
	
	if (cenario[pLinha][pColuna] == "b") {
		cenario [pLinha][pColuna] = "v";
		pontos+=100;
	}
}


//features nivel 2
	function colisao2 (px, py) {
	pColuna2 = Math.floor(px/tamBloco); 
	pLinha2 = Math.floor(py/tamBloco);
	
	if (cenario2[pLinha2][pColuna2] == "#") {
		return true;
	}
	else {
		return false;
	}
}

function colisaocomidinha2 (cx, cy) {
	pColuna2 = Math.floor(cx/tamBloco); 
	pLinha2 = Math.floor(cy/tamBloco);
	
	if (cenario2[pLinha2][pColuna2] == "c") {
		cenario2[pLinha2][pColuna2] = "v";
		pontos2++;
	}
}

function colisaobonus2 (bx, by) {
	pColuna2 = Math.floor(bx/tamBloco); 
	pLinha2 = Math.floor(by/tamBloco);
	
	if (cenario2 [pLinha2][pColuna2] == "b") {
		cenario2 [pLinha2][pColuna2] = "v";
		pontos2+=100;
	}
}

function setup () {
	createCanvas(canvasX, canvasY);
/*	mySound.setVolume(0.1);
	mySound.play();*/
	
	x = 190;
	y = 310;
	fx = 200;
	fy = 200;
	fx2 = 200;
	fy2 = 400;
	
	dfx = 2;
	dfy = 2;
	
	dfx2 = 2;
	dfy2 = 2;
	
}

function draw(){
	background(0)
	
	if(jogo_iniciou == false){
		fill(255,255,0);
		textSize(50);
		text ("Pac Man",100,60);
		textSize(10);
		fill(255,255,0);	

		text ("Game made by Amlira and BritoJuliano",100,400);
		textSize(25);
		text("Press ENTER to start ",80,220);
	}
	
	if(keyIsDown(ENTER)){
		tela = 1;
		jogo_iniciou  = true;
	}
	
	//Tela de jogo
	if(tela == 1){
		
		//contador da animação
		cont = cont + 1;
		if (cont > 11) {
		cont = 1;
		}

		background (0);
		
		//Gerar cenário
		for(j = 0; j < cenario.length; j++) {
			for(i = 0; i < cenario.length; i++) {
				
				//cenário
				if(cenario[i][j] == "#") {
					//if(pontos<200){
						fill(100,100,255);
						rect(j*tamBloco,i*tamBloco,tamBloco,tamBloco);
					//}
					/*if(pontos>200 && pontos<400){
						fill(199,20,133);
						rect(j*tamBloco,i*tamBloco,tamBloco,tamBloco);
					}
					if(pontos>=400){
						fill(75,0,130);
						rect(j*tamBloco,i*tamBloco,tamBloco,tamBloco);
					}*/					
				}

				//comidinha
				if(cenario[i][j] == "c") {
				fill(255,255,255);
				ellipse(j*tamBloco+tamBloco/2,i*tamBloco+tamBloco/2,5,5);
				}

				//bônus
				if(cenario[i][j] == "b") {
				image(img[cont],j*tamBloco+tamBloco/4,i*tamBloco+tamBloco/4);
				}
				
			}
		}
		
		//movimentos pacMan
		if (keyIsDown(LEFT_ARROW)) {
			if ( ! colisao (x - 4 - tamBloco/2, y)) {
				x = x - 4;       
			}
			colisaocomidinha (x - 4 - tamBloco/2, y);
			colisaobonus (x - 4 - tamBloco/2, y);
		}
		
		if (keyIsDown(RIGHT_ARROW)) {
			if ( ! colisao (x + 4 + tamBloco/2, y)) {
				x = x + 4;       
			}
			colisaocomidinha (x + 4 + tamBloco/2, y);
			colisaobonus (x + 4 + tamBloco/2, y);
		}
		
		if (keyIsDown (UP_ARROW)) {
			if ( ! colisao (x, y - 4 - tamBloco/2)){
				y = y - 4;
			}
			colisaocomidinha (x, y - 4 - tamBloco/2);
			colisaobonus (x, y - 4 - tamBloco/2);
		}
		
		if (keyIsDown (DOWN_ARROW)) {
			if ( ! colisao ( x, y + 4 + tamBloco/2)){
				y = y + 4
			}
			colisaocomidinha ( x, y + 4 + tamBloco/2);
			colisaobonus ( x, y + 4 + tamBloco/2);
		}
			
		//relacao do pacman com fim do espaço
		if ( x > 400) {
			x = 0;  
			y = 190;
		}
		if ( x < 0 ) {
			x = 400; 
			y = 190;
		}
			
			
		//movimentos fantasma
		fx = fx + dfx;
		fy = fy + dfy;

		//colisao fantasma
		if ( ! colisao (fx - 4 - tamBloco/2, fy)) {
			fx = fx - 4;
			dfx=-dfx;       
		}

		if ( ! colisao (fx + 4 + tamBloco/2, fy)) {
			fx = fx + 4;       
			dfx=-dfx;
		}
		if ( ! colisao (fx, fy - 4 - tamBloco/2)){
			fy = fy - 4;
			dfy=-dfy;
		}
		if ( ! colisao ( fx, fy + 4 + tamBloco/2)){
			fy = fy + 4;
			dfy=-dfy;
		}		

		//relacao do fantasma com fim do espaço
		if ( fx > 400) {
			fx = 0;  
			fy = 190;
		}
		if ( fx < 0 ) {
			fx = 400; 
			fy = 190;
		}
		
		//colisão entre pacMan e fantasma
		if (dist(x,y,fx,fy) < raio+tamBloco/2) {
				vidas--;
				x = 190;
				y = 310;
			
		}
		
		text("Vidas: "+vidas, 20, 450);
		text("Pontos: "+pontos, 240, 450);
		textSize(25);
		ellipse(fx, fy, 2*raio, 2*raio);
		pacMan(x, y);


		if(pontos == 680){
			tela=2;
		}

		if(vidas <= 0) {	 
			tela=4;
		}	
	}
	//fim do nível 1
	
	//Nível 2
	if(tela == 2){
		
		//contador da animação
		cont2 = cont2 + 1;
		if (cont2 > 11) {
		cont2 = 1;
		}

		background (0);
		//Gerar cenário
		for(k = 0; k < cenario2.length; k++) {
			for(l = 0; l < cenario2.length; l++) {
				//cenário
				if(cenario2[l][k] == "#") {
					/*if(pontos<200){
						fill(100,100,255);
						rect(k*tamBloco,l*tamBloco,tamBloco,tamBloco);
					}
					if(pontos>200 && pontos<400){
						fill(199,20,133);
						rect(k*tamBloco,l*tamBloco,tamBloco,tamBloco);
					}*/
					//if(pontos>=400){
						fill(75,0,130);
						rect(k*tamBloco,l*tamBloco,tamBloco,tamBloco);
					//}
				}
			
				//comidinhas
				if(cenario2[l][k] == "c") {
				fill(255,255,255);
				ellipse(k*tamBloco+tamBloco/2,l*tamBloco+tamBloco/2,5,5);
				}
				
				//bônus
				if(cenario2[l][k] == "b") {
				image(img[cont2],k*tamBloco+tamBloco/4,l*tamBloco+tamBloco/4);
				}
			}
		}
		
		//movimentos pacMan
		if (keyIsDown(LEFT_ARROW)) {
			if ( ! colisao2 (x - 4 - tamBloco/2, y)) {
				x = x - 4;       
			}
			colisaocomidinha2 (x - 4 - tamBloco/2, y);
			colisaobonus2 (x - 4 - tamBloco/2, y);
		}
		
		if (keyIsDown(RIGHT_ARROW)) {
			if ( ! colisao2 (x + 4 + tamBloco/2, y)) {
				x = x + 4;       
			}
			colisaocomidinha2 (x + 4 + tamBloco/2, y);
			colisaobonus2 (x + 4 + tamBloco/2, y);
		}
		
		if (keyIsDown (UP_ARROW)) {
			if ( ! colisao2 (x, y - 4 - tamBloco/2)){
				y = y - 4;
			}
			colisaocomidinha2 (x, y - 4 - tamBloco/2);
			colisaobonus2 (x, y - 4 - tamBloco/2);
		}
		
		if (keyIsDown (DOWN_ARROW)) {
			if ( ! colisao2 ( x, y + 4 + tamBloco/2)){
				y = y + 4
			}
			colisaocomidinha2 ( x, y + 4 + tamBloco/2);
			colisaobonus2 ( x, y + 4 + tamBloco/2);
		}
			
		//relacao do pacman com fim do espaço
		if ( x > 400) {
			x = 0;  
			y = 190;
		}
		if ( x < 0 ) {
			x = 400; 
			y = 190;
		}
			
			
		//movimentos fantasma
		fx = fx + dfx;
		fy = fy + dfy;

		//colisao fantasma
		if ( ! colisao2 (fx - 4 - tamBloco/2, fy)) {
			fx = fx - 4;
			dfx=-dfx;       
		}

		if ( ! colisao2 (fx + 4 + tamBloco/2, fy)) {
			fx = fx + 4;       
			dfx=-dfx;
		}
		if ( ! colisao2 (fx, fy - 4 - tamBloco/2)){
			fy = fy - 4;
			dfy=-dfy;
		}
		if ( ! colisao2 ( fx, fy + 4 + tamBloco/2)){
			fy = fy + 4;
			dfy=-dfy;
		}

		//movimentos fantasma 2
		fx2 = fx2 + dfx2;
		fy2 = fy2 + dfy2;

		//colisao fantasma
		if ( ! colisao2 (fx2 - 4 - tamBloco/2, fy2)) {
			fx2 = fx2 - 4;
			dfx2=-dfx2;       
		}

		if ( ! colisao2 (fx2 + 4 + tamBloco/2, fy2)) {
			fx2 = fx2 + 4;       
			dfx2=-dfx2;
		}
		if ( ! colisao2 (fx2, fy2 - 4 - tamBloco/2)){
			fy2 = fy2 - 4;
			dfy2=-dfy2;
		}
		if ( ! colisao2 ( fx2, fy2 + 4 + tamBloco/2)){
			fy2 = fy2 + 4;
			dfy2=-dfy2;
		}		

		//relacao do fantasma com fim do espaço
		if ( fx > 400) {
			fx = 0;  
			fy = 190;
		}
		if ( fx < 0 ) {
			fx = 400; 
			fy = 190;
		}
		
		//relacao do fantasma 2 com fim do espaço
		if ( fx2 > 400) {
			fx2 = 0;  
			fy2 = 190;
		}
		if ( fx2 < 0 ) {
			fx2 = 400; 
			fy2 = 190;
		}
		
		//colisão entre pacMan e fantasma
		if (dist(x,y,fx,fy) < raio+tamBloco/2) {
				vidas--;
				x = 190;
				y = 310;
			
		}
		
		//colisão entre pacMan e fantasma
		if (dist(x,y,fx2,fy2) < raio+tamBloco/2) {
				vidas--;
				x = 190;
				y = 310;
			
		}
		
		text("Vidas: "+vidas, 20, 450);
		text("Pontos: "+pontos2, 240, 450);
		textSize(25);
		ellipse(fx, fy, 2*raio, 2*raio);
		ellipse(fx2, fy2, 2*raio, 2*raio);
		pacMan(x, y);


		if(pontos2 == 779){
			tela=3;
		}

		if(vidas <= 0) {	 
			tela=4;
		}	
	}
	//fim do nível 2

	//Tela de derrota
	if (tela == 4){
		text("Game Over", 120, 230);
	}
	
	//tela de vitoria
	if (tela == 3){
		text("YOU WIN", 120, 230);
	}
}