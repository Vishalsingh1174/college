// =====================================================
// BIRTHDAY WEBSITE JAVASCRIPT
// =====================================================


let selectedPerson = "";
let personName = "";
let selectedStyle = "";


// =====================================================
// SELECT PERSON
// =====================================================

function selectPerson(person) {

    selectedPerson = person;

    console.log("Selected:", selectedPerson);


    document
        .getElementById("step1")
        .classList.remove("active");


    document
        .getElementById("step2")
        .classList.add("active");


    document.getElementById("personText").innerHTML =
        `You selected <strong>${person}</strong> 💖<br>
        Now tell me their beautiful name...`;


    document
        .getElementById("nameInput")
        .focus();
}



// =====================================================
// SUBMIT NAME
// =====================================================

function submitName() {

    let input =
        document.getElementById("nameInput");


    personName =
        input.value.trim();


    if (personName === "") {

        alert(
            "Please enter a name 💖"
        );

        input.focus();

        return;
    }


    document
        .getElementById("step2")
        .classList.remove("active");


    document
        .getElementById("step3")
        .classList.add("active");
}



// =====================================================
// SELECT MESSAGE STYLE
// =====================================================

function selectStyle(style) {

    selectedStyle = style;


    document
        .getElementById("step3")
        .classList.remove("active");


    document
        .getElementById("final")
        .classList.add("active");


    // ===============================
    // NAME
    // ===============================

    document
        .getElementById("finalName")
        .innerText = personName;


    // ===============================
    // MESSAGE
    // ===============================

    let message = "";


    if (style === "cute") {

        message =
            `May your birthday be filled with smiles, happiness, sweet memories and lots of love. 💕`;
    }


    else if (style === "emotional") {

        message =
            `You are truly special and deserve all the happiness in the world. May every dream in your heart come true. ❤️`;
    }


    else if (style === "funny") {

        message =
            `Another year older, wiser... or at least better at pretending! 😂 Keep smiling and enjoy your day!`;
    }


    else {

        message =
            `May this beautiful new chapter bring endless happiness, success, love and unforgettable moments. You deserve the very best! ✨`;
    }


    // ===============================
    // TITLE
    // ===============================

    let title = "Happy Birthday! 🎂";


    if (selectedPerson === "Sister") {

        title =
            "Happy Birthday, Sis! 💖";
    }


    else if (selectedPerson === "Brother") {

        title =
            "Happy Birthday, Bro! 💙";
    }


    else if (selectedPerson === "Friend") {

        title =
            "Happy Birthday, Bestie! 💕";
    }


    else if (selectedPerson === "Mom") {

        title =
            "Happy Birthday, Mom! ❤️";
    }


    else if (selectedPerson === "Dad") {

        title =
            "Happy Birthday, Dad! 💙";
    }


    document
        .getElementById("finalTitle")
        .innerText = title;


    // ===============================
    // MESSAGE TYPE EFFECT
    // ===============================

    typeMessage(message);


    // ===============================
    // CONFETTI
    // ===============================

    createConfetti();


    // ===============================
    // EXTRA PARTICLES
    // ===============================

    createParticles();
}



// =====================================================
// TYPE MESSAGE
// =====================================================

function typeMessage(text) {

    let element =
        document.getElementById("finalMessage");


    element.innerText = "";


    let index = 0;


    let timer =
        setInterval(() => {

            if (index < text.length) {

                element.innerText +=
                    text.charAt(index);

                index++;

            }

            else {

                clearInterval(timer);
            }

        }, 28);
}



// =====================================================
// GO BACK
// =====================================================

function goBack(step) {

    if (step === 2) {

        document
            .getElementById("step2")
            .classList.remove("active");


        document
            .getElementById("step1")
            .classList.add("active");
    }


    if (step === 3) {

        document
            .getElementById("step3")
            .classList.remove("active");


        document
            .getElementById("step2")
            .classList.add("active");
    }
}



// =====================================================
// CONFETTI
// =====================================================

function createConfetti() {

    let container =
        document.getElementById("confetti");


    // Clear old confetti

    container.innerHTML = "";


    for (
        let i = 0;
        i < 140;
        i++
    ) {

        let piece =
            document.createElement("div");


        piece.classList.add(
            "confetti"
        );


        piece.style.left =
            Math.random() * 100 + "vw";


        piece.style.animationDelay =
            Math.random() * 1.5 + "s";


        piece.style.animationDuration =
            2.5 +
            Math.random() * 2 +
            "s";


        piece.style.transform =
            `rotate(
                ${Math.random() * 360}deg
            )`;


        piece.style.background =
            randomColor();


        // Different shapes

        if (Math.random() > 0.5) {

            piece.style.borderRadius =
                "50%";
        }


        container.appendChild(piece);


        setTimeout(() => {

            piece.remove();

        }, 5500);
    }
}



// =====================================================
// RANDOM CONFETTI COLOR
// =====================================================

function randomColor() {

    let colors = [

        "#ff4f9a",
        "#ffd166",
        "#06d6a0",
        "#4cc9f0",
        "#ffffff",
        "#c77dff",
        "#ff9f1c"

    ];


    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];
}



// =====================================================
// EXTRA FLOATING PARTICLES
// =====================================================

function createParticles() {

    let container =
        document.getElementById("particles");


    container.innerHTML = "";


    let symbols = [
        "✨",
        "💖",
        "💕",
        "⭐",
        "✦"
    ];


    for (
        let i = 0;
        i < 30;
        i++
    ) {

        let particle =
            document.createElement("div");


        particle.innerText =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.position =
            "fixed";


        particle.style.left =
            Math.random() * 100 + "vw";


        particle.style.top =
            Math.random() * 100 + "vh";


        particle.style.fontSize =
            10 +
            Math.random() * 18 +
            "px";


        particle.style.opacity =
            0.2 +
            Math.random() * 0.7;


        particle.style.pointerEvents =
            "none";


        particle.style.zIndex =
            "50";


        particle.style.animation =
            `particleFloat ${
                3 + Math.random() * 4
            }s infinite alternate ease-in-out`;


        container.appendChild(
            particle
        );
    }
}



// =====================================================
// MAKE A WISH
// =====================================================

function makeWish() {

    let container =
        document.getElementById(
            "wishExplosion"
        );


    container.innerHTML = "";


    let symbols = [
        "💖",
        "✨",
        "⭐",
        "💕",
        "🌟",
        "🎉"
    ];


    for (
        let i = 0;
        i < 60;
        i++
    ) {

        let particle =
            document.createElement("div");


        particle.classList.add(
            "wish-particle"
        );


        particle.innerText =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.left =
            "50%";


        particle.style.top =
            "45%";


        let x =
            (Math.random() - 0.5) *
            700;


        let y =
            (Math.random() - 0.5) *
            600;


        particle.style.setProperty(
            "--x",
            x + "px"
        );


        particle.style.setProperty(
            "--y",
            y + "px"
        );


        container.appendChild(
            particle
        );


        setTimeout(() => {

            particle.remove();

        }, 2200);
    }


    // Extra confetti

    createConfetti();


    // Change button

    let button =
        document.querySelector(
            ".wish-btn"
        );


    button.innerText =
        "🌟 Wish Sent! 💖";


    button.style.transform =
        "scale(1.08)";


    setTimeout(() => {

        button.innerText =
            "💫 Make A Wish 💫";

        button.style.transform =
            "";

    }, 2500);
}



// =====================================================
// RESTART
// =====================================================

function restart() {

    selectedPerson = "";
    personName = "";
    selectedStyle = "";


    // Clear input

    document
        .getElementById("nameInput")
        .value = "";


    // Remove final

    document
        .getElementById("final")
        .classList.remove("active");


    // Show first step

    document
        .getElementById("step1")
        .classList.add("active");


    // Clear effects

    document
        .getElementById("confetti")
        .innerHTML = "";


    document
        .getElementById("particles")
        .innerHTML = "";
}



// =====================================================
// ENTER KEY SUPPORT
// =====================================================

document
    .getElementById("nameInput")
    .addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                submitName();
            }
        }
    );