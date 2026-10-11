const r = require("raylib");
const g = require("./geometry");

function setup() {
    const world = {
        windowWidth: 800,
        windowHeight: 800,
        radius: 200,
        points: 5,
    };

    world.origin = {
        x: world.windowWidth / 2,
        y: world.windowHeight / 2,
    };

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(
        world.windowWidth,
        world.windowHeight,
        "POINTS AROUND THE CIRCLE",
    );
    r.SetTargetFPS(60);

    return world;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function drawPointsAroundCircle(world) {
    const degreeInterval = 360 / world.points;

    for (let i = 0; i < world.points; i++) {
        const posX = g.getXOnCircle(world, degreeInterval * i);
        const posY = g.getYOnCircle(world, degreeInterval * i);

        r.DrawCircle(posX, posY, 10, r.RED);
    }
}

function draw(world) {
    r.BeginDrawing();

    r.DrawCircleV(world.origin, world.radius, r.WHITE);
    drawPointsAroundCircle(world);
    
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
