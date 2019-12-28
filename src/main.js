// "use strict";

var GROWTH = 2;
var DEFAULT_WIDTH_UNIT = "px";
var GROWTH_DELAY_MS = 50;
var ROTATE_DELAY_MS = 50;
var ROTATE_STRENGTH = 2;

var meatballMan;
var growthInterval;
var rotateInterval;

function itsComingCloser() {
    var currentWidth;
    var widthUnit;

    var widthMatch = meatballMan.style.width.match(/^(\d+)(.+)$/);

    if (widthMatch && widthMatch[1] && widthMatch[2]) {
        currentWidth = Number(widthMatch[1]);
        widthUnit = widthMatch[2];
    } else {
        currentWidth = 0;
        widthUnit = DEFAULT_WIDTH_UNIT;
    }

    if ((currentWidth == 0 || currentWidth) && widthUnit) {
        meatballMan.style.width = String(currentWidth + GROWTH) + widthUnit;
    }
}

function itsRotating() {
    var halfRotateStrength = ROTATE_STRENGTH * 0.5;
    var currentRotation;

    var rotationMatch = meatballMan.style.transform.match(/^rotate\((\d+)deg\)$/);

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

function main() {
    meatballMan = document.getElementById("man");
    if (meatballMan) {
        growthInterval = setInterval(itsComingCloser, GROWTH_DELAY_MS);
        rotateInterval = setInterval(itsRotating, ROTATE_DELAY_MS);
    }
}

main()
