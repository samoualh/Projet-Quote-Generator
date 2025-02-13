document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quote");
    const authorText = document.getElementById("author");
    const newQuoteBtn = document.getElementById("new-quote");
    const copyBtn = document.getElementById("copy-quote");
    const tweetBtn = document.getElementById("tweet-quote");
    const darkModeBtn = document.getElementById("toggle-dark-mode");
    const categorySelect = document.getElementById("quote-category");
    const container = document.querySelector(".container");

    // Liste de couleurs pour le fond
    const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff"];

    // Fonction pour récupérer une citation
    async function fetchQuote() {
        try {
            const category = categorySelect.value;
            let apiUrl = "https://api.quotable.io/random";

            if (category === "motivational") {
                apiUrl += "?tags=motivational";
            } else if (category === "philosophical") {
                apiUrl += "?tags=philosophy";
            } else if (category === "humor") {
                apiUrl += "?tags=humor";
            } else if (category === "movies") {
                apiUrl += "?tags=famous-quotes";
            }

            const response = await fetch(apiUrl);
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

    // Fonction pour basculer le mode sombre
    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
    }

    // Vérifier si le mode sombre était activé auparavant
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    // Événements
    newQuoteBtn.addEventListener("click", fetchQuote);
    copyBtn.addEventListener("click", () => {
        const textToCopy = `${quoteText.textContent} ${authorText.textContent}`;
        navigator.clipboard.writeText(textToCopy).then(() => alert("Citation copiée !"));
    });
    tweetBtn.addEventListener("click", () => {
        const text = quoteText.textContent;
        const author = authorText.textContent;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + " " + author)}`;
        window.open(twitterUrl, "_blank");
    });
    darkModeBtn.addEventListener("click", toggleDarkMode);
    categorySelect.addEventListener("change", fetchQuote);

    // Charger une citation au démarrage
    fetchQuote();
});
