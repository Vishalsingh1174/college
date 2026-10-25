// ==============================
// BIRTHDAY WEBSITE JAVASCRIPT
// ==============================


let selectedPerson = "";
let personName = "";
let selectedStyle = "";


// ==============================
// SELECT PERSON
// ==============================

function selectPerson(person) {

    selectedPerson = person;

    console.log("Selected:", selectedPerson);

    document.getElementById("step1").classList.remove("active");

    document.getElementById("step2").classList.add("active");

    document.getElementById("personText").innerHTML =
        `You selected <strong>${person}</strong> 💖<br>
        Now tell me their beautiful name...`;

    document.getElementById("nameInput").focus();
}


// ==============================
// SUBMIT NAME
// ==============================

function submitName() {

    let input = document.getElementById("nameInput");

    personName = input.value.trim();


    if (personName === "") {

        alert("Please enter a name 💖");

        input.focus();

        return;
    }


    document.getElementById("step2").classList.remove("active");

    document.getElementById("step3").classList.add("active");
}


// ==============================
// SELECT MESSAGE STYLE
// ==============================

function selectStyle(style) {

    selectedStyle = style;

    document.getElementById("step3").classList.remove("active");

    document.getElementById("final").classList.add("active");


    // Final name

    document.getElementById("finalName").innerText =
        personName;


    // Different messages

    let message = "";


    if (style === "cute") {

        message =
            `May your birthday be filled with
            smiles, happiness, sweet memories
            and lots of love. 💕`;

    }


    else if (style === "emotional") {

        message =
            `You are truly special and deserve
            all the happiness in the world.
            May every dream in your heart
            come true. ❤️`;

    }


    else if (style === "funny") {

        message =
            `Another year older, wiser...
            or at least better at pretending! 😂
            Keep smiling and enjoy your day!`;

    }


    else {

        message =
            `May this beautiful new chapter
            bring endless happiness, success,
            love and unforgettable moments.
            You deserve the very best! ✨`;

    }


    document.getElementById("finalMessage").innerText =
        message;


    // Change title based on person

    if (selectedPerson === "Sister") {

        document.getElementById("finalTitle").innerText =
            "Happy Birthday, Sis! 💖";

    }

    else if (selectedPerson === "Brother") {

        document.getElementById("finalTitle").innerText =
            "Happy Birthday, Bro! 💙";

    }

    else if (selectedPerson === "Friend") {

        document.getElementById("finalTitle").innerText =
            "Happy Birthday, Bestie! 💕";

    }

    else if (selectedPerson === "Mom") {

        document.getElementById("finalTitle").innerText =
            "Happy Birthday, Mom! ❤️";

    }

    else if (selectedPerson === "Dad") {

        document.getElementById("finalTitle").innerText =
            "Happy Birthday, Dad! 💙";

    }

    else {

        document.getElementById("finalTitle").innerText =
            "Happy Birthday! 🎂";

    }


    // Start confetti

    createConfetti();
}


// ==============================
// GO BACK
// ==============================

function goBack(step) {

    if (step === 2) {

        document.getElementById("step2")
            .classList.remove("active");

        document.getElementById("step1")
            .classList.add("active");
    }


    if (step === 3) {

        document.getElementById("step3")
            .classList.remove("active");

        document.getElementById("step2")
            .classList.add("active");
    }
}


// ==============================
// CONFETTI
// ==============================

function createConfetti() {

    let container =
        document.getElementById("confetti");


    for (let i = 0; i < 120; i++) {

        let piece =
            document.createElement("div");

        piece.classList.add("confetti");


        piece.style.left =
            Math.random() * 100 + "vw";


        piece.style.animationDelay =
            Math.random() * 2 + "s";


        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        piece.style.background =
            randomColor();


        container.appendChild(piece);


        setTimeout(() => {

            piece.remove();

        }, 5000);
    }
}


// ==============================
// RANDOM CONFETTI COLOR
// ==============================

function randomColor() {

    let colors = [

        "#ff4f9a",
        "#ffd166",
        "#06d6a0",
        "#4cc9f0",
        "#ffffff",
        "#c77dff"

    ];


    return colors[
        Math.floor(Math.random() * colors.length)
    ];
}


// ==============================
// RESTART
// ==============================

function restart() {

    selectedPerson = "";
    personName = "";
    selectedStyle = "";


    document.getElementById("nameInput").value = "";


    document.getElementById("final")
        .classList.remove("active");


    document.getElementById("step1")
        .classList.add("active");
}