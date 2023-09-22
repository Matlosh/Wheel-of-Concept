import { create_wheel, draw_wheel, spin_wheel } from "wheel";
import { WHEEL_X, WHEEL_Y, WHEEL_RADIUS, SHOULD_CREATE_INDICATOR, get_random_color_hex } from "reusable";

// Tries to show (render) wheel and returns true if successed, else false
const show_wheel = (x, y, radius, elements, should_create_indicator, wheel_data) => {

    const canvas = document.querySelector('#wheel');
    if(!canvas.getContext) return false;
    
    const ctx = canvas.getContext('2d');
    
    let wheel = create_wheel(ctx, x, y, radius, elements, should_create_indicator);
    draw_wheel(wheel);
    
    const wheel_output = document.querySelector('#wheel-output');
    const start_button = document.querySelector('.start-button');
    const cloned_start_button = start_button.cloneNode(true);
    start_button.parentNode.replaceChild(cloned_start_button, start_button);
    cloned_start_button.setAttribute('wheel-id', wheel_data.id);

    cloned_start_button.addEventListener('click', e => {
        spin_wheel(wheel, 5, e.target, wheel_output);
    });

    // Sets wheel title
    const wheel_title = document.querySelector('#wheel-title');
    wheel_title.textContent = wheel_data.name;

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

const change_wheel_event = (element, wheel_data) => {
    // Gives random colors to elements if they are not set
    wheel_data.elements.forEach(element => {
        if(!element.hasOwnProperty('color')) element.color = get_random_color_hex();
        if(!element.hasOwnProperty('text_color')) element.text_color = '#000000'; 
    });

    show_wheel(WHEEL_X, WHEEL_Y, WHEEL_RADIUS, wheel_data.elements, true, wheel_data);
};

export { show_wheel, get_drawn_element, change_wheel_event };