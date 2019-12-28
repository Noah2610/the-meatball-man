"use strict";

var DEFAULT_WIDTH_UNIT = "px";
var GROWTH = 2;
var GROWTH_DELAY_MS = 100;
var ROTATE_DELAY_MS = 100;
var ROTATE_STRENGTH = 2;
var MAX_GROWTH = 1000;
var WALTZ_PATH = "./public/waltz.mp3";

var meatballMan;
var growthInterval;
var rotateInterval;
var itsWaltz;

function letItConsume() {
    meatballMan = document.getElementById("man");
    meatballMan.onload = rollUpAndEngorge;
    meatballMan.onerror = meatError;
}

function rollUpAndEngorge() {
    growthInterval = setInterval(itsComingCloser, GROWTH_DELAY_MS);
    rotateInterval = setInterval(itsTwitching, ROTATE_DELAY_MS);
    playItsWaltz();
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
        meatballMan.style.width = String(newWidth) + widthUnit;

        if (itsWaltz) {
            itsWaltz.volume = newWidth / MAX_GROWTH;
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

function playItsWaltz() {
    itsWaltz = new Audio(WALTZ_PATH);
    if (itsWaltz) {
        itsWaltz.loop = true;
        itsWaltz.play();
    }
}

function meatError() {
    addError(
        "Something went terribly wrong... The Meatball Man doesn't exist."
    );
}

function addError(msg) {
    var errorEl = document.getElementById("error");
    if (errorEl && msg) {
        errorEl.innerHTML += "<p>" + String(msg) + "</p>";
    }
}

letItConsume();
