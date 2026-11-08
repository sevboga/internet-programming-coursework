const name_input = document.querySelector("#name");
const email_input = document.querySelector("#email");
const subject_input = document.querySelector("#subject");
const message_input = document.querySelector("#message");
const form_message = document.querySelector("#form_message");
const send_button = document.querySelector("#send_btn");

//confirm popup
const confirm_modal = new bootstrap.Modal(
    document.querySelector("#confirm_modal")
);

//show error and success message
function show_message(text, type) {
    form_message.textContent = text;
    form_message.classList.remove("text-danger", "text-success");
    form_message.classList.add(type);
}

function validation () {
    const name = name_input.value.trim();
    const email = email_input.value.trim();
    const subject = subject_input.value.trim();
    const message = message_input.value.trim();

    if (name.length < 3) {
        show_message("Please enter your name (at least 3 characters).", "text-danger");
    }
    /* !!Initial concept!!
    else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        show_message("Please enter a valid email address.", "text-danger");
    }
        !!on the following else if, there is an improved validation with built-in validity, browser automatically checks whether the entered text follows a basic email format.!!
    */
    else if (email === ""|| !email_input.checkValidity()) {
        show_message("Please enter a valid email address.", "text-danger");
    }
    else if (subject.length < 3) {
        show_message("Please enter a subject (at least 3 characters).", "text-danger");
    }
    else if (message.length < 10) {
        show_message("Your message is too short (at least 10 characters).", "text-danger");
    }
    else {
        //show the successfully submitted form
        document.querySelector("#confirm_name").textContent = name;
        document.querySelector("#confirm_email").textContent = email;
        document.querySelector("#confirm_subject").textContent = subject;
        document.querySelector("#confirm_message").textContent = message;

        //show confirm popup
        confirm_modal.show();

        //clearing the form
        name_input.value = "";
        email_input.value = "";
        subject_input.value = "";
        message_input.value = "";
        form_message.textContent = "";
    }
}

// click btn
send_button.addEventListener("click", validation);