const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

const mapOverlay = `
        <div class="map-placeholder">
            <a href="index.html" class="map-marker" style="left: 10%; top: 60%;">
                <div class="map-label">Site La Maison</div>
                <div class="map-line"></div>
                <div class="map-dot"></div>
            </a>
            <a href="courses.html" class="map-marker" style="left: 30%; top: 30%;">
                <div class="map-label">Our Courses</div>
                <div class="map-line"></div>
                <div class="map-dot"></div>
            </a>
            <a href="teachers.html" class="map-marker" style="left: 45%; top: 70%;">
                <div class="map-dot"></div>
                <div class="map-line"></div>
                <div class="map-label">Our Teachers</div>
            </a>
            <a href="permanences.html" class="map-marker" style="left: 65%; top: 20%;">
                <div class="map-label">Permanences</div>
                <div class="map-line"></div>
                <div class="map-dot"></div>
            </a>
            <a href="learning.html" class="map-marker" style="left: 80%; top: 80%;">
                <div class="map-dot"></div>
                <div class="map-line"></div>
                <div class="map-label">Learning Together</div>
            </a>
            <a href="projects.html" class="map-marker" style="left: 90%; top: 40%;">
                <div class="map-label">Our Projects</div>
                <div class="map-line"></div>
                <div class="map-dot"></div>
            </a>
        </div>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<div class="map-placeholder"><\/div>/g, mapOverlay);
    fs.writeFileSync(file, content);
});
console.log('Done overlay replacement');
