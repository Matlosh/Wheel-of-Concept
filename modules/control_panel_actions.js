import template_wheels from "data/wheels.json" assert { type: 'json' };
import controls_json from "data/controls.json" assert { type: 'json' };
import templates_json from "data/templates.json" assert { type: 'json' };
import { SETTINGS_ITEM_NAME, BOX_STATUSES, display_info_box, get_random_array_element,
    get_string_slug, display_alert_box } from "reusable";
import { inflate_panel, get_input_template } from "control_panel";
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

const delete_wheel_event = async (element, wheel_data) => {
    const response = await display_alert_box('Do you really want to delete a Wheel?');
    if(!response.choice) {
        display_info_box("You have cancelled Wheel's deletion.", BOX_STATUSES.WARNING);
        return;
    } 

    let settings = JSON.parse(localStorage.getItem(SETTINGS_ITEM_NAME));
    if(settings === null) {
        display_info_box("It's not possible to delete a template wheel.", BOX_STATUSES.ERROR);
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

    display_info_box('Wheel was successfully deleted.', BOX_STATUSES.SUCCESS);
};

const find_first_value_in_objects_array = (array, key) => {
    if(Array.isArray(array)) {
        const entry = array.find(entry => entry.hasOwnProperty(key));
        return entry[key];
    }

    return null;
};

// Finds given value(s) in object by searching object with the given key(s)
const find_value_in_object = (object, keys) => {
    let values = [];

    for(const [key, value] of Object.entries(object)) {
        if(key === keys[0] && typeof(value) !== 'object') {
            values.push(value);
            continue;
        }

        if(key === keys[0] && typeof(value) === 'object') {
            if(Array.isArray(value)) {
                value.forEach(element => {
                    values.push(...find_value_in_object(element, keys.slice(1)));
                });
            }

            values.push(...find_value_in_object(value, keys.slice(1)));
        }
    }

    return values;
};

const edit_wheel_event = (element, wheel_data) => {
    element.setAttribute('data-edit-wheel-id', wheel_data.id);

    const edit_controls = controls_json['edit_wheel_data'];
    inflate_panel(controls_json, get_string_slug(edit_controls['title']), element);

    const submit_option = Object.values(edit_controls['options']).find(option => {
        return option.type === 'submit'
    });

    // console.log(wheel_data);
    for(const [key, option] of Object.entries(edit_controls['options'])) {
        const value_name_path = [];

        if(option.hasOwnProperty('template_key_parent'))
            value_name_path.push(option['template_key_parent']);

        if(!option.hasOwnProperty('template_key'))
            continue;

        value_name_path.push(option['template_key']);

        // Checks if the option is saved - it means that it should have an input
        // its value is written to
        if(!option.hasOwnProperty('save') || !option.save)
            continue;

        const input_name = get_string_slug(option.name);
        const input_element = document.querySelector(`input[name="${input_name}"]`);
        let values = find_value_in_object(wheel_data, value_name_path);

        if(option.hasOwnProperty('template_key_reverse_function')) {
            let reverse_function = option['template_key_reverse_function'];

            if(reverse_function === 'join') {
                input_element.value = values.join(', ');
                continue;
            }
        }

        input_element.value = values[0];
    }
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

const display_wheels_to_edit = (panel_container) => {
    const wheels = display_wheels(panel_container, 'wheel-entry wheel-to-edit');
    init_wheels_events(panel_container, wheels, edit_wheel_event);
};

export { display_available_wheels, display_wheels_to_delete, display_wheels_to_edit };