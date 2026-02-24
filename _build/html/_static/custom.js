f/* _static/custom.js */
function executeCseSearch() {
    var query = document.getElementById('cseSearchInput').value;
    if (query) {
        var cx = 'e3042cd2d713e4dd2';
        // Construct the absolute URL
        var url = 'https://cse.google.com/cse?cx=' + cx + '&q=' + encodeURIComponent(query);
        
        // Force the browser to open a new web tab, bypassing the local file protocol
        window.open(url, '_blank');
    }
}
