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

// VOICE STUFF
//#region SOUND
var voicePlaying = false;
var currentSound;
let graphics;
var stroke_col = "#" + Math.floor(Math.random() * 16777215).toString(16);
var stroke_width;
var perturbation_x;
var perturbation_y;
var new_low = 200;
var new_high = 230;
var neg = -1;


var sloNum = 0
var engNum = 0
var otherNum = 0
function startVoiceMsg() {

  if (voicePlaying == false) {

    console.log("voice msg was started")
//     voicePlaying = true;
    stroke_width = map(Math.random(), 0, 1, 1, 8);
    stroke_col = "#" + Math.floor(Math.random() * 16777215).toString(16);
    perturbation_x = map(Math.random(), 0, 1, -150, 100);
    perturbation_y = map(Math.random(), 0, 1, -200, 100);
    prev_vol = null;
    new_low = map(Math.random(), 0, 1, 10, 100);
    new_high = map(Math.random(), 0, 1, 50, 300);
    pdy = map(Math.random(), 0, 1, 0, 0.1);
    neg = Math.random() < 0.5 ? -1 : 1;
    console.log(neg);
    noiseSeed(map(Math.random(), 0, 1, 1, 99));

    console.log("Location is ", location)
    console.log("Distance is ", distance)

    //zberi pravilen sound
    if (distance == 0) {
      currentSound = startSound
      htmlEnergy("slo")
    }
    else if (distance < 2) {
      currentSound = sloArray[sloNum % sloArray.length] //random(sloArray)
      if (typeof currentSound != "string")
        sloNum += 1;
      htmlEnergy("slo")
    }
    else if (distance < 3) {
      currentSound = engArray[engNum % engArray.length]
      if (typeof currentSound != "string")
        engNum += 1;
      htmlEnergy("eng")
    }
    else if (distance <= 4) {
      currentSound = otherArray[otherNum % otherArray.length]
      if (typeof currentSound != "string")
        otherNum += 1
      htmlEnergy("other")
    }

    if (typeof currentSound == "string") {
      console.error("This should've been loaded!!!", currentSound)
      cs = getCurrentScreenSound();

      // Load next sound on this screen
      if (!cs.static)
        f_loadSound(cs.array, cs.num);
      
    } else {
      console.debug("Trying to play", currentSound)
    }

    if (currentSound._ready) {

      // začni igrait current sound
      currentSound.setVolume(1);
      currentSound.play();
      voicePlaying = true;
    } else {
      console.error("Not ready", currentSound)
    }

  }
}


Number.prototype.mod = function(n) {
  return ((this%n)+n)%n;
};

function stopVoiceMsg() {
  if (voicePlaying) {
    voicePlaying = false;
    currentSound.setVolume(0, 0.3);

    cs = getCurrentScreenSound();

    // Load next sound on this screen
    if (!cs.static)
      f_loadSound(cs.array, cs.num);

    setTimeout(() => {
      currentSound.pause()
      
      // Unload the sound we just stopped
      if (!cs.static)
        f_unloadSound(cs.array, (cs.num - 1).mod(cs.array.length));
      
    }, 500);
  }

}

function getCurrentScreenSound() {
  let sound = {};
  if (distance == 0) {
    // startSound
    sound.static = true;
  }
  else if (distance < 2) {
    sound.array = sloArray;
    sound.num = sloNum % sloArray.length;
  }
  else if (distance < 3) {
    sound.array = engArray;
    sound.num = engNum % engArray.length;
  }
  else if (distance <= 4) {
    sound.array = otherArray;
    sound.num = otherNum % otherArray.length;
  } else {
    // This really shouldn't happen
    sound.static = true;
  }
  return sound;
}

function f_loadSound(soundArray, arrayPos) {
  console.debug("Loading ", soundArray[arrayPos])
  if (typeof soundArray[arrayPos] != "string") return;

  soundArray[arrayPos] = loadSound(soundArray[arrayPos], onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);
  soundArray[arrayPos]._ready = false;
}

function f_unloadSound(soundArray, arrayPos) {
  console.debug("Unloading ", soundArray[arrayPos])
  if (typeof soundArray[arrayPos] == "string") return;

  if (soundArray[arrayPos]._ready) {
    soundArray[arrayPos].dispose();
    soundArray[arrayPos] = soundArray[arrayPos].url;  
  } else 
    soundArray[arrayPos]._disposeLater = [soundArray, arrayPos];
  
}


var sloEnergy = "ta umetnina deluje zaradi HTML energije"
var engEnergy = "this art piece operates on HTML energy"
var otherEnergy = ["esta obra de arte funciona con energía html", "kunststykket er drevet med HTML energi", "quest'opera d'arte è alimentata a energia HTML", "et art fonctionne sur l'énergie html", "diese kunst wird mit HTML energie betrieben", "essa obra de arte opera utilizando a energia HTML", "这个艺术作品依靠HTML给的能量运行", "šitas meno kūrinys važiuoja ant html energijos"]

function htmlEnergy(type = "slo") {
  var energy = document.getElementById("energy")
  if (type == "slo")
    energy.innerHTML = sloEnergy
  else if (type == "eng")
    energy.innerHTML = sloEnergy
  else if (type == "other")
    energy.innerHTML = random(otherEnergy)
}



let startSound;
//let slo1, slo2, slo3, slo4, slo5, slo6, slo7, slo8;
let sloArray;
//let eng1, eng2, eng3, eng4, eng5, eng6, eng7, eng8, eng9, eng10, eng11, eng12, eng13, eng14;
let engArray;

//let other1, other2, other3, other4, other5, other6, other7, other8, other9, other10, other11, other12, other13, other14;
let otherArray;

var amp;

function preload() {
  console.log("preloading")

  soundFormats('mp3');
  startSound = loadSound('assets/start', onSoundLoadSuccess, onSoundLoadError, onSoundLoadProgress);

  sloArray = ['assets/slo/eva1','assets/slo/eva2','assets/slo/eva3','assets/slo/luka1','assets/slo/luka2','assets/slo/lana1','assets/slo/lana2','assets/slo/hana_alja_helena']
  engArray = ['assets/eng/fer','assets/eng/lucas1','assets/eng/marie1','assets/eng/marie2','assets/eng/mathias1','assets/eng/rebecca','assets/eng/sarah1','assets/eng/sarah2','assets/eng/sarah3','assets/eng/simo1','assets/eng/elle1','assets/eng/amanda1','assets/eng/jiarong_eng','assets/eng/amanda',]
  otherArray = ['assets/other/alina_ger','assets/other/fer_esp_spain','assets/other/mer_esp_argentina','assets/other/mer_esp_argentina_2','assets/other/sebastian_esp_mex','assets/other/simo_ita_italy','assets/other/rasa_lt','assets/other/haissa_pt_portugal_1','assets/other/haissa_pt_portugal_2','assets/other/sev','assets/other/silas','assets/other/jiarong','assets/other/jiarong_dj','assets/other/mut',]
}

function onSoundLoadSuccess(sound) {
  if (sound._disposeLater)
    f_unloadSound(sound._disposeLater[0], sound._disposeLater[1])
  sound._ready = true;
  //console.log("load sound success", e);
}
function onSoundLoadError(e) {
  console.log("load sound error", e);
}
function onSoundLoadProgress(e) {
  //console.log("load sound progress", e);
}
//#endregion


// PROCESSING STUFF
//#region processing
var canv_side = 512;
function setup() {
  console.log("blabla")
  frameRate(20);
  //angleMode(DEGREES);
  createCanvas(canv_side, canv_side);
  pixelDensity(1);
  graphics = createGraphics(canv_side, canv_side);

  s = min(width, height);

  strokeWeight(5);
  //stroke(lineColor);
  stroke(255, 255, 0, 50);

  amp = new p5.Amplitude();


  worldSetup();
  //array shuffling
  //sloArray.sort(() => Math.random() - 0.5);
  sloArray = shuffleArray(sloArray)
  //engArray.sort(() => Math.random() - 0.5);
  engArray = shuffleArray(engArray)
  //otherArray.sort(() => Math.random() - 0.5);
  otherArray = shuffleArray(otherArray)
  console.log("Slo array: ", sloArray, "\n", "Eng array: ", "\n", engArray, "Others: ", otherArray)
}

var prev_vol;
var prev_x;
var prev_y;
let pdy = 0;
var curr_x;
var curr_y;
var dx;
var dy;
var prev_dx;
var prev_dy;

let angle = 0;
var r;

var amps = [];

function draw() {
  clear();
  worldDraw();

  //linije
  graphics.stroke(stroke_col);
  graphics.strokeWeight(stroke_width);
  graphics.noFill();
  var curr_vol = amp.getLevel();

  if (voicePlaying) {
    //var curr_vol = amp.getLevel();
    r = map(curr_vol, 0, 1, new_low, new_high) + noise(curr_vol) * new_high * pdy;
    if (prev_vol == null) {
      prev_vol = 10 * noise(sin(TWO_PI / (Math.random() * 10)), cos(TWO_PI / (Math.random() * 5)), pdy);
      //prev_y = map(noise(cos(prev_vol*TWO_PI)),0,1,0,100);
      prev_y = r * sin(pdy - 0.01) + Math.random() * 5 + height / 2 + perturbation_y;
      prev_x = r * cos(pdy - 0.01) + width / 2 + perturbation_x;
    }
    else {
      //curr_y = map(noise(curr_vol), 0, 1, height/2, 0) + Math.random()*50;
      //curr_x = 100*noise(pdy) + Math.random() * 100;
      curr_y = neg * r * sin(pdy + curr_vol) + height / 2 + r * noise(pdy) + perturbation_y;
      curr_x = r * cos(pdy + curr_vol) + width / 2 + r * noise(pdy) + perturbation_x;
      // graphics.curve(
      //   prev_x, prev_y,
      //   prev_x + noise(pdy)*5, 
      //   prev_y + noise(pdy+0.5)*10,
      //   curr_x - noise(pdy+0.02)*15, 
      //   curr_y - noise(pdy)*2, 
      //   curr_x,
      //   curr_y);
      graphics.line(prev_x, prev_y, curr_x, curr_y);
      prev_vol = curr_vol;
      prev_x = curr_x;
      prev_y = curr_y;
    }
    pdy += 0.05;
  }

  image(graphics, 0, 0);

  if (keyWentDown("space")) {
    console.log("space down!")
    startVoiceMsg()
  }
  if (keyWentUp("space"))
    stopVoiceMsg();



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
//#endregion  fi

// BRINOV WORKSPACE DONT TOUCH


var pos;
var startPos;
var distance = 0; //distance from start pos


var wWidth = 4;
var wHeight = 4;
function worldSetup() {
  pos = createVector(1, 1)
  console.log(pos.x)


  setVideoOpacities();
}


function worldDraw() {

  // text("X: " + pos.x, 10, 20)
  // text("Y: " + pos.y, 10, 40)
  // text("Dist: " + distance, 10, 60)
  // text("isPlaying " + voicePlaying, 10, 80)
  // :)))
  if (voicePlaying)
    if (!currentSound.isPlaying())
      voicePlaying = false;

  noSmooth()
  buttonOpacity()
  worldMovement();

}

function worldMovement() {
  if (keyWentDown(37)) //left
    worldMove(-1, 0)
  else if (keyWentDown(38)) //up
    worldMove(0, -1)
  else if (keyWentDown(39)) //right
    worldMove(1, 0)
  else if (keyWentDown(40)) //down
    worldMove(0, 1)
}



function worldMove(xx = 0, yy = 0) {

  // Before moving, unload the current sound
  let cs = getCurrentScreenSound();
  if (!cs.static)
    f_unloadSound(cs.array, cs.num);

  var moveVector = createVector(xx, yy)
  pos.add(moveVector)

  pos.x = Math.max(pos.x, 1)
  pos.x = Math.min(pos.x, wWidth)
  pos.y = Math.max(pos.y, 1)
  pos.y = Math.min(pos.y, wHeight)

  distance = dist(pos.x, pos.y, 1, 1)
  
  // After moving, load the new current sound
  cs = getCurrentScreenSound();
  if (!cs.static)
    f_loadSound(cs.array, cs.num);

  setVideoOpacities();
  stopVoiceMsg();

}



var btnDva = document.getElementById("dva")
var btnStiri = document.getElementById("stiri")
var btnSest = document.getElementById("sest")
var btnOsem = document.getElementById("osem")

function buttonOpacity() {
  if (pos.x == 1) btnStiri.style.opacity = 0;
  else btnStiri.style.opacity = 1

  if (pos.x == wWidth) btnSest.style.opacity = 0;
  else btnSest.style.opacity = 1;

  if (pos.y == 1) btnDva.style.opacity = 0;
  else btnDva.style.opacity = 1;

  if (pos.y == wHeight) btnOsem.style.opacity = 0;
  else btnOsem.style.opacity = 1;

}



//background video opacity manamgnet

var vClouds = document.getElementById("clouds");
var vMoon = document.getElementById("moon")
var vRain = document.getElementById("rain")

function setVideoOpacities() {

  //first dist
  var fDist = map(distance, 0, 2.5, 0, 1, true)
  var fInverted = 1 - fDist

  //second dist
  var sDist = map(distance, 2.5, wWidth, 0, 1, true)
  var sInverted = 1 - sDist

  console.log("fDist: ", fDist, "\n", "fInverted: ", fInverted, "\n", "sDist: ", sDist, "\n", "sInverted: ", sInverted)

  vMoon.style.opacity = fDist - sDist;
  vClouds.style.opacity = fInverted - sDist;
  vRain.style.opacity = sDist

}

function idleLogout() {
  var t;
  window.onkeydown = resetTimer;

  function reset_n_download() {
    // your function for too long inactivity goes here
    // e.g. window.location.href = 'logout.php';
    console.log("wipe it");
    console.log(graphics);
    //saveCanvas(graphics.canvas, 'sessions/canvas' + str(new_high), 'png');
    new_low = 200;
    new_high = 230;
    graphics.clear();
  }

  function resetTimer() {
    clearTimeout(t);
    t = setTimeout(reset_n_download, 12000);  // time is in milliseconds
  }
}
idleLogout();


function shuffleArray(array) {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}