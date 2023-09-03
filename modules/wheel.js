import { create_indicator, draw_indicator } from "indicator";
import { get_drawn_element } from "mechanics";

const create_wheel = (ctx, x, y, radius, elements_count, should_create_indicator) => {    
    const degree_step = 360 / elements_count;

    let wheel = {
        'ctx': ctx,
        'x': x,
        'y': y,
        'radius': radius,
        'elements': [],
        'indicator': should_create_indicator ? create_indicator(ctx, x - (x / 5 / 2), (y - radius - (x / 30)), x / 5) : null
    };
    
    for(let i = 0; i < elements_count; i++) {
        wheel.elements.push({
            'element': i,
            'degree_start': (degree_step * i),
            'degree_end': (degree_step * (i + 1))
        });
    }
    
    return wheel;
};

const draw_wheel = (wheel) => {
    wheel.elements.forEach((element, i) => {
        wheel.ctx.fillStyle = `rgb(${10 * i}, 100, 100)`;
        wheel.ctx.beginPath();
        wheel.ctx.moveTo(wheel.x, wheel.y);
        wheel.ctx.arc(wheel.x, wheel.y, wheel.radius, (Math.PI / 180) * element.degree_start, (Math.PI / 180) * element.degree_end, false);
        wheel.ctx.lineTo(wheel.x, wheel.y);
        wheel.ctx.fill();

        // how to show text inside each element?
        // wheel.ctx.fillStyle = `rgb(255, 255, 255)`;
        // wheel.ctx.font = "48px";
        // wheel.ctx.fillText("Test message", wheel.x, wheel.y);
    });

    if(wheel.indicator !== null)
        draw_indicator(wheel.indicator);
};

const spin_wheel = (wheel, spin_step) => {
    let random_num = parseInt(Math.random() * 1000 + 100);

    let counter = 0;
    const interval = setInterval(function() {
        wheel.ctx.clearRect(0, 0, 600, 600);

        draw_wheel(wheel);
        wheel.elements.forEach(element => {
            element.degree_start = element.degree_start + spin_step;
            element.degree_end = element.degree_end + spin_step;
        });

        counter++;
        if(random_num <= counter) {
            clearInterval(interval);
            // Maybe refactor it later to some kind of Promise or sth
            const drawn_element = get_drawn_element(wheel, 180);
            console.log(drawn_element);
        }
    }, 1);
};

export { create_wheel, draw_wheel, spin_wheel };