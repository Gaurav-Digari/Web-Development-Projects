const checkbox = document.querySelectorAll('.checkbox')
const inputFields = document.querySelectorAll('.goal')
const progressBar = document.querySelector('.progress-bar')
const errorLabel = document.querySelector('.error-label');
const progressValue = document.querySelector('.progress-value')

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

checkbox.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {

        const areAllGoalsFilled = [...inputFields].every(function (input) {
            return input.value
        })

        if (areAllGoalsFilled) {

            checkbox.parentElement.classList.toggle("completed")

            const inputId = checkbox.nextElementSibling.id

            allGoals[inputId].completed =
                !allGoals[inputId].completed

            const input = checkbox.nextElementSibling

            if (allGoals[inputId].completed) {
                input.readOnly = true
            }
            else {
                input.readOnly = false
            }

            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }

        else {
            errorLabel.parentElement.classList.add("show-error")
        }
    })
})


inputFields.forEach((input) => {

    if (allGoals[input.id]) {
        input.value = allGoals[input.id].name

        if (allGoals[input.id].completed) {
            input.parentElement.classList.add("completed")
            input.readOnly = true
        }
    }

    input.addEventListener('focus', (e) => {
        errorLabel.parentElement.classList.remove("show-error")
    })

    input.addEventListener('input', (e) => {

        if (allGoals[input.id] && allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }
    })
})


inputFields.forEach((input) => {

    input.addEventListener('input', () => {

        const filledGoals = [...inputFields].filter(input => input.value.trim() !== "").length

        if (filledGoals === 1) {
            progressValue.style.width = "34%"
        }
        else if (filledGoals === 2) {
            progressValue.style.width = "68%"
        }
        else if (filledGoals === 3) {
            progressValue.style.width = "100%"
        }
        else {
            progressValue.style.width = "0%"
        }

    })
})


inputFields.forEach((input) => {

    input.addEventListener('input', (e) => {

        allGoals[input.id] =
        {
            name: input.value,
            completed: false
        }

        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})