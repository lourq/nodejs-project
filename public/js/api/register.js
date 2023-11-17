import { createNotify } from '/js/createElements/notify.js'
import { loginForm} from '../script/toggleForm.js'

const form = document.getElementById('registerForm');

const errorClass = 'input-error';
const normalClass = 'input-normal';

const registerUser = async (data) => {
    const response = await fetch('/api/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) return false;
    return response.ok;
};

const check = async (event) => {
    event.preventDefault();

    const password = form.registerPassword.value;
    const passwordConfirm = form.registerPasswordConfirm.value;

    if (password === passwordConfirm) {
        const data = { userName: form.registerUsername.value, password };

        const isSuccess = await registerUser(data);

        if (isSuccess) {
            loginForm();
            createNotify("ok!");
        } else {
            createNotify("error!");
        }
    } else {
        setBorder(form.registerPassword, errorClass);
        setBorder(form.registerPasswordConfirm, errorClass);
        
        createNotify('Wrong Password');

        setTimeout(() => {
            setBorder(form.registerPassword, normalClass);
            setBorder(form.registerPasswordConfirm, normalClass);
        }, 1000);
    }
};

const setBorder = (element, className) => {
    element.className = className;
};

form.addEventListener('submit', check);