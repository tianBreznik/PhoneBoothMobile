let n = 0;
let a, c;
let palette = ["#edb92e", "#c6363c", "#a12d2e", "#0c4076", "#644a3a"];
let pg;
let s;
let pgFrame;
let bgColor, lineColor;

let canv_side = 512;

function setup() {
  console.log("blabla")
  var canvas = createCanvas(canv_side, canv_side);
  console.log(canvas);
  canvas.parent("content");
  imageMode(CENTER);

  shuffle(palette, true);

  bgColor = palette[0];
  lineColor = palette[1];

  s = min(width, height);
  pg = createGraphics(100, 100);

  pgFrame = createGraphics(width, height);
  pgFrame.background(bgColor);
  pgFrame.erase();
  pgFrame.square(25, 25, s * 0.9);
  pgFrame.noErase();

  strokeWeight(12);
  stroke(lineColor);
  noFill();
}

function draw() {
  pg.loadPixels();
  for (let i = 0; i < pg.width; i++) {
    for (let j = 0; j < pg.height; j++) {
      n = noise(0.01002503 * i, 0.01003463 * j);
      a = map(n + frameCount * 0.0005, 0, 1, 0, 100);
      c = palette[floor(a % 13) % palette.length];
      pg.set(i, j, color(c));
    }
  }
  pg.updatePixels();

  image(pg, width / 2, height / 2, s, s);

  image(pgFrame, width / 2, height / 2);

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