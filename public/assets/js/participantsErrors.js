const participantsErrors = {

    errorsListElement: undefined,

    init: function () {
        participantsErrors.errorsListElement = document.querySelector('.participants-errors-list ul');
        console.log(participantsErrors.errorsListElement);
        if (participantsErrors.errorsListElement !== null) {
            participantsErrors.errorsListElement = participantsErrors.errorsListElement.childNodes;
            participantsErrors.displayErrors();
        }
    },

    displayErrors: function () {
        console.log('test');
        document.querySelector('.participants-errors-list').removeAttribute('hidden');
    }
}

document.addEventListener('DOMContentLoaded', participantsErrors.init);