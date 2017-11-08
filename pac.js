var x, y; // coordenadas pacMan
var fx, fy; // coordenadas fantasma

var dfx, dfy; // velocidade fantasma

var raio = 20; 

var canvasX = 400;
var canvasY = 440;

var tamBloco = 40;

var trocouCor = false;
var corBranco = true;

var vidas = 3;
var pontos = 0;


// carregar imagem
function preload() {
  //img = loadImage("img40p.png");
}

 cenario = [
 	["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
 	["#", "v", "v", "v", "#", "v", "v", "v", "v", "#"],
 	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
 	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
 	["v", "v", "v", "v", "v", "v", "v", "v", "v", "v"],
 	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
 	["#", "v", "v", "v", "v", "#", "v", "v", "v", "#"],
 	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
 	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
 	["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"]
 	
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
	
	if (cenario[pLinha][pColuna] == "v") {
		return true;
	}
	else {
		return false;
	}
}
	
function setup () {
	createCanvas(canvasX, canvasY);
	x = 100;
	y = 100;
	fx = 200;
	fy = 200;
	
	dfx = 5 //random (-5, 5);
	dfy = 0 //random (-5, 5);
}
	
function draw () {
	background (0);
	if(vidas != 0) {	
		//Gerar cenário
		for(j = 0; j < cenario.length; j++) {
			for(i = 0; i < cenario.length; i++) {
				if(cenario[i][j] == "#") {
					//image(img, j*tamBloco, i*tamBloco);
					fill(100,100,255);
					rect(j*tamBloco,i*tamBloco,tamBloco,tamBloco);
				}
			}
		}
		
		//comidinhas
		for(j = 0; j < cenario.length; j++) {
			for(i = 0; i < cenario.length; i++) {
				if(cenario[i][j] == "v") {
					//image(img, j*tamBloco, i*tamBloco);
					fill(255,255,255);
					ellipse(j*tamBloco+tamBloco/2,i*tamBloco+tamBloco/2,10,10);
					//comidinha = true;
				}
				
			}
		}
			
		//movimentos fantasma
		fx = fx + dfx;
		fy = fy + dfy;
		
		//movimentos pacMan
		if (keyIsDown(LEFT_ARROW)) {
			if ( ! colisao (x - 4 - tamBloco/2, y)) {
				x = x - 4;       
			}
			if(colisaocomidinha) {
				pontos++; 
			}
		}
		
		if (keyIsDown(RIGHT_ARROW)) {
			if ( ! colisao (x + 4 + tamBloco/2, y)) {
				x = x + 4;       
			}
			if(colisaocomidinha) {
				pontos++; 
			}
		}
		
		if (keyIsDown (UP_ARROW)) {
			if ( ! colisao (x, y - 4 - tamBloco/2)){
				y = y - 4;
			}
			if(colisaocomidinha) {
				pontos++; 
			}
		}
		
		if (keyIsDown (DOWN_ARROW)) {
			if ( ! colisao ( x, y + 4 + tamBloco/2)){
				y = y + 4
			}
			if(colisaocomidinha) {
				pontos++; 
			}
		}
		
		//relacao do fantasma com fim do espaço
		if ( fx > 400) {
			fx = 0;   
		}
		if ( fy > 400) {
			fy = 0;   
		}
		if ( fx < 0 ) {
			fx = 400;   
		}
		if ( fy < 0 ) {
			fy = 400;  
		}
		
		//colisão entre pacMan e fantasma
		if (dist(x,y,fx,fy) < raio+tamBloco/2) {
			if ( trocouCor == false) { 
				corBranco = ! corBranco;
				trocouCor = true;
				vidas--;
			}
		}
		else {
			trocouCor = false;  
		}
		
		if ( corBranco ) {
			fill(255);
		}	
		else {
			fill(255,0,0);
		}
			
		text("Vidas: "+vidas, 20, 430);
		text("Pontos: "+pontos, 240, 430);
		textSize(25);
		ellipse(fx, fy, 2*raio, 2*raio);
		pacMan(x, y);
	}
	else {
	text("Game Over", 150, 200);
	}
}
