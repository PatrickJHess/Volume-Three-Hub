/**
 * REPLACEMENT BLOCK
 * This handles users coming specifically from a Google Search result.
 */
function handleGoogleSearchReferrer() {
    // 1. Check if the user is arriving from a Google search page
    const referrer = document.referrer;
    if (referrer.includes("google.com")) {
        try {
            const refUrl = new URL(referrer);
            const query = refUrl.searchParams.get('q'); // Extracts the searched terms

            if (query) {
                // 2. Use the modern Browser "Scroll-to-Text" feature
                // This appends #:~:text= to the URL to force a native highlight
                const textFragment = `#:~:text=${encodeURIComponent(query)}`;
                
                // We use replaceState so the "Back" button still works normally
                window.location.hash = textFragment;
                console.log("Scrolling to Google search term: " + query);
            }
        } catch (e) {
            console.error("Google referrer parsing failed.");
        }
    }
}

// THE IGNITION SWITCH
// Ensures the page is ready before we try to move the scrollbar
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", handleGoogleSearchReferrer);
} else {
    handleGoogleSearchReferrer();
}
