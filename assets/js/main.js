import { create_wheel, draw_wheel, spin_wheel } from "wheel";
import wheel_data from "wheel_data" assert { type: 'json' };

const init = () => {
    const canvas = document.querySelector('#wheel');
    if(!canvas.getContext) return false;

    const ctx = canvas.getContext('2d');

    let wheel = create_wheel(ctx, 300, 300, 250, wheel_data, true);
    draw_wheel(wheel);

    const wheel_output = document.querySelector('#wheel-output');
    const start_button = document.querySelector('.start-button');
    start_button.addEventListener('click', e => {
        spin_wheel(wheel, 3, e.target, wheel_output);
    });

    return true;
};

window.addEventListener('load', e => {
    if(!init()) alert("Canvas is not supported.");
});