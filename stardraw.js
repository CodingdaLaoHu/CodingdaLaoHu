let starCount = 300;
function showStar() {
  let bg = document.querySelector(".mask");
  for (var i = 0; i < starCount; i++) {
    let star = document.createElement("div");
    star.classList.add("star");
    bg.appendChild(star);
  }
}
function starPosition() {
  let allStar = document.querySelectorAll(".star");
  for (var i = 0; i < starCount; i++) {
    allStar[i].style.left = Math.random() * window.innerWidth + "px";
    allStar[i].style.top = Math.random() * window.innerHeight + "px";
    allStar[i].style.animationDelay = Math.random() * 10 + "s";
  }
}
function init() {
  let Meteor = document.querySelector("#meteor");
  Meteor.width = window.innerWidth;
  Meteor.height = window.innerHeight;
  context = Meteor.getContext("2d");
}
function MeteorRain() {
  this.x = Math.random() * window.innerWidth;
  this.y = Math.random() * window.innerHeight;
  this.length = Math.ceil(Math.random() * 80 + 150);
  this.angle = 20;
  this.cos = Math.cos((this.angle * 3.14) / 180);
  this.sin = Math.sin((this.angle * 3.14) / 180);
  this.width = this.length * this.cos;
  this.height = this.length * this.sin;
  this.speed = Math.ceil(Math.random() + 0.5);
  this.shifting_x = this.speed * this.cos;
  this.shiftion_y = this.speed * this.sin;
  this.coutPos = function () {
    this.x = this.x - this.shifting_x;
    this.y = this.y + this.shiftion_y;
  };
  this.draw = function () {
    context.save();
    context.beginPath();
    context.innerWidth = 1;
    context.globalAlpha = this.alpha;
    var line = context.createLinearGradient(
      this.x,
      this.y,
      this.x + this.width,
      this.y - this.height
    );
    line.addColorStop(0, "white");
    line.addColorStop(0.5, "grey");
    line.addColorStop(1.0, "black");
    context.strokeStyle = line;
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + this.width, this.y - this.height);
    context.closePath();
    context.stroke();
    context.restore();
  };
  this.move = function () {
    var x = this.x + this.width - this.shifting_x;
    var y = this.y - this.height + this.shiftion_y;
    context.clearRect(x - 3, y - 3, this.shifting_x + 5, this.shiftion_y + 5);
    this.coutPos();
    this.alpha -= 0.02;
    this.draw();
  };
}
function playRains() {
  for (var i = 0; i < rainCount; i++) {
    var rain = rains[i];
    rain.move();
    if (rain.y > window.innerHeight) {
      context.clearRect(rain.x, rain.y - rain.height, rain.width, rain.height);
      rains[i] = new MeteorRain();
    }
  }
  setTimeout("playRains()", 2);
}
var rainCount = 10;
var rains = new Array();

showStar();
starPosition();
init();
function showRain() {
  for (var i = 0; i < rainCount; i++) {
    var rain = new MeteorRain();
    rain.draw();
    rains.push(rain);
  }
}
showRain();
playRains();

// window.onresize = function () {
//   starPosition();
//   init();
// };
