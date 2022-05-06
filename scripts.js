const rVideo = document.getElementById("clouds");
if (rVideo) {
  rVideo.pause();
  rVideo
    .play()
    .then((res) => {
      console.log("playing start", res);
    })
    .catch((err) => {
      console.log("error playing", err);
    });
}



let n = 0;
let a, c;
let palette = ["#edb92e", "#c6363c", "#a12d2e", "#0c4076", "#644a3a"];
let pg;
let s;
let pgFrame;
let bgColor, lineColor;


let nx = 0.0;
let ny = 0.0;
let nz = 0.0;

// gui test
var fldSize = 12;
//let fldColor = color(255, 0, 0);
var piMult = 7;
var ampMultX = 80;
var ampMultY = 80;
var oscTempo = 0.05;

let canv_side = 512;
let mySound;

function preload() {
  console.log("preloading")
  soundFormats('m4a');
  mySound = loadSound('assets/mariemubi');
}

function setup() {
  console.log("blabla")
  var canvas = createCanvas(canv_side, canv_side);
  var gui = createGui('Experimenting GUI');

  frameRate(20)
  gui.setPosition(2.15 * width, 25);
  sliderRange(1, 14, 1);
  gui.addGlobals('fldSize');
  sliderRange(0.5, 12, 0.5);
  gui.addGlobals('piMult');
  sliderRange(0.0, 100, 10);
  gui.addGlobals('ampMultX');
  sliderRange(0.0, 100, 10);
  gui.addGlobals('ampMultY');
  sliderRange(0.0, 1, 0.005);
  gui.addGlobals('oscTempo');
  console.log(canvas);
  canvas.parent("content");
  imageMode(CENTER);

  shuffle(palette, true);

  bgColor = palette[0];
  lineColor = palette[1];

  s = min(width, height);
  //pg = createGraphics(400, 400);

  //pgFrame = createGraphics(width, height);
  //pgFrame.background(bgColor);
  //pgFrame.erase();
  //pgFrame.square(25, 25, s * 0.9);
  //pgFrame.noErase();

  strokeWeight(5);
  //stroke(lineColor);
  stroke(255, 255, 0, 50);
  noFill();
  mySound.play();
}

function draw() {

  //pg.loadPixels();
  background(38, 13, 89, 50);

  drawStream();
  // for (let i = 0; i < pg.width; i++) {
  //   for (let j = 0; j < pg.height; j++) {
  //     n = noise(0.01002503 * i + mouseX/1000, 0.01003463 * j + mouseY/1000);
  //     a = map(n + frameCount * 0.0005, 0, 1, 0, 100);
  //     c = palette[floor(a % 13) % palette.length];
  //     pg.set(i, j, color(c));
  //   }
  // }
  //pg.updatePixels();

  //image(pg, width / 2, height / 2, s, s);

  //image(pgFrame, width / 2, height / 2);

  square(25, 25, s * 0.9);
}

//TODO: dodaj tracking za to v kateri sobi je igralec
function getBipsiVar(varname) {
  const bipsi = document.getElementById("bipsi").contentWindow
  console.log(bipsi)

  console.log("Fetching variable of name: ", varname)

  var r = bipsi.PLAYBACK.variables.get(varname)
  console.log("VALUE OF ", varname, " IS: ", r)
  return r
}

//second experiment - lines
function drawStream() {
  nx = 0;
  var loc_i = 0;
  for (let i = 0; i < canv_side / 3; i += fldSize) {
    ny = 0;
    var loc_j = 0;
    for (let j = 0; j < canv_side / 3; j += fldSize) {
      var angle = map(noise(nx, ny, nz), 0, 2.0, 0, piMult * PI);
      var x = ampMultX * cos(angle);
      var y = ampMultY * sin(angle);
      line(loc_i + 55, loc_j + 55, loc_i + 55 + x, loc_j + 55 + y);
      ny += 0.03;

      //gradient
      //var c = map(angle, 0, PI, 0, TWO_PI)
      //stroke(c,50,80);
      loc_j += fldSize + 15;
    }
    nx += 0.02;
    loc_i += fldSize + 15;
  }
  nz += oscTempo; //tempo
}