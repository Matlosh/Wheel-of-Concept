import { arrow_icon, display_info_box } from "reusable";

const create_input = (option) => {
    let option_name_slug = option.name.toLowerCase().replace(' ', '_');
    let option_additional_info = option.hasOwnProperty('additional_info') ? option.additional_info : '';
    let input_html = '';

    switch(option.type) {
        case 'redirect-to-controls':
            input_html = `
                <div class="form-group flex-container dir-row ${option.type}"
                    data-redirect-to="${option.redirect_to}">
                    <p>${option.name}</p>
                    <div class="arrow-icon">
                        ${arrow_icon()}
                    </div>
                </div>
            `;
        break;

        case 'submit':
        case 'button':
            input_html = `
                <div class="form-group flex-container dir-column ${option.type}">
                    <div class="button">
                        <p>${option.name}</p>
                    </div>
                    <span>${option_additional_info}</span>
                </div>
            `;
        break;

        default:
            input_html = `
                <div class="form-group flex-container dir-row ${option.type}">
                    <label for="${option_name_slug}">${option.name}</label>
                    ${option.type === 'checkbox' ? '<div class="input-container">' : ''}
                        <input type="${option.type}" name="${option_name_slug}" autocomplete="off">
                    ${option.type === 'checkbox' ? '</div>' : ''}
                    <span>${option_additional_info}</span>
                </div>
            `;
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
    controls.options.forEach(option => {
        menu_html += create_input(option);
    });
    element.insertAdjacentHTML('beforeend', menu_html);

    prepare_redirect_inputs(controls_json, element);
    prepare_submit(controls_json, controls_slug);
};

// Appends or removes data to/from the passed setting
const manage_existing_setting = (submit_option, settings, controls_json, controls_slug) => {
    const action = submit_option.hasOwnProperty('append_to') ? 'append_to' : 'remove_from';
    const append_to = submit_option[action];

    if(!settings.hasOwnProperty(append_to)) settings[append_to] = [];

    if(action === 'append_to') {

    }

    display_info_box('Created new wheel!', 'success');
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
    let settings = JSON.parse(localStorage.getItem('settings'));

    if(!settings)
        localStorage.setItem('settings', '{}');

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

    localStorage.setItem('settings', JSON.stringify(settings));
};

export { inflate_panel, save_settings };