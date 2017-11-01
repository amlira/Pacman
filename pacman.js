var px = 380; //x do pacman
var py = 620; //y do pacman
var posX, posY; //x e y do quadrado
var pColuna;
var pLinha;
var tamBloco = 40;
var img;
var colisao = false;
var canvasX = 780;
var canvasY = 840;

cenario = [
//		["1", "2", "3", "4", "5", "6", "7", "8", "9", "1", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
/*1*/	["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
/*2*/	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
/*3*/	["#", "v", "#", "#", "v", "#", "#", "#", "v", "#", "v", "#", "#", "#", "v", "#", "#", "v", "#"],
/*4*/	["#", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
/*5*/	["#", "v", "#", "#", "v", "#", "v", "#", "#", "#", "#", "#", "v", "#", "v", "#", "#", "v", "#"],
/*6*/	["#", "v", "v", "v", "v", "#", "v", "v", "v", "#", "v", "v", "v", "#", "v", "v", "v", "v", "#"],
/*7*/	["#", "#", "#", "#", "v", "#", "#", "#", "v", "#", "v", "#", "#", "#", "v", "#", "#", "#", "#"],
/*8*/	["v", "v", "v", "#", "v", "#", "v", "v", "v", "v", "v", "v", "v", "#", "v", "#", "v", "v", "#"],
/*9*/	["#", "#", "#", "#", "v", "#", "v", "#", "#", "#", "#", "#", "v", "#", "v", "#", "#", "#", "#"],
/*10*/	["v", "v", "v", "v", "v", "v", "v", "#", "v", "v", "v", "#", "v", "v", "v", "v", "v", "v", "#"],
/*11*/	["#", "#", "#", "#", "v", "#", "v", "#", "#", "#", "#", "#", "v", "#", "v", "#", "#", "#", "#"],
/*12*/	["v", "v", "v", "#", "v", "#", "v", "v", "v", "v", "v", "v", "v", "#", "v", "#", "v", "v", "#"],
/*13*/	["#", "#", "#", "#", "v", "#", "v", "#", "#", "#", "#", "#", "v", "#", "v", "#", "#", "#", "#"],
/*14*/	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
/*15*/	["#", "v", "#", "#", "v", "#", "#", "#", "v", "#", "v", "#", "#", "#", "v", "#", "#", "#", "#"],
/*16*/	["#", "v", "v", "#", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "#", "v", "v", "#"],
/*17*/	["#", "#", "v", "#", "v", "#", "v", "#", "#", "#", "#", "#", "v", "#", "v", "#", "v", "v", "#"],
/*18*/	["#", "v", "v", "v", "v", "#", "v", "v", "v", "#", "v", "v", "v", "#", "v", "v", "v", "v", "#"],
/*19*/	["#", "v", "#", "#", "#", "#", "#", "#", "v", "#", "v", "#", "#", "#", "#", "#", "#", "#", "#"],
/*20*/	["#", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
/*21*/	["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
	
	
	];
	
// carregar imagem
function preload() {
  img = loadImage("img.png");
}
 
function setup() {
	createCanvas(canvasX, canvasY);
	posX = 0;
	posY = 200;
}
  
function draw() { 

	background(0);
	
	//Gerar cenário
	for(j = 0; j < cenario.length; j++) {
		for(i = 0; i < cenario.length; i++) {
			if(cenario[i][j] == "#") {
				image(img, j*tamBloco, i*tamBloco);
			}
		}
	}
	
	//movimentos do pacman
	if (keyIsDown(LEFT_ARROW))
	px-=4;

	if (keyIsDown(RIGHT_ARROW))
	px+=4;

	if (keyIsDown(UP_ARROW))
	py-=4;

	if (keyIsDown(DOWN_ARROW))
	py+=4;

	// ellipse(px, py, 40, 40); //imagem do pacman sem boca
	arc(px, py, 40, 40, PI/6, 11*PI/6, PIE); //imagem do pacman com boca	  
	
/*	//movimentos quadrado
	if (posX < 400){
		posX = posX + 15;
	}
	else{
		posX = 0;
	} 
	rect(posX, posY, 40, 40);*/

	
	// inicio de todas as colisões
	function colisao () {
		pColuna = Math.floor(px/tamBloco); 
		pLinha = Math.floor(py/tamBloco);
		
		if (cenario[pLinha][pColuna] == "#") {
			return true;
		}
		else {
			return false;
		}
	}
		
	if (keyIsDown(LEFT_ARROW)) {
		if (colisao (pColuna, pLinha)){
			px=px+4
		}
	}
	
	if (keyIsDown (RIGHT_ARROW)) {
		if (colisao (pColuna-1, pLinha-1)){
			px=px-4
		}
	}
	
	if (keyIsDown (UP_ARROW)) {
		if (colisao (pColuna, pLinha)){
			py=py+4
		}
	}
	
	if (keyIsDown (DOWN_ARROW)) {
		if (colisao (pColuna, pLinha)){
			py=py-4
		}
	}
	//inicio colisao com limite do espaço
	//limite em x do espaço
	if (px > canvasX) {
		px = 0;
	}
	
	if (px < 0) {
		px = canvasX;
	}

	//limite em y do espaço. O pac não está voltando para o outro lado
/*	if (py > 400) {
		py = 0;
	}
	
	if (py < 0) {
		py = 400;
	}*/
	
	//fim colisao
}
