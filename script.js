document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quote");
    const authorText = document.getElementById("author");
    const newQuoteBtn = document.getElementById("new-quote");
    const copyBtn = document.getElementById("copy-quote");
    const tweetBtn = document.getElementById("tweet-quote");
    const container = document.querySelector(".container");

    // Liste de couleurs pour le fond
    const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff"];

    // Fonction pour récupérer une citation
    async function fetchQuote() {
        try {
            const response = await fetch("https://api.quotable.io/random");
            const data = await response.json();

            // Ajout d'un effet de transition
            quoteText.classList.remove("fade-in");
            setTimeout(() => {
                quoteText.textContent = `"${data.content}"`;
                authorText.textContent = `— ${data.author}`;
                quoteText.classList.add("fade-in");
            }, 100);

            // Changer la couleur de fond
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            container.style.backgroundColor = randomColor;

        } catch (error) {
            console.error("Erreur lors de la récupération de la citation :", error);
            quoteText.textContent = "Une erreur s'est produite.";
            authorText.textContent = "";
        }
    }

    // Fonction pour copier la citation
    function copyQuote() {
        const textToCopy = `${quoteText.textContent} ${authorText.textContent}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("Citation copiée !");
        });
    }

    // Fonction pour tweeter la citation
    function tweetQuote() {
        const text = quoteText.textContent;
        const author = authorText.textContent;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + " " + author)}`;
        window.open(twitterUrl, "_blank");
    }

    // Événements
    newQuoteBtn.addEventListener("click", fetchQuote);
    copyBtn.addEventListener("click", copyQuote);
    tweetBtn.addEventListener("click", tweetQuote);

    // Charger une citation au démarrage
    fetchQuote();
});
