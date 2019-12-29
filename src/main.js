"use strict";

var context = null;

function letItConsume() {
    context = getContext();
    initMeatballMan();
    initWaltz();
    if (context.meatballMan && context.waltz) {
        rollUpAndEngorge();
    }
}

function checkContext() {
    if (!context) {
        throw new Error("No context");
    }
}

function printError(errMsg) {
    if (errMsg) {
        console.error("Something went terribly wrong... " + errMsg);
    }
}

letItConsume();
