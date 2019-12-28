// "use strict";

var GROWTH = 2;
var DEFAULT_WIDTH_UNIT = "px";
var GROWTH_DELAY_MS = 50;
var BOB_DELAY_MS = 50;
var BOB_STRENGTH = 2;

var meatballMan;
var growthInterval;
var bobInterval;

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

function itsBobbing() {
    var halfBobStrength = BOB_STRENGTH * 0.5;
    var currentRotation;

    var rotationMatch = meatballMan.style.transform.match(/^rotate\((\d+)deg\)$/);

    if (rotationMatch && rotationMatch[1]) {
        currentRotation = Number(rotationMatch[1]);
    } else {
        currentRotation = 0;
    }

    var rotRand = Math.random() * BOB_STRENGTH - currentRotation;
    var rotMult = rotRand >= halfBobStrength ? 1.0 : -1.0;
    meatballMan.style.transform = "rotate("
        + String(currentRotation + BOB_STRENGTH * rotMult)
        + "deg)";
}

function main() {
    meatballMan = document.getElementById("man");
    if (meatballMan) {
        growthInterval = setInterval(itsComingCloser, GROWTH_DELAY_MS);
        bobInterval = setInterval(itsBobbing, BOB_DELAY_MS);
    }
}

main()
