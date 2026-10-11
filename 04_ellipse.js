const r = require("raylib");
const g = require("./geometry");

function setup() {
    const world = {
        windowWidth: 600,
        windowHeight: 600,
        horizontalRadius: 200,
        verticalRadius: 100,
        thickness: 1,
    };

    world.origin = {
        x: world.windowWidth / 2,
        y: world.windowHeight / 2,
    };

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(
        world.windowWidth,
        world.windowHeight,
        "ELLPISE",
    );
    r.SetTargetFPS(60);

    return world;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function drawEllipse(world) {
    for(let i=0; i<=360; i+=0.25) {
        const posX = g.getXOnEllipse(world, i);
        const posY = g.getYOnEllipse(world, i);

        r.DrawCircle(posX, posY, world.thickness, r.WHITE);
    }
}

function draw(world) {
    r.BeginDrawing();

    drawEllipse(world)

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
