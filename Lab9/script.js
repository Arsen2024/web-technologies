const countrySelect = document.getElementById('country');
const citySelect = document.getElementById('city');
const signupForm = document.querySelector('.signupForm');
const navButtons = document.querySelectorAll('.btn');
const loginForm = document.querySelector('.loginForm');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
let formIsValid = true;

navButtons.forEach(btn => btn.addEventListener('click', setActiveButton));
signupForm.addEventListener('submit', handleSignupFormSubmit);
signupBtn.addEventListener('click', handleSignupFormClick);
loginForm.addEventListener('submit', handleLoginFormSubmit);
loginBtn.addEventListener('click', handleLoginFormClick);
countrySelect.addEventListener('change', handleCountryChange);


function setActiveButton(e) {
    if (e.target.id === 'signupNavBtn') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
    } else {
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
    }
    navButtons.forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');
}

function handleLoginFormClick(e) {
    formIsValid = true;
    loginForm.classList.add('validated');
    const inputs = loginForm.querySelectorAll('input');
    deleteAllMessages(inputs);

    setInputMessages(inputs);
}

function handleSignupFormClick(e) {
    formIsValid = true;
    signupForm.classList.add('validated');
    const inputs = signupForm.querySelectorAll('input');
    deleteAllMessages(inputs);

    setInputMessages(inputs);
}

function deleteAllMessages(inputs) {
    inputs.forEach(input => {
        const nextElement = input.nextElementSibling;
        if (nextElement && (nextElement.className === 'error-message' || nextElement.className === 'success-message')) {
            nextElement.remove();
        }
    });
}

function setInputMessages(inputs) {
    inputs.forEach(input => {
        if (input.type !== 'radio' && input.type !== 'submit') {
            const div = document.createElement('div');
            if (!input.checkValidity()) {
                formIsValid = false;
                div.className = 'error-message';
                div.textContent = getErrorMessage(input);
            } else {
                div.className = 'success-message';
                div.textContent = 'Looks good!';
            }
            input.insertAdjacentElement('afterend', div);
        }
    });
}

function getErrorMessage(input) {
    if (input.validity.valueMissing) {
        return 'This field is required.';
    }
    if (input.validity.tooShort) {
        return `Must be at least ${input.minLength} characters.`;
    }
    if (input.validity.tooLong) {
        return `Must be no more than ${input.maxLength} characters.`;
    }
    if (input.validity.typeMismatch) {
        if (input.type === 'email') {
            return 'Please enter a valid email address.';
        }
        if (input.type === 'tel') {
            return 'Please enter a valid phone number.';
        }
    }
    if (input.validity.rangeUnderflow || input.validity.rangeOverflow) {
        return 'Value out of allowed range.';
    }
    if (input.validity.patternMismatch) {
        return 'Please match the requested format.';
    }
    if (input.validity.stepMismatch) {
        return 'Please enter a valid value.';
    }
    return 'Invalid input.';
}

function handleLoginFormSubmit(e) {
    e.preventDefault();

    if (formIsValid) {
        showSnackbar('You have been successfully login','green',loginForm);
    }
    formIsValid = true;
}

function handleSignupFormSubmit(e) {
    e.preventDefault();

    if (!validateBirthDate()) formIsValid = false;
    if (!validatePasswordMatch()) formIsValid = false;

    if (formIsValid) {
        showSnackbar('You have been successfully registered','green',signupForm);
    }
    formIsValid = true;
}

function validateBirthDate() {
    const birthDateInput = document.getElementById('birthDate');
    const div = birthDateInput.nextElementSibling;
    const today = new Date();
    const birthDate = new Date(birthDateInput.value);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (!birthDateInput.value || birthDate > today || age < 12) {
        birthDateInput.style.borderColor = 'red';
        setError(birthDateInput, div, 'You must be at least 12 years old');
        return false;
    }
    birthDateInput.style.borderColor = 'green';
    return true;
}

function validatePasswordMatch() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const div = confirmPasswordInput.nextElementSibling;

    if (passwordInput.value !== confirmPasswordInput.value) {
        passwordInput.style.borderColor = 'red';
        confirmPasswordInput.style.borderColor = 'red';
        setError(confirmPasswordInput, div, 'Passwords do not match');

        const message = passwordInput.nextElementSibling;
        message.style.color = 'red';
        message.textContent = 'Passwords do not match';
        return false;
    }
    passwordInput.style.borderColor = 'green';
    confirmPasswordInput.style.borderColor = 'green';
    return true;
}

const citiesByCountry = {
    'Ukraine': ['Kyiv', 'Lviv', 'Odesa'],
    'USA': ['New York', 'Los Angeles', 'Chicago'],
    'Germany': ['Berlin', 'Munich', 'Hamburg']
};

function handleCountryChange() {
    const selectedCountry = this.value;
    resetCitySelect();

    if (selectedCountry && citiesByCountry[selectedCountry]) {
        populateCities(citiesByCountry[selectedCountry]);
        citySelect.disabled = false;
    } else {
        citySelect.disabled = true;
    }
}

function setError(input, errorDiv, message) {
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.insertAdjacentElement('afterend', errorDiv);
}

function resetCitySelect() {
    citySelect.innerHTML = '<option value="">Select city</option>';
}

function populateCities(cities) {
    cities.forEach(city => {
        const option = new Option(city, city);
        citySelect.appendChild(option);
    });
}

function showSnackbar(message, color = "#333", form) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.style.backgroundColor = color;
    snackbar.classList.add("show");

    setTimeout(() => {
        snackbar.classList.remove("show");
        form.submit();
    }, 3000);
}

