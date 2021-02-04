let music;
let button;
let fft;
let mic;
let micStatus = false;
let totalAmp;
let barCount;
let barWidth;
let bgColor;
let checkBox = [];
// Images
let lemonadeImg;
let headshotImg;
let imageArr = [];
let currentImg = lemonadeImg;

function preload() {
  music = loadSound("assets/S U B W A Y S - アイスクリーム.mp3");
  lemonadeImg = loadImage("assets/cropped pink lemonade.png");
  headshotImg = loadImage("assets/audiovis headshot (1).png");
  imageArr.push(lemonadeImg, headshotImg);
}

function setup() {
  // Create Canvas
  let cnv = createCanvas(windowWidth, windowHeight);
  // Variable settings
  colorMode(RGB);
  angleMode(DEGREES);
  // Create Mic Button
  mic = new p5.AudioIn();
  micCheckbox = createCheckbox("", false);
  micCheckbox.changed(toggleMic);
  micCheckbox.position((windowWidth / 100) * 50, windowHeight * 0.95);
  checkBox.push(micCheckbox);
  // Create Play Button
  playButton = createButton("Play");
  playButton.position((windowWidth / 100) * 5, (windowHeight / 100) * 95);
  playButton.mousePressed(togglePlayButton);
  // Create Toggle Image Button
  imgButton = createButton("Toggle Image");
  imgButton.position(
    (windowWidth / 100) * 95 - imgButton.width,
    (windowHeight / 100) * 95
  );
  imgButton.mousePressed(toggleImage);

  // Total Sound Amplitude for background color change
  totalAmp = new p5.Amplitude();

  barCount = 256;
  fft = new p5.FFT(0.7, barCount); // (smoothing, number of divisions for frequencies)
  mic.connect(fft);
  mic.connect(totalAmp);
  barWidth = windowWidth / barCount;
}

function draw() {
  // FFT vis
  drawSpectrum();
  // Waveform vis
  drawWaveform();
  // Init image
  if (!currentImg) {
    image(lemonadeImg, -lemonadeImg.width / 2, -lemonadeImg.height / 2);
  } else {
    image(currentImg, -currentImg.width / 2, -currentImg.height / 2);
  }
  // Background circle for image
  circle(0, 0, 200);
  // Looping music title
  drawText();
}

let angleScale = 525;
function drawSpectrum() {
  // Initialize
  let spectrum = fft.analyze();
  translate(windowWidth / 2, windowHeight / 2);

  // Background
  let sumAmp = 0;
  for (let i = 0; i < spectrum.length; i++) {
    let amplitude = spectrum[i];
    sumAmp += amplitude;
  }
  let avgAmp = sumAmp / spectrum.length;
  bgColor = map(avgAmp, 0, 255, 0, 50);
  console.log("total Amp", totalAmp.getLevel());
  // Map amplitude to background color change
  if (micStatus === true && totalAmp.getLevel() < 0.12) {
    background(0);
  } else {
    background(bgColor);
  }

  // Spectrum
  for (let i = 0; i < spectrum.length; i++) {
    let angle = map(i, 0, spectrum.length, 0, angleScale);
    let amplitude = spectrum[i];
    let smallestWinDim;
    if (windowHeight < windowWidth) {
      smallestWinDim = windowHeight;
    } else {
      smallestWinDim = windowWidth;
    }
    let r = map(amplitude, 0, 256, 90, (smallestWinDim / 2) * 0.9);
    let x = r * cos(angle + frameCount / 2);
    let y = r * sin(angle + frameCount / 2);
    stroke(amplitude + i, amplitude, i); // Color of spectrum
    strokeWeight(5);
    if (micStatus === true && totalAmp.getLevel() < 0.01) {
      strokeWeight(1);
    } else {
      strokeWeight(5);
    }
    line(0, 0, x, y);
  }
  fill(255, 255, 255);
  noStroke();
  circle(0, 0, 200);
}

function drawWaveform() {
  let waveform = fft.waveform();
  beginShape();
  noFill();
  stroke(50, 255, 255);
  strokeWeight(4);
  for (let i = 0; i < waveform.length; i++) {
    let amplitude = waveform[i];
    let angle = map(i, 0, waveform.length, 0, 361);
    let r = map(amplitude, 0, 256, 200, (windowWidth / 2) * 0.9);
    let lineHeight = map(amplitude, -1, 1, r / 4, r / 2);
    let x = (r / 2 + lineHeight) * cos(angle + frameCount / 2);
    let y = (r / 2 + lineHeight) * sin(angle + frameCount / 2);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function drawText() {
  // Looping music title
  fill(255, 255, 255);
  noStroke();
  if (music.isPlaying()) {
    text(
      "S U B W A Y S - アイスクリーム",
      -frameCount % 240,
      (-windowHeight / 2) * 0.95
    );
    text(
      "S U B W A Y S - アイスクリーム",
      (-frameCount % 240) + 240,
      (-windowHeight / 2) * 0.95
    );
  }
  textAlign(CENTER, CENTER);

  // Blend rectangles that hide the looping text with the background color change
  rectMode(CENTER);
  if (micStatus === true && totalAmp.getLevel() < 0.01) {
    fill(0);
  } else {
    fill(bgColor);
  }

  // Rectangles that hide the looping music title
  if (micStatus === false) {
    rect(-220, (-windowHeight / 2) * 0.95, 240, 50);
    rect(220, (-windowHeight / 2) * 0.95, 240, 50);
  }
}

// Play/Pause button
function togglePlayButton() {
  if (!music.isPlaying()) {
    music.play();
    playButton.html("Pause");
    mic.stop();
    currentImg = lemonadeImg;
    angleScale = 525;
    micStatus = false;
    changeCheckbox(checkBox);
  } else {
    music.pause();
    playButton.html("Play");
  }
}

function changeCheckbox(checkBox) {
  checkBox[0].checked(false);
}

// Toggle image button
let counter = 1;
function toggleImage() {
  currentImg = imageArr[(counter + imageArr.length) % imageArr.length];
  counter++;
}

// Mic toggle button
function toggleMic() {
  if (this.checked()) {
    //music.stop();
    music.pause();
    playButton.html("Play");
    mic.start();
    currentImg = headshotImg;
    angleScale = 360;
    micStatus = true;
  } else {
    mic.stop();
    currentImg = lemonadeImg;
    angleScale = 525;
    micStatus = false;
  }
}
