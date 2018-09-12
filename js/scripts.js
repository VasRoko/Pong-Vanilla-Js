"use strict";
//******************
// Variables
//******************
var c = document.getElementById("sCanvas");
var ctx = sCanvas.getContext("2d");
var cHeight = sCanvas.height;
var cWidth = sCanvas.width;
var img = new Image();
var singlePlayer = false;
var sound = new Audio('assets/people-cheering.mp3');
var changedirection = false; //
var score1 = 0;  // for score board
var score2 = 0;  // for score board

var singlePlayerButton = document.getElementById('singlePlayer');

function singlePlayerMode() {
    singlePlayer = !singlePlayer;

    if(singlePlayer) {
        singlePlayerButton.innerHTML = 'Single Player';
    } else {
        singlePlayerButton.innerHTML = 'Two Players';
    }
}
      
//******************
//Objects
//******************
 //create paddle object
class Paddle{
        constructor(x,y){
            this.xPos = 750;
            this.yPos = 150;
            this.cHeight = 130;
            this.cWidth = 30;
            this.colour = "red";
            this.speed = 7;
        }

        drawMe(){
            
            ctx.beginPath();
            ctx.rect( this.xPos,this.yPos,this.cWidth,this.cHeight);
            ctx.fillStyle = this.colour;
            ctx.fill();
        }
    } // end paddle object

class PaddleComputer {
        constructor(x,y){
            this.xPos = 25;
            this.yPos = 150;
            this.cHeight = 130;
            this.cWidth = 30;
            this.colour = "blue";
            this.speed = 7;
        }

        drawMe(){
            ctx.beginPath();
            ctx.rect( this.xPos,this.yPos,this.cWidth,this.cHeight);
            ctx.fillStyle = this.colour;
            ctx.fill();
        }

    } // end paddle object

//create the sphere object
class Sphere {
    constructor() {
            this.radius = (10);
            this.colour = "white";
            this.xPos = 400;
            this.yPos = 230;
            this.speedY = 0;
            this.speedX = 0;
        }
       
    drawMe() {
        //method to draw itself
        ctx.drawImage(img, 30, 20);
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = this.colour;
        ctx.fill();

      
    }
    //method to move itself
    moveMe(){
        this.yPos += this.speedY;
        this.xPos += this.speedX;

                //bounce off the bottom wall
        if (this.yPos > cHeight-this.radius){
            this.speedY = - this.speedY;
        }           //bounce off the top wall
        else if(this.yPos<0+this.radius){
            this.speedY= -this.speedY;
        }

    //stop ball if hit right side
     if (this.xPos >cWidth){
            this.speedX =0;
            this.speedY =0;
            this.xPos = cWidth;
            score1++;
            sound.play();
            }
    else if (this.xPos < 0)
        {
            this.speedX = 0;
            this.speedY = 0;
            this.xPos = cWidth;
            score2++;
            sound.play();
         }      
            //bounce off player 2 paddle
    if (this.xPos > player1.xPos && (this.yPos > player1.yPos && this.yPos < (player1.yPos + player1.cHeight)) ){
                 this.speedX = -this.speedX;
            }

    if (this.xPos < (player2.xPos + player2.cWidth) && this.yPos > player2.yPos && this.yPos < (player2.yPos + player2.cHeight)){
                 this.speedX = -this.speedX;
            }

        }//end moveMe function
    }// end Sphere object

//******************
// create game objects
//******************

    var ball = new Sphere();
    var player1 = new Paddle();
    var player2 = new PaddleComputer();
   

    //*********************
    // Deal with key presses
    // **********************

    var keysDown = []; //empty array to store which keys are being held down


window.addEventListener("keydown", function (event) {
   keysDown[event.keyCode] = true; //store the code for the key being pressed
});

window.addEventListener("keyup", function (event) {
 delete  keysDown[event.keyCode] ;
});

function checkKeys() {

   if (keysDown[38]) {
        if(player1.yPos > 0){
            player1.yPos -= player1.speed; //up key

        }
    }
     
    else if (keysDown[40]) {
        if(player1.yPos < cHeight){
            player1.yPos += player1.speed; //down key
         }
    }
 
    if(!singlePlayer)
    {
        if(ball.yPos > player2.yPos && ball.speedX != 0 ) {

            player2.yPos += player2.speed * 1;

        } else if (ball.yPos < player2.yPos && ball.speedX != 0) {

            player2.yPos -= player2.speed * 1;
        
        }

    } else {
        if (keysDown[87]) {
            if(player2.yPos > 0){
                player2.yPos -= player2.speed; //w
            }
        }
        else if (keysDown[83]) {
            if(player2.yPos < cHeight){
                player2.yPos += player2.speed; //s
            }
        } 
    
    }
} 

    function winner() 
    {
        var winner = '';
        var StartButton = document.getElementById('startGame');

        if(score1 == 10)
        {   
            StartButton.setAttribute("disabled", false);

            if(!singlePlayer)
            {
                winner = 'You !*** Lost ***!';
            } else {
                winner = 'PLAYER 2 is the'  + ' !*** WINNER ***!';
            }
        }
        else if (score2 == 2)
        {
            StartButton.setAttribute("disabled", false);
            if(singlePlayer)
            {
                winner = 'PLAYER 1 is the !*** WINNER ***!';
            } 
        } 
        else 
        {
            StartButton.removeAttribute("disabled");
        } 

        ctx.font = "50px Ariel"
        ctx.fillStyle = "White"

        ctx.fillText(winner, 100, 250);
    }

    //*********************
    // Make the score board
    // **********************
    function scoreBoard() 
    {
        ctx.font = "60px Ariel"
        ctx.fillStyle = "White"
        ctx.fillText(score1, 355,170);
        ctx.fillText(score2, 415,170);
    }
    //*********************
    // launch the ball from the centre, left and right, on function "generate ball"
    // **********************

    function ballStart() 
    {
        ball.xPos = 400;
        ball.yPos = 230;
        ball.speedY = 5 + 5 * Math.random();
        ball.speedX = 5 + 5 * Math.random();

        changedirection = true * Math.random;
    }   
function render() {

    requestAnimationFrame(render);
    ctx.clearRect(0, 0, cWidth, cHeight);
    ball.drawMe();
    ball.moveMe();
    player1.drawMe();
    player2.drawMe();
    checkKeys();
    scoreBoard();
    winner(); 

    if ((player1.yPos + player1.cHeight) > cHeight)
    {
       player1.yPos -= player1.speed;
    }
    
    if ((player2.yPos + player2.cHeight) > cHeight)
    {
       player2.yPos -= player2.speed;
    }
}
function reload()
{
    location.reload();
}

render();