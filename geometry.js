function toRadiens(degrees) {
    return degrees * (Math.PI / 180);
}

function getXOnCircle(world, degreeInterval) {
    return world.origin.x + world.radius * Math.cos(toRadiens(degreeInterval));
}

function getYOnCircle(world, degreeInterval) {
    return world.origin.y + world.radius * Math.sin(toRadiens(degreeInterval));
}

function getXOnEllipse(world, degreeInterval) {
    return (
        world.origin.x +
        world.horizontalRadius * Math.cos(toRadiens(degreeInterval))
    );
}

function getYOnEllipse(world, degreeInterval) {
    return (
        world.origin.y +
        world.verticalRadius * Math.sin(toRadiens(degreeInterval))
    );
}

function getSlope(pointA, pointB) {
    return (pointB.y - pointA.y) / (pointB.x - pointA.x);
}

module.exports = {
    toRadiens,
    getXOnCircle,
    getYOnCircle,
    getXOnEllipse,
    getYOnEllipse,
    getSlope,
};
