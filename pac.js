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

//variaveis para gerar varios objetos
var vx = []; 
var vy = [];
var vdx = []
var vdy = []
var qt = 10;
var vtam = 40;


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
	
function setup () {
	createCanvas(canvasX, canvasY);
	x = 100;
	y = 100;
	fx = 200;
	fy = 200;
	
	dfx = 5 //random (-5, 5);
	dfy = 0 //random (-5, 5);
	
	//gerar varios objetos
	for ( i = 0; i < qt; i++) { 
		vx[i] = random(0,canvasY); 
		vy[i] = random(0,canvasY);
		vdx[i] = random(-6,6);
		vdy[i] = random(-6,6);
	}
}
	
function draw () {
	background (0);
	
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
	
	//movimentos fantasma
	fx = fx + dfx;
	fy = fy + dfy;
	
	//movimentos pacMan
	if (keyIsDown(LEFT_ARROW)) {
		if ( ! colisao (x - 4 - tamBloco/2, y)) {
			x = x - 4;       
		}
	}
	
	if (keyIsDown(RIGHT_ARROW)) {
		if ( ! colisao (x + 4 + tamBloco/2, y)) {
			x = x + 4;       
		}
	}
	
	if (keyIsDown (UP_ARROW)) {
		if ( ! colisao (x, y - 4 - tamBloco/2)){
			y = y - 4;
		}
	}
	
	if (keyIsDown (DOWN_ARROW)) {
		if ( ! colisao ( x, y + 4 + tamBloco/2)){
			y = y + 4
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
	if ( dist(x,y,fx,fx) < raio+tamBloco/2 ) {
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
	
	for ( i = 0; i < qt; i++) {
		vx[i] = vx[i] + vdx[i];
		vy[i] = vy[i] + vdy[i];
		//bater na parede e volta
		if ( vy[i] > height || vy[i] < 0 ) {
			vdy[i] = -vdy[i]; 
      
		}
		if ( vx[i] > width || vx[i] < 0 ) {
			vdx[i] = -vdx[i]; 
      
		}
    	ellipse(vx[i],vy[i],vtam,vtam); 
	}

		
	text("Vidas: "+vidas, 20, 430);
	text("Pontos: "+pontos, 240, 430);
	textSize(25);
	fill(255, 255, 255)
	ellipse(fx, fy, 2*raio, 2*raio);
	pacMan(x, y);
}
