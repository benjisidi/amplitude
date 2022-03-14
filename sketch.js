
let dial;
let canvas_w = 1200;
let canvas_h = 600;
let dial_r = 400;
let mouseAngle = 0;
let words;
let word;
wordfile = new FileReader("./opposites.txt")


function preload() {
    dial = new Dial(canvas_w / 2, canvas_h, dial_r * 2)
    words = loadStrings("./opposites.txt")
}


function setup() {
    // put setup code here
    createCanvas(canvas_w, canvas_h);
    word = random(words)
    textAlign(CENTER)
}

function draw() {
    dial.draw()
    noStroke()
    fill(255)
    textSize(11)
    text(frameRate().toPrecision(3), 20, 20)
    textSize(48)
    text(word, 600, 100);
}

function mouseMoved() {
    dial.mouse_angle = atan((canvas_w / 2 - mouseX)/(canvas_h-mouseY)) + HALF_PI
}

function mouseClicked() {
    dial.set_pin()
}

function keyPressed() {
    if (keyCode == ENTER) {
        dial.hidden = !dial.hidden
    }
    if (keyCode == BACKSPACE) {
        if (!dial.hidden) {
            dial.spin()
            word = random(words)
        }
    }
    if (keyCode == 32) {
        if (!dial.hidden) {
            dial.spin()
            word = random(words)
        }
    }
}