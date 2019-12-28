"use strict";

var DEFAULT_WIDTH_UNIT = "px";
var GROWTH = 2;
var GROWTH_DELAY_MS = 100;
var ROTATE_DELAY_MS = 100;
var ROTATE_STRENGTH = 2;
var MAX_GROWTH = 1000;
var WALTZ_PATH = "./public/waltz.mp3";
var MAX_LOAD_TIME_MS = 10000;

var meatballMan;
var growthInterval;
var rotateInterval;
var loadTimeout;
var itsWaltz;
var meatsLoaded = {
    man: false,
    bg: false,
    waltz: false,
};

function letItConsume() {
    loadTimeout = setTimeout(function () {
        addError("The Meatball Man's meats have taken too long to load...");
    }, MAX_LOAD_TIME_MS);
    meatballMan = document.getElementById("man");
    initWaltz();
    addCallbacksToImgs();
}

function initWaltz() {
    itsWaltz = new Audio(WALTZ_PATH);
    itsWaltz.loop = true;
    itsWaltz.oncanplay = function () {
        meatLoaded("waltz");
    };
    itsWaltz.onerror = function () {
        addError("Something went terribly wrong... The Meatball Man's Waltz doesn't exist.");
    };
}

function meatLoaded(type) {
    if (meatsLoaded.hasOwnProperty(type)) {
        meatsLoaded[type] = true;

        var allLoaded = Object.keys(meatsLoaded).every(
            function (key) {
                return meatsLoaded[key];
            }
        );

        if (allLoaded) {
            allMeatsLoaded();
        }
    }
}

function allMeatsLoaded() {
    clearTimeout(loadTimeout);
    clearErrors();
    rollUpAndEngorge();
}

function rollUpAndEngorge() {
    growthInterval = setInterval(itsComingCloser, GROWTH_DELAY_MS);
    rotateInterval = setInterval(itsTwitching, ROTATE_DELAY_MS);
    itsWaltz.play();
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

function addCallbacksToImgs() {
    var imgs = document.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        img.onload = (function () {
            meatLoaded(this.id);
        }).bind(img);
        switch (img.id) {
            case "man":
                img.onerror = function () {
                    addError("Something went terribly wrong... The Meatball Man doesn't exist.");
                };
                break;
            case "bg":
                img.onerror = function () {
                    addError("The Meatball Man's glorious corridor could not be loaded. It will not be pleased...");
                };
                break;
            default:
                img.onerror = (function () {
                    addError("Couldn't load image at '"
                        + this.src
                        + "'. The Meatball Man will not be pleased...");
                }).bind(img);
        }
    }
}

function addError(msg) {
    if (msg) {
        console.error(msg);
        var errorEl = document.getElementById("error-wrapper");
        if (errorEl) {
            errorEl.innerHTML += "<p class=\"error\">"
                + String(msg)
                + "</p>";
        }
    }
}

function clearErrors() {
    var errorEl = document.getElementById("error-wrapper");
    if (errorEl) {
        errorEl.innerHTML = "";
    }
}

letItConsume();
