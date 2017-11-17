var x, y; // coordenadas pacMan
var fx, fy; // coordenadas fantasma

var dfx, dfy; // velocidade fantasma

var raio = 10; 

var canvasX = 380;
var canvasY = 460;

var tamBloco = 20;

var vidas = 3;
var pontos = 1;

var tela = 0;
var jogo_iniciou = false

var img = [];
var cont = 1;


// carregar imagem
function preload() {
	//img = loadImage("img40p.png");
	for(i = 1; i <= 11;i++){
		img[i] = loadImage("Imagens/img"+i+".png");
	}
}


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
/*12*/	["v", "v", "v", "#", "c", "#", "c", "c", "c", "c", "c", "c", "v", "#", "c", "#", "v", "v", "v"],
/*13*/	["#", "#", "#", "#", "c", "#", "c", "#", "#", "#", "#", "#", "c", "#", "c", "#", "#", "#", "#"],
/*14*/	["#", "c", "c", "c", "c", "c", "c", "c", "c", "#", "c", "c", "c", "c", "c", "c", "c", "c", "#"],
/*15*/	["#", "c", "#", "#", "c", "#", "#", "#", "c", "#", "c", "#", "#", "#", "c", "#", "#", "c", "#"],
/*16*/	["#", "c", "c", "#", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "#", "c", "b", "#"],
/*17*/	["#", "#", "c", "#", "c", "#", "c", "#", "#", "#", "#", "#", "c", "#", "c", "#", "c", "#", "#"],
/*18*/	["#", "b", "c", "c", "c", "#", "c", "c", "c", "#", "c", "c", "c", "#", "c", "c", "c", "c", "#"],
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
	
	if (cenario[pLinha][pColuna] == "c") {
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
	
function setup () {
	createCanvas(canvasX, canvasY);
	x = 190;
	y = 310;
	fx = 200;
	fy = 200;
	
	dfx = 2;
	dfy = 2;
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
		
	background (0);
		//Gerar cenário
		for(j = 0; j < cenario.length; j++) {
			for(i = 0; i < cenario.length; i++) {
				if(cenario[i][j] == "#") {
					//image(img, j*tamBloco, i*tamBloco);
					if(pontos<200){
						fill(100,100,255);
						rect(j*tamBloco,i*tamBloco,tamBloco,tamBloco);
					}
					if(pontos>200 && pontos<400){
						fill(199,20,133);
						rect(j*tamBloco,i*tamBloco,tamBloco,tamBloco);
					}
					if(pontos>=400){
						fill(75,0,130);
						rect(j*tamBloco,i*tamBloco,tamBloco,tamBloco);
					}
				}
			}
		}

		//comidinhas
		for(j = 0; j < cenario.length; j++) {
			for(i = 0; i < cenario.length; i++) {
				if(cenario[i][j] == "c") {
					fill(255,255,255);
					ellipse(j*tamBloco+tamBloco/2,i*tamBloco+tamBloco/2,5,5);
				}		
			}
		}
		
		//contador da animação
		cont = cont + 1;
		if (cont > 11) {
			cont = 1;
		}
		
		//bonus
		for(j = 0; j < cenario.length; j++) {
			for(i = 0; i < cenario.length; i++) {
				if(cenario[i][j] == "b") {
					/*fill(199,21,133);
					ellipse(j*tamBloco+tamBloco/2,i*tamBloco+tamBloco/2,10,10);*/
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
			tela=3;
		}

		if(vidas <= 0) {	 
			tela=4;
		}	
	}

	//Tela de derrota
	if (tela == 4){
		text("Game Over", 120, 230);
	}
	
	//tela de vitoria
	if (tela == 3){
		text("YOU WIN", 120, 230);
	}
}