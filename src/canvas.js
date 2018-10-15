// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#18A3CC', '#346DDE', '#6F59E0', '#0E48BB'];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

var minLength = 2;

// Objects
function Particle(x,y,dx,dy,length,color){
  //setting object variables
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.length = length;
  this.color = color;

  //function to be ran every frame in animate function
  this.update = function() {
    if(this.x - this.length/2 < 0) {
      this.x = Math.random() * (innerWidth - (400 * dx)) - (length * 2) + length;
      this.y = 0;
    }
    if(this.y + this.length/2 > innerHeight) {
      this.x = Math.random() * (innerWidth - (400 * dx)) - (length * 2) + length;
      this.y = 0;
    }
    this.y += this.dy;
    this.x += this.dx;

    this.draw();
  }

  // draws the object
  this.draw = function(){
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(this.x + this.dx, this.y + this.length); //this controls how the rain looks in relation to how it falls
    c.strokeStyle = this.color;
    c.stroke();
  }
}

// Implementation
let particles;
function init() {
    particles = [];

    for(var i = 0; i < 500; i++){
      // var color = colorArray[Math.floor(Math.random() * colorArray.length)];
      var color = 'black';
      var length = ((Math.random() * 5 + minLength) * 2);
      var x = Math.random() * (innerWidth - (length * 2)) + length*2;
      var y = Math.random() * (innerHeight - (length)) + length;
      var dx = -3;
      var dy = 8;
      // var dy = ((Math.random()+1) * 4);
      particles.push(new Particle(x,y,dx,dy,length,color))
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    //Trail effect
    c.fillStyle = 'rgba(255, 255, 255, 0.25)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
     particle.update();
    });
}

init();
animate();
