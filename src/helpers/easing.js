export const easeInOutQuad = function (time, start, change, duration) {
    time /= duration / 2;
    if (time < 1) return (change / 2) * time * time + start;
    time--;
    return (-change / 2) * (time * (time - 2) - 1) + start;
};
export const easeOutQuad = function (time, start, change, duration) {
    time /= duration;
    return -change * time * (time - 2) + start;
};
const steps = 60;
const speed = 200;
const curve = [];
for (let i = 0; i < steps + 1; i++) {
    const stepValue = easeInOutQuad(i, 0, speed, steps);
    curve.push(stepValue);
}

// console.log(curve); // [0, 50, 200, 350, 400]
