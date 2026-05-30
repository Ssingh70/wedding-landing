const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxYAk8_Q2tTmSy6OoUysTJm0wqAiRW-K7yPmwBHaKtAbmLacnQoWSrHAK9zzGqHQ-IBKg/exec";

document.getElementById("rsvpForm")
.addEventListener("submit", async function (e) {

    e.preventDefault();

    const popup = document.getElementById("successPopup");
    const popupMessage = document.getElementById("popupMessage");

    const attendance = document.querySelector(
        'input[name="attendance"]:checked'
    ).value;

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        attendance: attendance,
        message: document.getElementById("message").value
    };

    try {

        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        popupMessage.textContent =
            "Thank you for your response 💖";

        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
        }, 2300);

        this.reset();

    } catch (error) {

        console.error(error);

        popupMessage.textContent =
            "Something went wrong. Please try again 😔";

        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
        }, 2300);
    }

});