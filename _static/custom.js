function executeCseSearch() {
    var query = document.getElementById('cseSearchInput').value;
    if (query) {
        // This targets the root, which covers all 10 repos (Hub, Vol-2, Vol-3, etc.)
        var siteFilter = "site:patrickjhess.github.io";
        
        // This combines the user's word with the site restriction
        var fullQuery = query + " " + siteFilter;
        
        // This sends them to a standard Google result page in a new tab
        var url = 'https://www.google.com/search?q=' + encodeURIComponent(fullQuery);
        
        window.open(url, '_blank');
    }
}
