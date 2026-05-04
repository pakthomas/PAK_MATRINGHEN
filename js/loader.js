document.addEventListener("DOMContentLoaded", () => {
    // Select all elements that have a data-text attribute
    const elementsToTranslate = document.querySelectorAll("[data-text]");
    
    elementsToTranslate.forEach(element => {
        const path = element.getAttribute("data-text").split(".");
        
        // Traverse the siteContent object using the path
        let currentContent = siteContent;
        for (let key of path) {
            if (currentContent[key]) {
                currentContent = currentContent[key];
            } else {
                currentContent = null;
                break;
            }
        }
        
        // If the text was found in content.js, inject it into the element
        if (currentContent && typeof currentContent === "string") {
            element.innerHTML = currentContent;
        }
    });

    // Generate Interactive Map Markers dynamically
    const mapPlaceholder = document.querySelector(".map-placeholder");
    if (mapPlaceholder && siteContent.mapMarkers) {
        // Clear hardcoded HTML markers if any exist
        mapPlaceholder.innerHTML = '';
        
        siteContent.mapMarkers.forEach(marker => {
            const a = document.createElement('a');
            a.href = marker.link;
            a.className = 'map-marker';
            a.style.left = marker.x + '%';
            a.style.top = marker.y + '%';

            const dot = document.createElement('div');
            dot.className = 'map-dot';
            if (marker.color) dot.style.borderColor = marker.color;

            const line = document.createElement('div');
            line.className = 'map-line';

            const label = document.createElement('div');
            label.className = 'map-label';
            label.innerText = marker.label;
            if (marker.color) label.style.color = marker.color;

            if (marker.textPosition === 'above') {
                a.appendChild(label);
                a.appendChild(line);
                a.appendChild(dot);
            } else { // under
                a.appendChild(dot);
                a.appendChild(line);
                a.appendChild(label);
            }

            mapPlaceholder.appendChild(a);
        });
    }
});
