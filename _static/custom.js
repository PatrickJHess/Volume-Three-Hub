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
/**
 * Advanced Search & Scroll Handler
 * Uses an Interval to "poll" for the highlight in case of slow loading.
 */
function forceScrollToHighlight() {
    let attempts = 0;
    const maxAttempts = 20; // Try for 4 seconds (20 * 200ms)

    const scrollInterval = setInterval(() => {
        // Sphinx uses the class 'highlighted'
        const highlight = document.querySelector('.highlighted');
        
        if (highlight) {
            clearInterval(scrollInterval);
            highlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
            console.log("Found highlight! Scrolling now...");
            
            // Brighten it up just in case CSS is lagging
            highlight.style.backgroundColor = "#fffd00";
            highlight.style.color = "#000";
        }

        attempts++;
        if (attempts >= maxAttempts) {
            clearInterval(scrollInterval);
            console.log("Search highlight not found after 4 seconds.");
        }
    }, 200);
}

// Ignition Switch
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", forceScrollToHighlight);
} else {
    forceScrollToHighlight();
}



