var playButton;
var music1;
var sliderVolume;
var sliderPan;
var sliderRate;
var mic;
var volmic;
var volmusic1history = [];
var fft;
var freqcol;
var yoke = [575, 582.5, 590, 597.5];
var oke = [1, 1.5, 2, 3, 4, 6, 8];
var stars = [];
var circles = [];


//PRELOAD//
function preload() {
  music1 = loadSound("Free_Jazz.mp3");

}
//SETUP//
function setup() {
  //Background&Prep
  createCanvas(1200, 650);
  buttonSliders();

  //P5Presets
  amp = new p5.Amplitude();
  reverb = new p5.Reverb();
  fft = new p5.FFT(0, 256);

}
//DRAW//
function draw() {

  //Background&Prep
  background(0);
  var freqcol = fft.analyze();
  fill(0, 150, 200);
  rect(0, 0, 200, 200)
  var volmusic1 = amp.getLevel();

  //AmplitudeGraph
  beginShape();
  if (music1.isPlaying()) {
    volmusic1history.push(volmusic1);
  }
  for (var i = 0; i < volmusic1history.length; i++) {
    stroke(0, 150, 200);
    noFill();
    var y = map(volmusic1history[i] * 5, 0, 1, (height * 7) / 8, 0);
    vertex(i, y);
  }
  endShape();
  if (volmusic1history.length > width) {
    volmusic1history.splice(0, 1);
  }

  //MainCircles

  //FreezeBug
  var v = floor(mouseX / 150);

  for (var o = 0; o < v; o++) {
    circles[o] = {
      x1: 600,
      y1: 300,
      x2: 400,
      x3: 800,
      diameter1: ((volmusic1 * 10000) / (oke[o])),
      diameter2: ((volmusic1 * 7500) / (oke[o])),
      display: function() {
        stroke(freqcol, freqcol, freqcol);
        strokeWeight(2);
        ellipse(this.x1, this.y1, this.diameter1, this.diameter1);
        ellipse(this.x2, this.y1, this.diameter1, this.diameter2);
        ellipse(this.x3, this.y1, this.diameter1, this.diameter2);
      }
    };
  }
  for (p = 0; p < circles.length; p++) {
    circles[p].display()
  }

  //Sliders
  music1.setVolume(sliderVolume.value());
  reverb.process(music1, 5, 5);
  music1.pan(sliderPan.value());
  textSize(16);
  fill(255);
  textFont("Georgia")
  text("Volume", 80, 90);
  text("Pan", 90, 150);



  //Staves
  for (k = 0; k < 5; k++) {
    stroke(0, 150, 200);
    strokeWeight(1);
    line(0, yoke[k], 1200, yoke[k]);
  }

  //Stars
  for (var m = 0; m < 100; m++) {
    stars[m] = {
      x: random(0, 1200),
      y: random(0, 575),
      diameter: random(0, 4),
      display: function() {
        fill(255);
        noStroke();
        ellipse(this.x, this.y, this.diameter, this.diameter);
      }
    };
  }

  if (keyIsPressed === true) {
    for (n = 0; n < stars.length; n++) {
      stars[n].display();
    }
  }
}

//BUTTONSLIDERS//
function buttonSliders() {
  //PlayStopButton
  function startStop() {
    if (!music1.isPlaying()) {
      music1.play();
      playButton.html("Stop");
    } else {
      music1.pause();
      music1.stop();
      playButton.html("Play");
    }
  }

  playButton = createButton("Play");
  playButton.position(85, 20);
  playButton.mousePressed(startStop);

  //Sliders
  sliderVolume = createSlider(0, 1, 0.3, 0.01);
  sliderVolume.position(35, 50);

  sliderPan = createSlider(-1, 1, 0, 0.01);
  sliderPan.position(35, 105);
}