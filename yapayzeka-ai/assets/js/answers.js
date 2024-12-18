document.addEventListener('DOMContentLoaded', function () {
    localStorage.removeItem('answers');
});

function nextSection(currentSectionId, nextSectionId) {
    if (currentSectionId.includes("question")) {
        const radios = document.getElementsByName(currentSectionId);
        let isChecked = false;
        let selectedValue = '';

        for (let radio of radios) {
            if (radio.checked) {
                isChecked = true;
                selectedValue = radio.value;
                break;
            }
        }

        if (!isChecked) {
            alert('Please select an option before continuing.');
            return;
        }

        let answers = localStorage.getItem('answers');
        let updatedAnswers = {};

           if (answers) {
            answers.split(' | ').forEach(answer => {
                const [key, value] = answer.split(': ');
                updatedAnswers[key] = value;
            });
        }

        const questionNumber = currentSectionId.replace('question-', 'q');
        updatedAnswers[questionNumber] = selectedValue;

        const newAnswersString = Object.entries(updatedAnswers)
            .map(([key, value]) => `${key}: ${value}`)
            .join(' | ');

        localStorage.setItem('answers', newAnswersString);
        //console.log(' answers:', newAnswersString);
    }

    document.getElementById(currentSectionId).style.display = 'none';
    document.getElementById(nextSectionId).style.display = 'flex';
}

function previousSection(currentSectionId, nextSectionId) {
    document.getElementById(currentSectionId).style.display = 'none';
    document.getElementById(nextSectionId).style.display = 'flex';
}

