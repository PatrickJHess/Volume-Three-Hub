function executeCseSearch() {
    var inputElement = document.getElementById('cseSearchInput');
    if (inputElement) {
        var rawQuery = inputElement.value.trim(); // Get "spot"
        if (rawQuery !== "") {
            // We manually build the query to ensure "chapter one" isn't hidden in a variable
            var targetSite = "site:patrickjhess.github.io";
            var finalSearchString = rawQuery + " " + targetSite;
            
            var url = 'https://www.google.com/search?q=' + encodeURIComponent(finalSearchString);
            
            window.open(url, '_blank');
        }
    }
}
/**
 * Universal Scroll-to-Search Handler
 * Logic: Checks for Sphinx highlights first, then falls back to Google referrer.
 */
function handleSearchHighlighting() {
    const urlParams = new URLSearchParams(window.location.search);
    const highlightTerm = urlParams.get('highlight');
    const fromGoogle = document.referrer.includes("google.com");

    // 1. Handle Sphinx Internal Search
    if (highlightTerm) {
        setTimeout(() => {
            const firstMatch = document.querySelector('.highlighted');
            if (firstMatch) {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500); // Delay allows Sphinx to finish "painting" the yellow spans
    } 
    
    // 2. Handle Google Search Referrer (if no internal highlight is present)
    else if (fromGoogle) {
        try {
            const refUrl = new URL(document.referrer);
            const googleQuery = refUrl.searchParams.get('q');
            if (googleQuery) {
                // We use the modern browser "Text Fragment" logic
                // This forces the browser to find the text even if Sphinx didn't
                const firstWord = googleQuery.split(' ')[0];
                window.location.hash = `:~:text=${encodeURIComponent(googleQuery)}`;
            }
        } catch (e) {
            console.log("Referrer clean-up failed, skipping scroll.");
        }
    }
}

// Execute once the DOM is fully interactive
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", handleSearchHighlighting);
} else {
    handleSearchHighlighting();
}
