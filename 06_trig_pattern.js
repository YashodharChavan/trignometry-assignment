const r = require("raylib");
const g = require("./geometry");

function setup() {
    const world = {
        windowWidth: 1200,
        windowHeight: 1000,
        changeInTheta: 5,
        changeInRadius: 5,
        numberOfPoints: 5,
        time: 0.01,
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

function drawSpiralPattern(world) {
    let radius = 0;
    let theta = world.changeInTheta;
    let previousPosition = {
        x: world.origin.x,
        y: world.origin.y,
    };

    for (let i = 0; i < world.numberOfPoints; i += 0.025) {
        theta += world.changeInTheta;
        radius += world.changeInRadius + Math.sin(g.toRadiens(i * theta));

        const posX = world.origin.x + radius * Math.sin(g.toRadiens(i * theta));
        const posY = world.origin.y - radius * Math.cos(g.toRadiens(i * theta));

        r.DrawCircle(posX, posY, 5, r.RED);
        r.DrawLineEx(previousPosition, { x: posX, y: posY }, 10, r.RED);

        previousPosition.x = posX;
        previousPosition.y = posY;
    }
}

function getRandomColor() {
    return Math.floor(Math.random() * 255) + 1
}

function generateRandomColor() {
    return {
        r: getRandomColor(),
        g: getRandomColor(),
        b: getRandomColor(),
        a: 255
    }
}

function drawPattern(world) {
    const rotation = world.time * 1.5;

    for (let i = 0; i <= 360; i += 0.25) {
        const angle = g.toRadiens(i);
        const animatedAngle = angle + g.toRadiens(rotation);

        const radius = 200 * Math.sin(angle);
        const color = generateRandomColor();

        const posX =
            world.origin.x +
            radius * Math.cos(10 * animatedAngle) * 2;

        const posY =
            world.origin.y -
            radius * Math.sin(10 * animatedAngle) * 2;

        r.DrawCircle(posX, posY, 5, color);
    }
}


function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    
    world.time += 0.1;

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
