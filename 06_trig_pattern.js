const r = require("raylib");
const g = require("./geometry");

function setup() {
    const world = {
        windowWidth: 1200,
        windowHeight: 1200,
        changeInTheta: 5,
        changeInRadius: 5,
        numberOfPoints: 5,
    };

    world.origin = {
        x: world.windowWidth / 2,
        y: world.windowHeight / 2,
    };

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.windowWidth, world.windowHeight, "Trignometry Pattern");
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
        2,
        r.BLACK,
    );

    r.DrawLineEx(
        { x: 0, y: world.origin.y },
        { x: world.windowWidth, y: world.origin.y },
        2,
        r.BLACK,
    );
}

function drawPattern(world) {
    let radius = 0;
    let theta = world.changeInTheta;
    let previousPosition = {
        x: world.origin.x,
        y: world.origin.y
    };

    for (let i = 0; i < world.numberOfPoints; i += 0.025) {
        theta += world.changeInTheta;
        radius += world.changeInRadius + Math.sin(g.toRadiens(i * theta));
        
        const posX = world.origin.x + radius * Math.sin(g.toRadiens(i * theta));
        const posY = world.origin.y - radius * Math.cos(g.toRadiens(i * theta));
        
        r.DrawCircle(posX, posY, 5, r.RED);
        r.DrawLineEx(previousPosition, {x: posX, y:posY}, 10, r.RED);
        
        previousPosition.x = posX;
        previousPosition.y = posY;
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    drawAxes(world);
    drawPattern(world);
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
