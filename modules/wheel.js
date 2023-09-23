import { create_indicator, draw_indicator } from "indicator";
import { get_drawn_element } from "mechanics";
import { trim_text, WHEEL_TEXT_MAX_LENGTH } from "reusable";

const create_wheel = (ctx, x, y, radius, elements, should_create_indicator) => {    
    const elements_count = elements.length;
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
            'element': elements[i],
            'degree_start': (degree_step * i),
            'degree_end': (degree_step * (i + 1))
        });
    }
    
    return wheel;
};

const draw_wheel = (wheel) => {
    wheel.elements.forEach((element, i) => {
        wheel.ctx.save();
        
        // Change coloring later
        wheel.ctx.fillStyle = element.element.color;
        wheel.ctx.beginPath();
        wheel.ctx.moveTo(wheel.x, wheel.y);
        wheel.ctx.arc(wheel.x, wheel.y, wheel.radius, (Math.PI / 180) * element.degree_start, (Math.PI / 180) * element.degree_end, false);
        wheel.ctx.lineTo(wheel.x, wheel.y);
        wheel.ctx.fill();

        wheel.ctx.fillStyle = element.element.text_color;
        wheel.ctx.font = "18px sans-serif";

        // Rotates in arbitrary point
        wheel.ctx.translate(300, 300);
        wheel.ctx.rotate((Math.PI / 180) * (element.degree_start + element.degree_end) / 2);
        wheel.ctx.translate(-300, -300);

        wheel.ctx.fillText(trim_text(element.element.name, WHEEL_TEXT_MAX_LENGTH, '...'), wheel.x + 100, wheel.y + 5);
        wheel.ctx.restore();
    });

    if(wheel.indicator !== null)
        draw_indicator(wheel.indicator);
};

// Spins a wheel and (if provided) manages start button and wheel output
const spin_wheel = (wheel, spin_step, start_button = null, wheel_output = null) => {
    let random_num = parseInt(Math.random() * 1000 + 100);

    if(start_button !== null)
        start_button.classList.add('active');

    let counter = 0;
    const interval = setInterval(function() {
        wheel.ctx.clearRect(0, 0, 600, 600);

        wheel.elements.forEach(element => {
            element.degree_start = element.degree_start + spin_step;
            element.degree_end = element.degree_end + spin_step;
        });
        draw_wheel(wheel);

        counter++;
        if(random_num <= counter) {
            clearInterval(interval);
            // Maybe refactor it later to some kind of Promise or sth
            const drawn_element = get_drawn_element(wheel, 270);

            if(start_button !== null)
                start_button.classList.remove('active');

            console.log(wheel);

            if(wheel_output !== null)
                wheel_output.textContent = `${drawn_element.element.name} won!`;
        }
    }, 1);
};

export { create_wheel, draw_wheel, spin_wheel };