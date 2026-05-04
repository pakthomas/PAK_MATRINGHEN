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
            element.innerHTML = currentContent; // innerHTML allows formatting like <br> if added in content.js
        }
    });
});
