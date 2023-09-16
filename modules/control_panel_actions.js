import { SETTINGS_ITEM_NAME, display_info_box, get_random_array_element } from "reusable";
import template_wheels from "data/wheels.json" assert { type: 'json' };
import { get_input_template } from "control_panel";
import { change_wheel_event } from "mechanics";

const init_wheels_events = (element, wheels_data, wheel_event) => {
    const wheel_options = document.querySelectorAll('.wheel-entry');
    wheel_options.forEach(option => {
        option.addEventListener('click', e => {
            const wheel_id = option.getAttribute('wheel-id');
            const wheel_data = wheels_data.find((element) => element.id?.toString() === wheel_id);

            wheel_event(element, wheel_data);
        });
    });
};

const delete_wheel_element = (wheel_id) => {
    const element = document.querySelector(`.form-group[wheel-id="${wheel_id}"]`);
    if(element) element.remove();
};

const delete_wheel_event = (element, wheel_data) => {
    let settings = JSON.parse(localStorage.getItem(SETTINGS_ITEM_NAME));
    if(settings === null) {
        display_info_box("It's not possible to delete a template wheel.", 'error');
        return;
    }
    let wheels = settings.wheels;
    
    const wheel_to_delete_index = wheels.map(entry => entry.id).indexOf(wheel_data.id);
    wheels.splice(wheel_to_delete_index, 1);
    settings.wheels = wheels;

    localStorage.setItem(SETTINGS_ITEM_NAME, JSON.stringify(settings));
    delete_wheel_element(wheel_data.id);

    const spin_button = document.querySelector('.start-button');
    if(parseInt(spin_button.getAttribute('wheel-id')) === wheel_data.id) {
        const random_wheel = wheels.length > 0 ? get_random_array_element(wheels) : template_wheels[0];
        change_wheel_event(element, random_wheel);
    }

    display_info_box('Wheel was successfully deleted.', 'success');
};

const display_wheels = (element, additional_classes) => {
    let wheels = JSON.parse(localStorage.getItem(SETTINGS_ITEM_NAME))?.wheels;
    if(wheels === undefined) wheels = template_wheels;

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
    const wheels = display_wheels(element, 'wheel-entry choose-wheel');
    init_wheels_events(element, wheels, change_wheel_event);
};

const display_wheels_to_delete = (element) => {
    const wheels = display_wheels(element, 'wheel-entry wheel-to-delete');
    init_wheels_events(element, wheels, delete_wheel_event);
};

export { display_available_wheels, display_wheels_to_delete };