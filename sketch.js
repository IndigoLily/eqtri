var over = true;

function eqtri(size, x = 0, y = 0, angle = 0) {
    this.s = size;
    this.pos = createVector(x, y);
    this.a = angle;

    this.h = () => this.s * (.75 ** .5);
    this.draw = function () {
        angleMode(DEGREES);

        var offset = createVector(0, -this.h() * (2 / 3));
        offset.rotate(this.a);
        offset.rotate(30);

        noStroke();
        fill(255);
        beginShape();
        for (let i = 0; i < 3; i++) {
            vertex(this.pos.x + offset.x, this.pos.y + offset.y)
            offset.rotate(120);
        }
        endShape(CLOSE);
    }
    this.rotate = function (td) {
        this.a += td;
    }
}

var tri;

function setup() {
    createCanvas(windowWidth, windowHeight);
    tri = new eqtri((width>height?height:width)/3);
}

function draw() {
    translate(width / 2, height / 2);
    background(200);

    tri.a = frameCount / 3 * 2;
    tri.draw();

    if (over) {
        noFill();
        stroke(255, 0, 0, 64);
        line(-tri.s/2, -height, -tri.s/2, height);
        line(tri.s/2, -height, tri.s/2, height);
        line(-width, -tri.s/2, width, -tri.s/2);
        line(-width, tri.s/2, width, tri.s/2);

        stroke(32, 64, 200);
        var x = -tri.h() * map(cos(frameCount / 1 * 2), -1, 1, 1, 2) / 3;
        var y = +tri.h() * map(cos(frameCount / 1 * 2), -1, 1, 2, 1) / 3;
        line(x, 0, y, 0);

        stroke(0);
        ellipse(0, 0, 2*tri.h()/3);
        ellipse(0, 0, 4*tri.h()/3);
    }
}

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
    tri.s = (width>height?height:width)/3;
}

function mousePressed() {
    over = !over;
}
