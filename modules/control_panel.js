import { arrow_icon, display_info_box, clear_form, SETTINGS_ITEM_NAME } from "reusable";
import templates_data from "data/templates.json" assert { type: 'json' };
import { display_available_wheels, display_wheels_to_delete } from "control_panel_actions"; 

// Each action must return true if resolved, else false
const CONTROL_PANEL_ACTIONS = {
    'display_available_wheels_action': display_available_wheels,
    'display_wheels_to_delete_action': display_wheels_to_delete
};

// Control's input template
const get_input_template = (additional_classes, additional_data, inner_html) => {
    return `
        <div class="form-group flex-container dir-row ${additional_classes}" ${additional_data}>
            ${inner_html}
        </div>
    `;
};

const create_input = (option) => {
    let option_name_slug = option.name.toLowerCase().replace(' ', '_');
    let option_additional_info = option.hasOwnProperty('additional_info') ? option.additional_info : '';
    let input_html = '';

    switch(option.type) {
        case 'redirect-to-controls':
            input_html = get_input_template(option.type, `data-redirect-to="${option.redirect_to}"`, `
                <p>${option.name}</p>
                <div class="arrow-icon">
                    ${arrow_icon()}
                </div>`);
        break;

        case 'submit':
        case 'button':
            input_html = get_input_template(option.type, '', `
                <div class="button">
                    <p>${option.name}</p>
                </div>
                <span>${option_additional_info}</span>
            `);
        break;

        default:
            input_html = get_input_template(option.type, '', `
                <label for="${option_name_slug}">${option.name}</label>
                ${option.type === 'checkbox' ? '<div class="input-container">' : ''}
                    <input type="${option.type}" name="${option_name_slug}" autocomplete="off">
                ${option.type === 'checkbox' ? '</div>' : ''}
                <span>${option_additional_info}</span>
            `);
    }

    return input_html;
};

// Prepares redirect inputs (if any)
const prepare_redirect_inputs = (controls_json, element) => {
    // Redirecting based on data-redirect-to attribute
    const redirect_to_inputs = document.querySelectorAll('.redirect-to-controls');
    redirect_to_inputs.forEach(input => {
        const redirect_to_controls = input.getAttribute('data-redirect-to');

        const redirect = () => {
            inflate_panel(controls_json, redirect_to_controls, element);

            redirect_to_inputs.forEach(input => {
                input.removeEventListener('click', redirect);
            });
        };

        input.addEventListener('click', redirect);
    });
};

// Prepares one (only one submit should be in each controls panel) submit
const prepare_submit = (controls_json, controls_slug) => {
    const submit = document.querySelector('#control-panel .submit');
    if(!submit) return;

    submit.addEventListener('click', e => {
        save_settings(controls_json, controls_slug);
    });
};

// Inflates menu in a given element based on a provided json of a menu
const inflate_panel = (controls_json, controls_slug, element) => {
    const controls = controls_json[controls_slug];
    let menu_html = `<h2>${controls.title}</h2>`;
    
    element.innerHTML = '';
    if(!controls.hasOwnProperty('options') && controls.hasOwnProperty('action')) {
        CONTROL_PANEL_ACTIONS[controls['action']](element);
    }

    if(controls.hasOwnProperty('options')) {
        controls.options.forEach(option => {
            menu_html += create_input(option);
        });
    }
    element.insertAdjacentHTML('afterbegin', menu_html);

    prepare_redirect_inputs(controls_json, element);
    prepare_submit(controls_json, controls_slug);
};

// Finds template name in the controls_data and returns it or empty string if not found
const find_template_name = (controls_data) => {
    let template_name = '';
    controls_data.options.forEach(option => {
        if(option.type === 'submit' && option.hasOwnProperty('template_name'))
            template_name = option.template_name;
    });

    return template_name;
};

// Creates json using data from controls_data by mapping it with template_json rules
const create_json_from_template = (template_json, controls_data) => {
    let json = {};
    json['id'] = Date.now();
    let template_name = find_template_name(controls_data);

    controls_data.options.forEach(option => {
        let option_name_slug = option.name.toLowerCase().replace(' ', '_');
        const option_input = document.querySelector(`#control-panel .panel-container input[name="${option_name_slug}"]`);

        if(option.hasOwnProperty('template_key') && !option.hasOwnProperty('template_key_function')) {
            json[option.template_key] = option_input.value;
        }

        if(option.hasOwnProperty('template_key') && option.hasOwnProperty('template_key_function')
            && option.hasOwnProperty('template_key_parent')) {
            let option_value = option_input.value;
            const template_key = option.template_key;
            const template_key_parent = option.template_key_parent;

            if(json[template_key_parent] === undefined)
                json[template_key_parent] = [];

            if(option.template_key_function === 'split') {
                let option_values = option_value.split(',');
                
                for(let i = 0; i < option_values.length; i++) {
                    if(json[template_key_parent][i] === undefined) {
                        let element = {};
                        element[template_key] = option_values[i].trim();

                        json[template_key_parent][i] = element;
                        continue;
                    }

                    json[template_key_parent][i][template_key] = option_values[i].trim();
                }
            }
        }
    });

    return json;
};

// Appends or removes data to/from the passed setting
const manage_existing_setting = (submit_option, settings, controls_json, controls_slug) => {
    const action = submit_option.hasOwnProperty('append_to') ? 'append_to' : 'remove_from';
    const append_to = submit_option[action];

    if(!settings.hasOwnProperty(append_to)) settings[append_to] = [];

    switch(action) {
        case 'append_to':
            const json = create_json_from_template(templates_data, controls_json[controls_slug]);
            settings[append_to].push(json);
        break;

        case 'remove_from':
            // not implemented yet
        break;
    }

    display_info_box('Created!', 'success');
};

// Override whole control setting options with new ones
const override_control_setting_options = (settings, controls_json, controls_slug) => {
    settings[controls_slug] = {};

    controls_json[controls_slug].options.forEach(option => {
        if(!option.save && option.save !== true) return;

        const option_name_slug = option.name.toLowerCase().replace(' ', '_');
        const option_input = document.querySelector(`#control-panel input[name="${option_name_slug}"]`);
        
        settings[controls_slug][option_name_slug] = option_input.value;
    });

    display_info_box('Saved!', 'success');    
};

// Saves settings to the localStorage
const save_settings = (controls_json, controls_slug) => {
    let settings = JSON.parse(localStorage.getItem(SETTINGS_ITEM_NAME));

    if(!settings) {
        localStorage.setItem(SETTINGS_ITEM_NAME, '{}');
        settings = {};
    }

    // Searches for a submit option
    let submit_option = '';
    controls_json[controls_slug].options.forEach(option => {
        if(option.type === 'submit')
            submit_option = option;
    });

    if(submit_option.hasOwnProperty('append_to') || submit_option.hasOwnProperty('remove_from'))
        manage_existing_setting(submit_option, settings, controls_json, controls_slug);
    else
        override_control_setting_options(settings, controls_json, controls_slug);

    localStorage.setItem(SETTINGS_ITEM_NAME, JSON.stringify(settings));
    clear_form('#control-panel > .panel-container');
};

export { inflate_panel, save_settings, get_input_template };