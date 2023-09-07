// Checks which element was drawn (was on indicator's degree) and returns it
const get_drawn_element = (wheel, indicator_degree) => {
    let drawn_element = null;
    
    wheel.elements.forEach(element => {
        const degree_start = element.degree_start - Math.floor(element.degree_start / 360) * 360;
        const degree_end = element.degree_end - Math.floor(element.degree_end / 360) * 360;

        console.log(degree_start, degree_end, indicator_degree, element.element.name);
        if(degree_start < indicator_degree && degree_end >= indicator_degree)
            drawn_element = element;
    });

    return drawn_element;
};

export { get_drawn_element };