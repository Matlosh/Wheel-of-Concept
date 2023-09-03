import { create_wheel, draw_wheel, spin_wheel } from "wheel";

const init = () => {
    const canvas = document.querySelector('#wheel');
    if(!canvas.getContext) return false;

    const ctx = canvas.getContext('2d');

    
    let wheel = create_wheel(ctx, 300, 300, 250, 5, true);
    draw_wheel(wheel);
    spin_wheel(wheel, 3);

    return true;
};

window.addEventListener('load', e => {
    if(!init()) alert("Canvas is not supported.");
});