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
