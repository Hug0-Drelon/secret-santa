const animations = {
    formTitleElements: undefined,

    init: function () {
        animations.formTitleElements = document.querySelectorAll('.form-title');
        let delay = 400;
        animations.formTitleElements.forEach(element => {
            setTimeout(animations.addAnimateClass, delay, element, 'form-title--animated');
            delay += 400;
        });
    },
    
    addAnimateClass: function (element, className) {
        element.classList.add(className);
    },
}

document.addEventListener('DOMContentLoaded', animations.init);