import { create_wheel, draw_wheel, spin_wheel } from "wheel";

// Tries to show (render) wheel and returns true if successed, else false
const show_wheel = (x, y, radius, elements, should_create_indicator) => {
    
    const canvas = document.querySelector('#wheel');
    if(!canvas.getContext) return false;
    
    const ctx = canvas.getContext('2d');
    
    let wheel = create_wheel(ctx, x, y, radius, elements, should_create_indicator);
    draw_wheel(wheel);
    
    const wheel_output = document.querySelector('#wheel-output');
    const start_button = document.querySelector('.start-button');
    const cloned_start_button = start_button.cloneNode(true);
    start_button.parentNode.replaceChild(cloned_start_button, start_button);

    cloned_start_button.addEventListener('click', e => {
        spin_wheel(wheel, 5, e.target, wheel_output);
    });

    return true;
};

// Checks which element was drawn (was on indicator's degree) and returns it
const get_drawn_element = (wheel, indicator_degree) => {
    let drawn_element = null;
    
    wheel.elements.forEach(element => {
        const degree_start = element.degree_start - Math.floor(element.degree_start / 360) * 360;
        const degree_end = element.degree_end - Math.floor(element.degree_end / 360) * 360;

        console.log(degree_start, degree_end, indicator_degree, element.element.name);
        if(degree_start < indicator_degree && degree_end >= indicator_degree)
            drawn_element = element;
    });

    return drawn_element;
};

export { show_wheel, get_drawn_element };