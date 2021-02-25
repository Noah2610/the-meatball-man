"use strict";

var context = null;

function main() {
    var variant = queryParams().variant;
    switch (variant) {
        case "meatball-man":
        case "meatball":
        case "man":
            document.querySelector("img#man").src = "./public/man.png";
            break;
        case "egghead":
            document.querySelector("img#man").src = "./public/egghead.png";
            break;
    }
    letItConsume();
}

function queryParams() {
    var params = {};
    window.location.search
        .replace(/^\?/, "")
        .split("&")
        .map((keyVal) => {
            var split = keyVal.split("=");
            params[split[0]] = split[1];
        });
    return params;
}

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

window.onload = main;
