const collection = {

    addButtonElement: undefined,

    participantsCounter: 0,


    init: function () {
        collection.addButtonElement = document.getElementById('add-button');
        collection.addButtonElement.addEventListener('click', collection.handleClickAddButton);
    },

    handleClickAddButton: function (evt) {
        collection.participantsCounter++;
        let templateElement = document.getElementById('participant-form-template');
        let participantFormElement = templateElement.content.cloneNode(true);
        let participantContainerElement = document.querySelector('.form-participants');
        participantContainerElement.appendChild(participantFormElement);
        let nameInputElement = document.getElementById('event_participants___name___name');
        let emailInputElement = document.getElementById('event_participants___name___email');
        nameInputElement.setAttribute('name', '<event[participants]['+collection.participantsCounter.toString()+'][name]');
        nameInputElement.id = ('event_participants___'+collection.participantsCounter.toString()+'___name');
        emailInputElement.setAttribute('name', '<event[participants]['+collection.participantsCounter.toString()+'][email]');
        emailInputElement.id = ('event_participants___'+collection.participantsCounter.toString()+'___email');
    }
}

document.addEventListener('DOMContentLoaded', collection.init);