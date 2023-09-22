// Globally available variables
const INFO_BOX_ACTIVE_LENGTH = 4000;
const INFO_BOX_ANIMATION_LENGTH = 2000;
const SETTINGS_ITEM_NAME = 'settings';
const WHEEL_X = 300;
const WHEEL_Y = 300;
const WHEEL_RADIUS = 250;
const SHOULD_CREATE_INDICATOR = true;
const WHEEL_TEXT_MAX_LENGTH = 10;
const BOX_STATUSES = {
    'SUCCESS': 'success',
    'ERROR': 'error',
    'WARNING': 'warning',
    'DEFAULT': 'default'
};

// Simply checks if first (or second) class is available and if it is, switches
const class_switch = (element, first_class, second_class) => {
    if(element.classList.contains(first_class)) {
        element.classList.remove(first_class);
        element.classList.add(second_class);
        return;
    }

    if(element.classList.contains(second_class)) {
        element.classList.remove(second_class);
        element.classList.add(first_class);
    }
};

// Removes or adds classes from all given elements 
const manage_classes = (classes, action, elements) => {
    elements.forEach(element => {
        classes.forEach(html_class => {
            if(action === 'add') element.classList.add(html_class);
            if(action === 'remove') element.classList.remove(html_class);
        });
    });
};

const display_info_box = (message = '', status = 'default') => {
    const info_box = document.querySelector('#info-box');
    const info_box_paragraph = info_box.querySelector('p');

    // Can't have two display boxes at the same time
    if(info_box.classList.contains('active')) return;

    info_box_paragraph.textContent = message;
    info_box.classList.remove(...info_box.classList);
    info_box.classList.add('active');

    switch(status) {
        case BOX_STATUSES.SUCCESS:
            info_box.classList.add(BOX_STATUSES.SUCCESS);
        break;

        case BOX_STATUSES.ERROR:
            info_box.classList.add(BOX_STATUSES.ERROR);
        break;

        case BOX_STATUSES.WARNING:
            info_box.classList.add(BOX_STATUSES.WARNING);
        break;

        default:
            info_box.classList.add(BOX_STATUSES.DEFAULT);
    }

    setTimeout(() => {
        info_box.classList.add('closing');
        setTimeout(() => info_box.classList.remove(...info_box.classList), INFO_BOX_ANIMATION_LENGTH);
    }, INFO_BOX_ACTIVE_LENGTH);
};

const display_alert_box = (message = '') => {
    const alert_box = document.querySelector('#alert-box');
    const alert_box_paragraph = alert_box.querySelector('.text > p');
    const alert_box_container = alert_box.querySelector('.container');

    alert_box_paragraph.textContent = message;
    manage_classes(['active'], 'add', [alert_box, alert_box_container]);

    const answer_promise = new Promise((resolve, reject) => {
        const choices = alert_box.querySelectorAll('.choice');
        choices.forEach(choice => {
            choice.addEventListener('click', e => {
                const choice_value = choice.getAttribute('data-choice-value');
                manage_classes(['closing'], 'add', [alert_box, alert_box_container]);

                resolve({'choice': choice_value === 'true' ? true : false});

                setTimeout(() => {
                    manage_classes(['active', 'closing'], 'remove', [alert_box, alert_box_container]);
                }, INFO_BOX_ANIMATION_LENGTH);
            });
        });
    });

    return answer_promise;
};

const arrow_icon = () => {
    return `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="160,128.4 192.3,96 352,256 352,256 352,256 192.3,416 160,383.6 287.3,256 "/></svg>`;
};

const get_random_color_hex = () => {
    let color = '#';
    
    for(let i = 0; i < 3; i++) {
        let random = parseInt(Math.random() * 255);
        color += random.toString(16);
    }

    return color;
};

const get_random_array_element = (array) => {
    const random_index = Math.floor(Math.random() * array.length);
    return array[random_index];
};

const trim_text = (text, length, append_at_end = '') => {
    const text_length = text.length;
    let new_text = text;

    if(text_length > length)
        new_text = `${text.substr(0, length)}${append_at_end}`;

    return new_text;
};

const clear_form = (parent_selector) => {
    const parent = document.querySelector(parent_selector);
    const inputs = parent.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
};

const get_string_slug = (string) => {
    let new_string = string.toLowerCase().replaceAll(' ', '_');
    return new_string;
};

const remove_all_additional_attributes = (element) => {
    [...element.attributes].forEach(attribute => {
        if(attribute.name !== 'class' && attribute.name !== 'id')
            element.removeAttribute(attribute.name);
    });
};

export { class_switch, manage_classes, display_info_box, display_alert_box, arrow_icon,
    get_random_color_hex, get_random_array_element, trim_text, clear_form,
    get_string_slug, remove_all_additional_attributes,
    SETTINGS_ITEM_NAME, WHEEL_X, WHEEL_Y, WHEEL_RADIUS, SHOULD_CREATE_INDICATOR,
    WHEEL_TEXT_MAX_LENGTH, BOX_STATUSES };