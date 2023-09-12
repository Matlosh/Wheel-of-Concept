import { SETTINGS_ITEM_NAME } from "reusable";
import template_wheels from "data/wheels.json" assert { type: 'json' };
import { get_input_template } from "control_panel";

// Display all available wheels to choose in the given element
const display_wheels = (element) => {
    let wheels = JSON.parse(localStorage.getItem(SETTINGS_ITEM_NAME)).wheels;
    if(wheels === null) wheels = template_wheels;

    wheels.forEach(wheel => {
        let inner_html = `
            <p>${wheel.name}</p>
        `;
        
        let input_html = get_input_template('choose-wheel', `wheel-id="${wheel.id}"`, inner_html);
        element.insertAdjacentHTML('beforeend', input_html);
    });
 
    // continue here with displaying the chosen wheels
};

export { display_wheels };