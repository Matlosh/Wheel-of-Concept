const create_indicator = (ctx, x, y, arm_length) => {
    let indicator = {
        'ctx': ctx,
        'x': x,
        'y': y,
        'arm_length': arm_length
    };

    return indicator;
};

const draw_indicator = (indicator) => {
    indicator.ctx.fillStyle = `rgb(255, 255, 255)`;

    indicator.ctx.beginPath();
    indicator.ctx.moveTo(indicator.x, indicator.y);
    indicator.ctx.lineTo(indicator.x + indicator.arm_length, indicator.y);
    indicator.ctx.lineTo(indicator.x + (indicator.arm_length / 2), indicator.y + (indicator.arm_length * Math.sqrt(3) / 2));
    indicator.ctx.fill();
};

export { create_indicator, draw_indicator };