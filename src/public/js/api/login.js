import { createNotify } from '/utils/notify.js'

const form = document.getElementById('loginForm');

const errorClass = 'input-error';
const normalClass = 'input-normal';

const loginUser = async (data) => {
    const response = await fetch('/api/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok && response.redirected) return true;
    return false;   
};

const check = async (event) => {
    event.preventDefault();

    const data = { userName: form.loginUsername.value, password : form.loginPassword.value};

    const isSuccess = await loginUser(data);

    if(isSuccess){
        window.location.href = '/menu';
    }
    else {
        setBorder(form.loginUsername, errorClass);
        setBorder(form.loginPassword, errorClass);
        
        createNotify('Wrong Data !');

        setTimeout(() => {
            setBorder(form.loginUsername, normalClass);
            setBorder(form.loginPassword, normalClass);
        }, 1000);
    }
};

const setBorder = (element, className) => {
    element.className = className;
};

form.addEventListener('submit', check);