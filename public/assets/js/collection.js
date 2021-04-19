const collection = {

    addButtonElement: undefined,

    participantsCounter: 0,

    submittedParticipantsContainer: undefined,


    init: function () {
        collection.submittedParticipantsContainer = document.getElementById('submittedParticipants');
        
        if (collection.submittedParticipantsContainer != null) {
            collection.displaySubmittedParticipants();
        }else {
            collection.displayHostInput();
            collection.displayTheTwoRequiredGuests();
        };
        collection.addButtonElement = document.getElementById('add-button');
        collection.addButtonElement.addEventListener('click', collection.handleClickAddButton);
    },

    displaySubmittedParticipants: function (params) {
        let submittedParticipantsElements = document.getElementsByClassName('submittedParticipantsData');
        Array.from(submittedParticipantsElements).forEach(element => {
            let submittedName = element.dataset.name;
            let submittedEmail = element.dataset.email;
            if (collection.participantsCounter === 0) {
                collection.displayHostInput(submittedName, submittedEmail);
            } else {
                collection.addParticipantInput(submittedName, submittedEmail);
            }
        });
    },

    handleClickAddButton: function (evt) {
        collection.addParticipantInput();
    },
    
    addParticipantInput: function (submittedName = null, submittedEmail = null) {
        collection.participantsCounter++;
        let guestsContainerElement = document.querySelector('.form-guests');
        guestsContainerElement.appendChild(collection.cloneTemplateElement());
        if (submittedName != null && submittedEmail != null) {
            let nameInputElement = document.getElementById('event_participants___name___name');
            nameInputElement.setAttribute('value', submittedName);
            let emailInputElement = document.getElementById('event_participants___name___email');
            emailInputElement.setAttribute('value', submittedEmail);
        }
        collection.changeIndexOnInput();
    },

    displayHostInput: function (submittedName = null, submittedEmail = null) {
        collection.participantsCounter++;
        let hostContainerElement = document.querySelector('.form-host');
        hostContainerElement.appendChild(collection.cloneTemplateElement());
        if (submittedName != null && submittedEmail != null) {
            let nameInputElement = document.getElementById('event_participants___name___name');
            nameInputElement.setAttribute('value', submittedName);
            let emailInputElement = document.getElementById('event_participants___name___email');
            emailInputElement.setAttribute('value', submittedEmail);
        }
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