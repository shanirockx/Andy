document.addEventListener("DOMContentLoaded", function() {
    animate();
})

const animate = () => {
    const counter = document.querySelector('.counter-div');
    const maxValue = +174536 + 4000;
    let currentValue = +counter.innerText.replace(/,/g, '');
    const updateCounter = () => {
        const increment = (maxValue - currentValue) / 30;
        currentValue += increment;
        if (currentValue < maxValue) {
            counter.innerText = Math.ceil(currentValue).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = maxValue.toLocaleString();
        }
    };
    updateCounter();
};