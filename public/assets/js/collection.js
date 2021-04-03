const collection = {

    addButtonElement: undefined,


    init: function () {
        collection.addButtonElement = document.getElementById('add-button');
        collection.addButtonElement.addEventListener('click', collection.handleClickButton);
    },

    handleClickButton: function (evt) {
        console.log('test');
        let templateElement = document.getElementById('participant-form-template');
        let participantFormElement = templateElement.content.cloneNode(true);
        let participantContainerElement = document.querySelector('.form-participants');
        participantContainerElement.appendChild(participantFormElement);
    }
}

document.addEventListener('DOMContentLoaded', collection.init);