var x = 100;
var y = 100;
var posX, posY;
var tamBloco = 40;
var img;
var cenario = [];


function setup() {
	createCanvas(400, 400);
	posX = 0;
	posY = 200;
}

cenario = [
	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"],
	["#", "v", "v", "v", "v", "v", "v", "v", "v", "#"]
	
	]; 

// carregar imagem
function preload() {
  img = loadImage("img.png");
}

//Gerar cenário
for(j = 0; j < cenario.length; j++) {
	for(i = 0; i < cenario.length; i++) {
		if(cenario[j][i] == "#") {
			image(img, j*40, i*40);
		}
	}
}
  
function draw() { 

	background(105,105,105);
	/* if (keyIsDown(LEFT_ARROW))
	x-=5;

	if (keyIsDown(RIGHT_ARROW))
	x+=5;

	if (keyIsDown(UP_ARROW))
	y-=5;

	if (keyIsDown(DOWN_ARROW))
	y+=5;

	ellipse(x, y, 50, 50);
  
	if (posX < 640){
		posX = posX + 15;
	}
	else{
		posX = 0;
	}
	rect(posX, posY, 50, 50); */
	

}
