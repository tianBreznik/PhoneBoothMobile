/*
VOICE MESSAGE HANDLING


!!!!!!!!!!!!!!!!!!!
IMPORTANT: za lažje testiranje se trenutno voice msg zacne on key down in ustavi on key up
DRŽI SPACE == IGRAJ MSG!
!!!!!!!!!!!!!!!!!!!


startVoiceMsg -> zance igrati sound. location doloci kasken sound bo igral
  - "start" -> navodila za uporabo govorilnice
  - "near" -> slovenski voice messagi
  - "far" -> angleški voice messagi

stopVoiceMsg -> ce poslusalec odlozi slusalko prehitro se pauzira voice msg z fadom

TODO:
- [ ] pogruntaj če bi kam dala voice messege, ki niso v slovenscini? ali jih sploh hocema?
- [ ] naredi array selection 0-exclusive in naj se potem shuffla zadnji selected thing vedno v 0-position
- [x] fadaj zvok, ko pauziras voice message //done ampak kinda shady
- [ ] testiraj performance na tablici
- [ ] vizualizacija/risanje vsakega zvocnega efekta
- [ ] menjaj space up/down tako kot mora bit
- [x] menjaj voice message na podlagi tega kje smo
*/

var voicePlaying = false;
var currentSound

function startVoiceMsg() {


  if (voicePlaying == false) {
    var location = getBipsiVar("location")
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
    currentSound.setVolume(1);
    currentSound.play();
  }
}

function stopVoiceMsg() {
  currentSound.pause();
  currentSound.setVolume(0, 0.5);
  setTimeout(() => { currentSound.pause() }, 500);

}

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

  //load eng sounds
  eng1 = loadSound('assets/eng/fer', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  eng2 = loadSound('assets/eng/lucas1', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  eng3 = loadSound('assets/eng/marie1', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  eng4 = loadSound('assets/eng/marie2', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  eng5 = loadSound('assets/eng/mathias1', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  eng6 = loadSound('assets/eng/rebecca', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  eng7 = loadSound('assets/eng/sarah1', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  eng8 = loadSound('assets/eng/sarah2', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  eng9 = loadSound('assets/eng/sarah3', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  eng10 = loadSound('assets/eng/simo1', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);

  engArray = [eng1, eng2, eng3, eng4, eng5, eng6, eng7, eng8, eng9, eng10]
}

function onSoundLoadSuccess(e) {
  console.log("load sound success", e);
  //e.play();
}
function onSoundLoadError(e) {
  console.log("load sound error", e);
}
function onSoundLoadProgress(e) {
  console.log("load sound progress", e);
}

function setup() {
  console.log("blabla")
  var canvas = createCanvas(canv_side, canv_side);
  var gui = createGui('Experimenting GUI');

  pos = createVector(1, 1)
  frameRate(20)

  s = min(width, height);

  //let fft = new p5.FFT();
  console.log(sound);
  //fft.setInput(sound);

  strokeWeight(5);
  //stroke(lineColor);
  stroke(255, 255, 0, 50);


  worldSetup();

  //sound playing stuff
}


function draw() {
  clear();
  worldDraw();



}



function keyPressed() {
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


// BRINOV WORKSPACE DONT TOUCH
function worldSetup() {

}


function worldDraw() {

}

