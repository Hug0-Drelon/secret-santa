const collection = {

    addButtonElement: undefined,

    participantsCounter: 0,


    init: function () {
        collection.displayHostInput();
        collection.displayTheTwoRequiredGuests();
        collection.addButtonElement = document.getElementById('add-button');
        collection.addButtonElement.addEventListener('click', collection.handleClickAddButton);
    },

    handleClickAddButton: function (evt) {
        collection.participantsCounter++;
        let guestsContainerElement = document.querySelector('.form-guests');
        guestsContainerElement.appendChild(collection.cloneTemplateElement());
        collection.changeIndexOnInput();
    },

    displayHostInput: function () {
        collection.participantsCounter++;
        let hostContainerElement = document.querySelector('.form-host');
        hostContainerElement.appendChild(collection.cloneTemplateElement());
        collection.changeIndexOnInput();
    },

    displayTheTwoRequiredGuests: function () {
        for (let index = 0; index < 2; index++) {
            collection.participantsCounter++;
            let guestsContainerElement = document.querySelector('.form-guests');
            guestsContainerElement.appendChild(collection.cloneTemplateElement());
            collection.changeIndexOnInput();
        }
    },

    cloneTemplateElement: function () {
        let templateElement = document.getElementById('participant-form-template');

        return templateElement.content.cloneNode(true);
    },

    changeIndexOnInput: function () {
        let nameInputElement = document.getElementById('event_participants___name___name');
        let emailInputElement = document.getElementById('event_participants___name___email');
        nameInputElement.setAttribute('name', 'event[participants]['+collection.participantsCounter.toString()+'][name]');
        nameInputElement.id = ('event_participants___'+collection.participantsCounter.toString()+'___name');
        emailInputElement.setAttribute('name', 'event[participants]['+collection.participantsCounter.toString()+'][email]');
        emailInputElement.id = ('event_participants___'+collection.participantsCounter.toString()+'___email');
    }
}

document.addEventListener('DOMContentLoaded', collection.init);