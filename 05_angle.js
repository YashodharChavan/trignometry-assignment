const r = require("raylib");
const g = require("./geometry");

function setup() {
    const world = {
        windowWidth: 800,
        windowHeight: 700,
        pointA: {
            x: 100,
            y: 100,
        },
        pointB: {
            x: 200,
            y: 300,
        },
    };

    world.origin = {
        x: world.windowWidth / 2,
        y: world.windowHeight / 2,
    };

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.windowWidth, world.windowHeight, "What Angle is That? ");
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
        r.WHITE,
    );

    r.DrawLineEx(
        { x: 0, y: world.origin.y },
        { x: world.windowWidth, y: world.origin.y },
        2,
        r.WHITE,
    );
}

function getPointCoordinates(world) {
    return {
        pointA: {
            x: world.origin.x + world.pointA.x,
            y: world.origin.y - world.pointA.y,
        },
        pointB: {
            x: world.origin.x + world.pointB.x,
            y: world.origin.y - world.pointB.y,
        },
    };
}

function plotPoint(world) {
    const coordinates = getPointCoordinates(world);

    r.DrawCircleV(coordinates.pointA, 5, r.BLUE);
    r.DrawCircleV(coordinates.pointB, 5, r.RED);
}

function connectLines(world) {
    plotPoint(world, world.pointA, r.BLUE);
    plotPoint(world, world.pointB, r.RED);

    const coordinates = getPointCoordinates(world, world.pointB);

    r.DrawLineEx(coordinates.pointA, coordinates.pointB, 2, r.WHITE);
}

function connectPointsByDots(world) {
    const coordinates = getPointCoordinates(world, world.pointB);

    let startY = Math.max(coordinates.pointA.y, coordinates.pointB.y);
    const endY = Math.min(coordinates.pointA.y, coordinates.pointB.y);

    let startX = Math.max(coordinates.pointA.x, coordinates.pointB.x);
    const endX = Math.min(coordinates.pointA.x, coordinates.pointB.x);

    const commonX = world.origin.x + world.pointA.x;
    const commonY = world.origin.y - world.pointB.y;

    const delta = 10;

    while (startY > endY) {
        r.DrawCircle(commonX, startY, 2, r.WHITE);
        startY -= delta;
    }

    while (startX > endX) {
        r.DrawCircle(startX, commonY, 2, r.WHITE);
        startX -= delta;
    }
}

function displayAngle(world) {
    const coordinates = getPointCoordinates(world);

    const slope = g.getSlope(coordinates.pointA, coordinates.pointB);
    const angleInDegrees = Math.abs((Math.atan(slope) * 180) / Math.PI);

    r.DrawText("Angle: " + Math.round(angleInDegrees), 10, 10, 30, r.WHITE);
}

function draw(world) {
    r.BeginDrawing();

    drawAxes(world);
    connectLines(world);
    connectPointsByDots(world);
    displayAngle(world);

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
