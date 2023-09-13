import { SETTINGS_ITEM_NAME, get_random_color_hex } from "reusable";
import template_wheels from "data/wheels.json" assert { type: 'json' };
import { get_input_template } from "control_panel";
import { show_wheel } from "mechanics";

const init_wheels_events = (wheels_data) => {
    const wheel_options = document.querySelectorAll('.choose-wheel');
    wheel_options.forEach(option => {
        option.addEventListener('click', e => {
            const wheel_id = option.getAttribute('wheel-id');
            const wheel_data = wheels_data.find((element) => element.id?.toString() === wheel_id);

            wheel_data.elements.forEach(element => {
                if(!element.hasOwnProperty('color')) element.color = get_random_color_hex();
                if(!element.hasOwnProperty('text_color')) element.text_color = '#000000'; 
            });
        
            show_wheel(300, 300, 250, wheel_data.elements, true);
        });
    });
};

const change_wheel_event = () => {
    // Gives random colors to elements if they are not set
    // wheel_data.elements.forEach(element => {
    //     if(!element.hasOwnProperty('color')) element.color = get_random_color_hex();
    //     if(!element.hasOwnProperty('text_color')) element.text_color = '#000000'; 
    // });

    // show_wheel(300, 300, 250, wheel_data.elements, true);
    // continue here with adding events
};

const display_wheels = (element, additional_classes) => {
    let wheels = JSON.parse(localStorage.getItem(SETTINGS_ITEM_NAME)).wheels;
    if(wheels === null) wheels = template_wheels;

    wheels.forEach(wheel => {
        let inner_html = `
            <p>${wheel.name}</p>
        `;
        
        let input_html = get_input_template(additional_classes, `wheel-id="${wheel.id}"`, inner_html);
        element.insertAdjacentHTML('beforeend', input_html);
    });

    return wheels;
};

// Display all available wheels to choose in the given element
const display_available_wheels = (element) => {
    const wheels = display_wheels(element, 'choose-wheel');
    init_wheels_events(wheels);
};

const display_wheels_to_delete = (element) => {
    display_wheels(element, 'wheel-to-delete');
};

export { display_available_wheels, display_wheels_to_delete };