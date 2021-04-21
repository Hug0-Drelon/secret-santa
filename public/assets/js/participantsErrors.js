const participantsErrors = {

    errorsListElement: undefined,

    init: function () {
        participantsErrors.errorsListElement = document.querySelector('.participants-errors-list ul');
        if (participantsErrors.errorsListElement !== null) {
            const errorsNodeList = participantsErrors.errorsListElement.childNodes;
            participantsErrors.displayErrors(errorsNodeList);
        }
    },

    displayErrors: function (errorsNodeList) {
        const errorsArray = Array.from(errorsNodeList);
        let sortedErrorsArray = [];

        errorsArray.filter((element, index) => {
            if (!sortedErrorsArray.includes(element.innerText)) {
                sortedErrorsArray.push(element.innerText);
            }
        });

        while (participantsErrors.errorsListElement.lastElementChild) {
            participantsErrors.errorsListElement.removeChild(participantsErrors.errorsListElement.lastElementChild);
        };
        
        sortedErrorsArray.forEach(element => {
            const liElement = document.createElement("LI");
            liElement.innerText = element;
            participantsErrors.errorsListElement.appendChild(liElement);
        });
        
        document.querySelector('.participants-errors-list').removeAttribute('hidden');
    }
}

document.addEventListener('DOMContentLoaded', participantsErrors.init);