import { header } from "../../components/header";
import { footer } from "../../components/footer";

header();
footer();
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
document.querySelector(".singIn_form").onsubmit = function(event) {
    event.preventDefault();
    
    let inputs = document.querySelectorAll(".singIn_inp");

    let validators = {
        lastname: /^[А-ЯЁA-Z][А-Яа-яЁёA-Za-z]*$/, 
        name: /^[А-ЯЁA-Z][А-Яа-яЁёA-Za-z]*$/,     
        age: /^([1-9]|[1-9][0-9])$/,                 
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        phone_number: /^\+998\d{9}$/  
    };

    function validateInput(input) {
        let name = input.name;
        let value = input.value.trim();
        let regex = validators[name];

        if (!regex) return true;
        if (!regex.test(value)) {
            input.style.border = "2px solid red";
            return false;
        } else {
            input.style.border = "2px solid green";
            return true;
        }
    }

    function validateForm() {
        let isValid = true;
        for (let input of inputs) {
            if (!validateInput(input)) {
                isValid = false;
            }
        }
        return isValid;
    }

    for (let input of inputs) {
        input.oninput = function() {
            validateInput(input);
        };
    }

    if (validateForm()) {
        alert("Данные изменены");
        window.location.href = "/";
    } else {
        alert("Пожалуйста, заполните все поля правильно.");
    }
};
