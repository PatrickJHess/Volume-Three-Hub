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
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const highlightTerm = urlParams.get('highlight');

    if (highlightTerm) {
        // Wait a beat for Sphinx to apply its highlighting spans
        setTimeout(() => {
            const firstMatch = document.querySelector('.highlighted');
            if (firstMatch) {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500);
    }
});
