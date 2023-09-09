const INFO_BOX_ACTIVE_LENGTH = 4000;
const INFO_BOX_ANIMATION_LENGTH = 2000;

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

const display_info_box = (message = '', status = 'default') => {
    const info_box = document.querySelector('#info-box');
    const info_box_paragraph = info_box.querySelector('p');

    // Can't have two display boxes at the same time
    if(info_box.classList.contains('active')) return;

    info_box_paragraph.textContent = message;
    info_box.classList.remove(...info_box.classList);
    info_box.classList.add('active');

    switch(status) {
        case 'success':
            info_box.classList.add('success');
        break;

        case 'error':
            info_box.classList.add('error');
        break;

        case 'warning':
            info_box.classList.add('warning');
        break;

        default:
            info_box.classList.add('default');
    }

    setTimeout(() => {
        info_box.classList.add('closing');
        setTimeout(() => info_box.classList.remove(...info_box.classList), INFO_BOX_ANIMATION_LENGTH);
    }, INFO_BOX_ACTIVE_LENGTH);

};

const arrow_icon = () => {
    return `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="160,128.4 192.3,96 352,256 352,256 352,256 192.3,416 160,383.6 287.3,256 "/></svg>`;
};

export { class_switch, display_info_box, arrow_icon };