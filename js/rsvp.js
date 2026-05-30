const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwpI0BI06nF4KtWT_gXX3RrNVfZSMATwtE8wK7rXHZmc2I4kAalzvK4l1C3xRlTzY8Xjw/exec";

document
.getElementById("rsvpForm")
.addEventListener("submit", async function (e) {

    e.preventDefault();

    const attendance =
        document.querySelector(
            'input[name="attendance"]:checked'
        ).value;

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        attendance: attendance,
        message: document.getElementById("message").value
    };

    try {

        const response = await fetch(
            SCRIPT_URL,
            {
                method: "POST",
                body: JSON.stringify(formData)
            }
        );

        const result = await response.json();

        if (result.success) {

            document
                .getElementById("rsvp-success")
                .innerHTML =
                "Thank you! Your RSVP has been submitted.";

            this.reset();
        }

    } catch (error) {

        alert(
            "Something went wrong. Please try again."
        );

    }

});