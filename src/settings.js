function getContext() {
    return {
        settings: {
            widthUnit: "px",
            growthStrength: 2,
            growthDelayMs: 100,
            maxGrowth: 1280,
            rotateStrength: 2,
            rotateDelayMs: 100,

            waltzPath: "./public/waltz.mp3",
            littleRunmoUrl: "https://www.youtube.com/watch?v=ErQHVUQ6QCk"
        },
        meatballMan: document.getElementById("man"),
        waltz: document.getElementById("waltz"),
        intervals: []
    };
}
