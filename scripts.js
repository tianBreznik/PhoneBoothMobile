/*
VOICE MESSAGE HANDLING


!!!!!!!!!!!!!!!!!!!
IMPORTANT: za lažje testiranje se trenutno voice msg zacne on key down in ustavi on key up!
DRŽI SPACE == IGRAJ MSG!
!!!!!!!!!!!!!!!!!!!


startVoiceMsg -> zance igrati sound. location doloci kasken sound bo igral
  - "start" -> navodila za uporabo govorilnice
  - "near" -> slovenski voice messagi
  - "far" -> angleški voice messagi

stopVoiceMsg -> ce poslusalec odlozi slusalko prehitro se pauzira voice msg z fadom

  TODO: pogruntaj če bi kam dala voice messege, ki niso v slovenscini? ali jih sploh hocema?

*/

var voicePlaying = false;
var currentSound

function startVoiceMsg(location = "start") {
  if (voicePlaying == false) {
    console.log("voice msg was started")
    voicePlaying = true;

    console.log("Location is ", location)

    //zberi pravilen sound
    if (location == "start") {
      currentSound = startSound
    } else if (location == "near")
      currentSound = random(sloArray)
    else if (location == "far")
      currentSound = random(engArray)


    // začni igrait current sound
    //currentSound.setVolume(1);
    currentSound.play();
  }
}

function stopVoiceMsg() {
  if (voicePlaying == true) {
    console.log("voice msg was stopped")
    voicePlaying = false;

    currentSound.pause();

  }
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

//SOUNDS
let startSound;

let slo1, slo2, slo3, slo4, slo5, slo6, slo7;
let sloArray;

let eng1, eng2, eng3, eng4, eng5, eng6, eng7, eng8, eng9, eng10, eng11, eng12;
let engArray;

function preload() {
  console.log("preloading")
  soundFormats('mp3');

  startSound = loadSound('assets/start', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  //load slo sounds
  slo1 = loadSound('assets/slo/eva1', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  slo2 = loadSound('assets/slo/eva2', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  slo3 = loadSound('assets/slo/eva3', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  slo4 = loadSound('assets/slo/luka1', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  slo5 = loadSound('assets/slo/luka2', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);

  sloArray = [slo1, slo2, slo3, slo4, slo5]
  //load eng sounds

}

function onSoundLoadSuccess(e) {
  //console.log("load sound success", e);
}
function onSoundLoadError(e) {
  console.log("load sound error", e);
}
function onSoundLoadProgress(e) {
  //console.log("load sound progress", e);
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

  strokeWeight(5);
  //stroke(lineColor);
  stroke(255, 255, 0, 50);
  noFill();


  //sound playing stuff
}

function draw() {

  //pg.loadPixels();
  //background(38, 13, 89, 50);

  //drawStream();
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

  circle(256, 256, 300)
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

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
    console.log("playing");
  }
}