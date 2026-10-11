const r = require("raylib");
const g = require("./geometry");

function setup() {
    const world = {
        windowWidth: 800,
        windowHeight: 400,
        sineColor: r.GREEN,
        cosColor: r.BLUE,
        thickness: 2,
        amplitude: 80,
        frequency: 0.02
    };

    world.origin = {
        x: 50,
        y: 200,
    };

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(
        world.windowWidth,
        world.windowHeight,
        "SINE and COSINE waves",
    );
    r.SetTargetFPS(60);

    return world;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function drawAxes(world) {
    r.DrawLineEx(
        { x: world.origin.x, y: 0 },
        { x: world.origin.x, y: world.windowHeight },
        5,
        r.BLACK,
    );
    r.DrawLineEx(
        { x: 0, y: world.origin.y },
        { x: world.windowWidth, y: world.origin.y },
        5,
        r.BLACK,
    );
}

function drawWaves(world) {
    let display = 0;
    let previousSineY = 0;
    let previousCosY = 0;

    for (let i = 0; i < world.windowWidth; i += 0.25) {
        const X = world.origin.x + i;
        const sineY = world.origin.y - Math.sin(i * world.frequency) * world.amplitude;
        const cosY = world.origin.y - Math.cos(i * world.frequency) * world.amplitude;

        const hasCrossedSine =
            (previousSineY < world.origin.y && sineY >= world.origin.y) ||
            (previousSineY > world.origin.y && sineY <= world.origin.y);

        const hasCrossedCos =
            (previousCosY < world.origin.y && cosY >= world.origin.y) ||
            (previousCosY > world.origin.y && cosY <= world.origin.y);

        if (hasCrossedSine || hasCrossedCos) {
            drawProjectionLine(world, X, display);
            display += 90;
        }

        r.DrawCircle(X, sineY, world.thickness, world.sineColor);
        r.DrawCircle(X, cosY, world.thickness, world.cosColor);

        previousSineY = sineY;
        previousCosY = cosY;
    }
}

function drawDottedLine(world, amplitude, start, end) {
    let startX = Math.max(start.x, end.x);
    const endX = Math.min(start.x, end.x);

    const commonY = world.origin.y + amplitude;

    const delta = 10;

    while (startX > endX) {
        r.DrawCircle(startX, commonY, 2, r.BLACK);
        startX -= delta;
    }
}

function drawLegend(world) {
    const sineText = "Sine Wave";
    const cosText = "Cos Wave";

    const width = Math.max(
        r.MeasureText(sineText, 20),
        r.MeasureText(cosText, 20),
    );

    const containerX = world.windowWidth - width - 10;
    const containerY = 10;

    r.DrawText(sineText, containerX, containerY, 20, world.sineColor);
    r.DrawText(cosText, containerX, containerY + 20, 20, world.cosColor);
}

function drawProjectionLine(world, X, projection) {
    const textWidth = r.MeasureText(projection + "", 20);

    const textX = X - textWidth / 2;
    const textY = 60;

    r.DrawText(projection + "", textX, textY, 20, r.BLACK);
    r.DrawLine(X, textY + 10, X, world.windowHeight, r.BLACK);
}

function drawHorizontalProjectionLine(world, amplitude, projection) {
    const textX = world.origin.x - 30;
    const textY = world.origin.y - amplitude;
    
    r.DrawText(projection + "", textX, textY - 10, 30, r.BLACK);
    drawDottedLine(world, amplitude, {x: world.origin.x, y: textY + 10}, {x: world.windowWidth, y: textY + 10})
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    drawAxes(world);
    drawWaves(world);
    drawLegend(world);

    drawHorizontalProjectionLine(world, world.amplitude, 1);
    drawHorizontalProjectionLine(world, 0, 0);
    drawHorizontalProjectionLine(world, -world.amplitude, -1);

    r.EndDrawing();
}

function update() {}

function tearDown() {
    r.CloseWindow();
}

function loop(world) {
    while (isRunning()) {
        update(world);
        draw(world);
    }
}

function main() {
    const world = setup();
    loop(world);
    tearDown();
}

main();
