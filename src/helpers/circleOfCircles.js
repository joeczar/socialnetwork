export const circlePos = ({ radius, steps, centerX, centerY, spread }) => {
   
    centerX = centerX / 2;
    centerY = centerY / 2;

    let xValues = [centerX];
    let yValues = [centerY];

    if (steps === 1) {
        xValues[0] = centerX;
        yValues[0] = centerY;
    } else
        for (let i = 0; i < steps; i++) {
            xValues[i] =
                centerX +
                (radius + spread) * Math.cos((2 * Math.PI * i) / steps);
            yValues[i] =
                centerY +
                (radius + spread) * Math.sin((2 * Math.PI * i) / steps);
        }

    return { xValues, yValues };
};
