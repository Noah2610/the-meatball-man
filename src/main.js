// "use strict";

var GROW_DELAY_MS = 50;
var GROWTH = 2;
var DEFAULT_WIDTH_UNIT = "px";

var meatballMan;
var meatballManGrowInterval;

function itsComingCloser() {
    var currentWidth;
    var widthUnit;

    var widthMatch = meatballMan.style.width.match(/^(\d+)(.+)$/);

    if (widthMatch) {
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

function main() {
    meatballMan = document.getElementById("man");
    if (meatballMan) {
        meatballManGrowInterval = setInterval(itsComingCloser, GROW_DELAY_MS);
    }
}

main()
