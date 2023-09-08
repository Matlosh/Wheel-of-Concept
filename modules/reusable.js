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

export { class_switch };