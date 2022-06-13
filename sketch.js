"use strict";
const cnv = document.body.appendChild(document.createElement("canvas"));
const ctx = cnv.getContext("2d");
const SQRT_PI = Math.sqrt(Math.PI);
let needsResize = true;
let clear;
let drawSquare;
let drawTriangle;
let drawLine;
let drawOuterCircle;
let drawInnerCircle;
function resize() {
    needsResize = false;
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
    const max = Math.max(cnv.width, cnv.height);
    const radius = max / 2 / 4;
    {
        const halfWidth = cnv.width / 2;
        const halfHeight = cnv.height / 2;
        clear = () => {
            ctx.resetTransform();
            ctx.clearRect(0, 0, cnv.width, cnv.height);
            ctx.translate(halfWidth, halfHeight);
        };
    }
    {
        const offset = Math.round(SQRT_PI * radius / 2);
        drawSquare = () => {
            ctx.fillStyle = "#f003";
            ctx.beginPath();
            for (let i = 0; i < 4; i++) {
                ctx.rect(offset, -max, 2, max * 2);
                ctx.rotate(Math.PI / 2);
            }
            ctx.fill();
        };
    }
    {
        const points = [];
        for (let i = 0; i < 3; i++) {
            const a = Math.PI * 2 / 3 * i;
            points.push([Math.cos(a) * radius, Math.sin(a) * radius]);
        }
        drawTriangle = (t) => {
            ctx.fillStyle = "#fff";
            ctx.rotate(t);
            ctx.beginPath();
            for (const [x, y] of points) {
                ctx.lineTo(x, y);
            }
            ctx.fill();
            ctx.rotate(-t);
        };
    }
    {
        const rad4th = radius / 4;
        const len = -radius * 1.5;
        drawLine = (t) => {
            ctx.fillStyle = "#00f5";
            ctx.fillRect(rad4th * (Math.cos(3 * t) + 3), -1, len, 2);
        };
    }
    {
        drawOuterCircle = () => {
            ctx.strokeStyle = "#000";
            ctx.lineWidth = Math.SQRT2;
            ctx.beginPath();
            ctx.arc(0, 0, radius + ctx.lineWidth / 2, 0, Math.PI * 2);
            ctx.stroke();
        };
    }
    {
        const width = Math.SQRT2 ** 1.5;
        const rad = (radius - width) / 2;
        drawInnerCircle = () => {
            ctx.lineWidth = width;
            ctx.beginPath();
            ctx.arc(0, 0, rad, 0, Math.PI * 2);
            ctx.stroke();
        };
    }
}
window.addEventListener("resize", () => { needsResize = true; });
const start = performance.now();
function draw(now) {
    const t = (now - start) / 1500;
    if (needsResize) {
        resize();
    }
    clear();
    drawSquare();
    drawTriangle(t);
    drawLine(t);
    drawOuterCircle();
    drawInnerCircle();
    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
