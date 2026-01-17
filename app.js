const input = document.getElementById("textInput");
const button = document.getElementById("translateBtn");
const wordOut = document.querySelector(".output-word");
const descOut = document.querySelector(".output-desc");
const avatar = document.querySelector(".avatar");

// Test starter dictionary
const dictionary = {
    hello: "Open hand wave",
    thanks: "Hand from chin outward",
    water: "W handshape at chin",
    you: "Point forward",
    me: "Point to chest"
};

button.addEventListener("click", () => {
    const text = input.value.trim().toLowerCase();

    if (!text) {
        wordOut.textContent = "Oops";
        descOut.textContent = "Type something first";
        avatar.textContent = "😅";
        return;
    }

    wordOut.textContent = text.toUpperCase();

    if (dictionary[text]) {
        descOut.textContent = dictionary[text];
        avatar.textContent = "🤟";
    } else {
        descOut.textContent = "Fingerspelling this word";
        avatar.textContent = "✋";
    }
});
