import { show_wheel } from "mechanics";
import { class_switch, WHEEL_X, WHEEL_Y, WHEEL_RADIUS, SHOULD_CREATE_INDICATOR } from "reusable";
import { inflate_panel } from "control_panel";
import wheel_data from "data/wheels.json" assert { type: 'json' };
import controls_data from "data/controls.json" assert { type: 'json' };

const canvas_init = () => {
    const did_show = show_wheel(WHEEL_X, WHEEL_Y, WHEEL_RADIUS, wheel_data[0].elements, SHOULD_CREATE_INDICATOR, wheel_data[0].id);
    return did_show;
};

const menu_behavior = () => {
    const shrink_expand_button = document.querySelector('#shrink-expand-button');
    const control_panel = document.querySelector('#control-panel');

    shrink_expand_button.addEventListener('click', e => {
        class_switch(control_panel, 'expanded', 'shrunk');

        if(shrink_expand_button.classList.contains('shrink'))
            setTimeout(() => class_switch(shrink_expand_button, 'expand', 'shrink'), 1000);
        else
            class_switch(shrink_expand_button, 'expand', 'shrink');
    });
};

const control_panel_init = () => {
    const control_panel_container = document.querySelector('#control-panel > .panel-container');
    inflate_panel(controls_data, 'menu', control_panel_container);

    const panel_menu_menu = document.querySelector('#control-panel > .panel-menu > .menu');
    panel_menu_menu.addEventListener('click', () => inflate_panel(controls_data, 'menu', control_panel_container));
};

window.addEventListener('load', e => {
    if(!canvas_init()) alert("Canvas is not supported.");

    menu_behavior();
    control_panel_init();
});