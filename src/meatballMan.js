function initMeatballMan() {
    checkContext();
    if (context.meatballMan) {
        context.meatballMan.onclick = function () {
            stopHim();
            setItsWidth(MAX_GROWTH);
            window.open(LITTLE_RUNMO_URL, "_blank");
        };
    } else {
        printError("The Meatball Man does not exist. (img element not found)");
    }
}

function initWaltz() {
    checkContext();
    if (context.waltz) {
        context.waltz.volume = 0.0;
    } else {
        printError("The Meatball Man's Waltz does not exist. (audio element not found)");
    }
}

function rollUpAndEngorge() {
    checkContext();
    context.intervals.push(
        setInterval(
            itsComingCloser,
            context.settings.growthDelayMs
        )
    );
    context.intervals.push(
        setInterval(
            itsTwitching,
            context.settings.rotateDelayMs
        )
    );
    playWaltz();
}

function itsComingCloser() {
    checkContext();
    var currentWidth = 0;
    var widthMatch = context
        .meatballMan.style.width
        .match(/^([\d\.]+).+$/);
    if (widthMatch && widthMatch[1]) {
        currentWidth = Number(widthMatch[1]);
    }
    if (currentWidth == 0 || currentWidth) {
        setItsWidth(currentWidth + context.settings.growthStrength);
    }
}

function itsTwitching() {
    checkContext();
    var halfRotateStrength = context.settings.rotateStrength * 0.5;
    var currentRotation = 0;
    var rotationMatch = context
        .meatballMan.style.transform
        .match(/^rotate\(([\d\.]+)deg\)$/);
    if (rotationMatch && rotationMatch[1]) {
        currentRotation = Number(rotationMatch[1]);
    }

    var rotRand = Math.random() * context.settings.rotateStrength - currentRotation;
    var rotMult = rotRand >= halfRotateStrength ? 1.0 : -1.0;
    context.meatballMan.style.transform = "rotate("
        + String(currentRotation + context.settings.rotateStrength * rotMult)
        + "deg)";
}

function setItsWidth(width) {
    checkContext();
    if (width && context.meatballMan) {
        var newWidth = width < context.settings.maxGrowth
            ? width
            : context.settings.maxGrowth;
        context.meatballMan.style.width = String(newWidth) + context.settings.widthUnit;
        if (context.waltz) {
            context.waltz.volume = newWidth / context.settings.maxGrowth;
        }
    }
}

function playWaltz() {
    var tryPlayWaltzDelayMs = 100;

    checkContext();
    if (context.waltz) {
        var maybePromise = context.waltz.play();
        if (maybePromise.catch) {
            maybePromise.catch(function () {
                console.error(
                    "Couldn't play the Meatball Man's Waltz, trying again in "
                    + tryPlayWaltzDelayMs
                    + "ms"
                );
            });
        }
        if (context.waltz.paused) {
            setTimeout(playWaltz, tryPlayWaltzDelayMs);
        }
    }
}

function stopHim() {
    checkContext();

    context.intervals.forEach(function (interval) {
        clearInterval(interval);
    });
    context.intervals = [];
    if (context.waltz) {
        context.waltz.pause();
    }
}
