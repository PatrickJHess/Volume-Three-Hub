/**
 * Universal Search & Scroll Logic
 * This works even if Google doesn't append parameters to the URL.
 */
function attemptSearchScroll() {
    const referrer = document.referrer;
    
    // 1. Check if the user is coming from a Google Search
    if (referrer.includes("google.com")) {
        try {
            const refUrl = new URL(referrer);
            const query = refUrl.searchParams.get('q'); // Extracts "par yields"

            if (query) {
                // Encode and append the text fragment logic
                const fragment = `#:~:text=${encodeURIComponent(query)}`;
                
                // This 'flicks' the browser to the text location
                if (!window.location.hash.includes(':~:text=')) {
                    window.location.hash = fragment;
                    console.log("Found Google query: " + query + ". Scrolling...");
                }
            }
        } catch (e) {
            console.log("No query found in referrer.");
        }
    }
}

// Run immediately once the page is interactive
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attemptSearchScroll);
} else {
    attemptSearchScroll();
}
