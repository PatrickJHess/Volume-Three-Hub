/**
 * Universal Multi-Highlight & Scroll
 * 1. Scrolls to the first match via Native Browser Text Fragment
 * 2. Highlights every other match on the page manually
 */
function highlightAllMatches() {
    const referrer = document.referrer;
    if (!referrer.includes("google.com")) return;

    try {
        const url = new URL(referrer);
        const query = url.searchParams.get('q');
        if (!query) return;

        // 1. Force the Scroll to the FIRST instance
        window.location.hash = `#:~:text=${encodeURIComponent(query)}`;

        // 2. Manually Highlight ALL instances
        const keywords = query.split(' ');
        const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
        
        // We use a TreeWalker to find all text nodes without breaking HTML tags
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        const nodesToReplace = [];

        while (node = walker.nextNode()) {
            if (node.textContent.match(regex)) {
                nodesToReplace.push(node);
            }
        }

        nodesToReplace.forEach(textNode => {
            const span = document.createElement('span');
            span.innerHTML = textNode.textContent.replace(regex, '<mark class="custom-highlight">$1</mark>');
            textNode.parentNode.replaceChild(span, textNode);
        });

    } catch (e) {
        console.error("Multi-highlight failed.");
    }
}

document.addEventListener("DOMContentLoaded", highlightAllMatches);
