"use strict";

var DEFAULT_WIDTH_UNIT = "px";
var GROWTH = 2;
var GROWTH_DELAY_MS = 100;
var ROTATE_DELAY_MS = 100;
var ROTATE_STRENGTH = 2;
var MAX_GROWTH = 1000;
var WALTZ_PATH = "./public/waltz.mp3";
var MAX_LOAD_TIME_MS = 10000;
var LITTLE_RUNMO_URL = "https://www.youtube.com/watch?v=ErQHVUQ6QCk";

var meatballMan;
var intervals = [];
var itsWaltz;

function letItConsume() {
    initMeatballMan();
    initWaltz();
    rollUpAndEngorge();
}

function initMeatballMan() {
    meatballMan = document.getElementById("man");
    meatballMan.onclick = function () {
        stopHim();
        setItsWidth(MAX_GROWTH);
        window.open(LITTLE_RUNMO_URL, "_blank");
    };
}

function initWaltz() {
    itsWaltz = new Audio(WALTZ_PATH);
    itsWaltz.loop = true;
}

function rollUpAndEngorge() {
    intervals.push(setInterval(itsComingCloser, GROWTH_DELAY_MS));
    intervals.push(setInterval(itsTwitching, ROTATE_DELAY_MS));
    itsWaltz.play();
}

function stopHim() {
    intervals.forEach(function (interval) {
        clearInterval(interval);
    });
    if (itsWaltz) {
        itsWaltz.pause();
    }
}

function itsComingCloser() {
    var currentWidth;
    var widthUnit;

    var widthMatch = meatballMan.style.width.match(/^([\d\.]+)(.+)$/);

    if (widthMatch && widthMatch[1] && widthMatch[2]) {
        currentWidth = Number(widthMatch[1]);
        widthUnit = widthMatch[2];
    } else {
        currentWidth = 0;
        widthUnit = DEFAULT_WIDTH_UNIT;
    }

    if ((currentWidth == 0 || currentWidth) && widthUnit) {
        var newWidth = currentWidth + GROWTH;
        newWidth = newWidth < MAX_GROWTH ? newWidth : MAX_GROWTH;
        setItsWidth(newWidth, widthUnit);
    }
}

function setItsWidth(width, unit) {
    if (width) {
        meatballMan.style.width = String(width) + (unit || DEFAULT_WIDTH_UNIT);
        if (itsWaltz) {
            itsWaltz.volume = width / MAX_GROWTH;
        }
    }
}

function itsTwitching() {
    var halfRotateStrength = ROTATE_STRENGTH * 0.5;
    var currentRotation;

    var rotationMatch = meatballMan.style.transform.match(/^rotate\(([\d\.]+)deg\)$/);

    if (rotationMatch && rotationMatch[1]) {
        currentRotation = Number(rotationMatch[1]);
    } else {
        currentRotation = 0;
    }

    var rotRand = Math.random() * ROTATE_STRENGTH - currentRotation;
    var rotMult = rotRand >= halfRotateStrength ? 1.0 : -1.0;
    meatballMan.style.transform = "rotate("
        + String(currentRotation + ROTATE_STRENGTH * rotMult)
        + "deg)";
}

letItConsume();
