import { create_wheel, draw_wheel, spin_wheel } from "wheel";
import wheel_data from "wheel_data" assert { type: 'json' };
import { class_switch } from "reusable";

const canvas_init = () => {
    const canvas = document.querySelector('#wheel');
    if(!canvas.getContext) return false;

    const ctx = canvas.getContext('2d');

    let wheel = create_wheel(ctx, 300, 300, 250, wheel_data, true);
    draw_wheel(wheel);

    const wheel_output = document.querySelector('#wheel-output');
    const start_button = document.querySelector('.start-button');
    start_button.addEventListener('click', e => {
        spin_wheel(wheel, 5, e.target, wheel_output);
    });

    return true;
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

window.addEventListener('load', e => {
    if(!canvas_init()) alert("Canvas is not supported.");

    menu_behavior();
});