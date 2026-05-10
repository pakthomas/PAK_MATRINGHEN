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

    // Render Courses
    const coursesGrid = document.getElementById("dynamic-courses-grid");
    if (coursesGrid && siteContent.coursesList) {
        coursesGrid.innerHTML = '';
        siteContent.coursesList.forEach(course => {
            const courseDiv = document.createElement("div");
            courseDiv.className = "course-item";
            courseDiv.innerHTML = `
                <div class="img-top">
                    <img src="${course.img}" alt="${course.title}">
                </div>
                <h3>${course.title}</h3>
                <p>${course.desc}</p>
                <button class="btn-green" onclick="window.location.href='permanences.html?course=${encodeURIComponent(course.title)}'">Voir les Permanences</button>
            `;
            coursesGrid.appendChild(courseDiv);
        });
    }

    // Render Teachers
    const teachersList = document.getElementById("dynamic-teachers-list");
    if (teachersList && siteContent.teachersList) {
        teachersList.innerHTML = '';
        siteContent.teachersList.forEach(teacher => {
            const teacherCard = document.createElement("div");
            teacherCard.className = "teacher-card";
            teacherCard.id = teacher.id;
            
            teacherCard.innerHTML = `
                <div class="teacher-header" style="cursor: pointer;">
                    <div class="teacher-avatar">
                        <img src="${teacher.img}" alt="${teacher.name}">
                    </div>
                    <div class="teacher-info">
                        <h3>${teacher.name}</h3>
                        <p>${teacher.role}</p>
                    </div>
                </div>
                <div class="teacher-arrow arrow-down"></div>
                <div class="teacher-expanded" style="display: none; padding-top: 15px;">
                    <div style="margin-bottom: 15px; font-size: 14px; line-height: 1.6;">${teacher.bio ? teacher.bio : ''}</div>
                    <p style="font-style: italic;">Contact: ${teacher.contact}</p>
                    <button class="btn-red" onclick="window.location.href='mailto:${teacher.contact}'">Contactez ce professeur</button>
                </div>
            `;
            
            const header = teacherCard.querySelector(".teacher-header");
            const expanded = teacherCard.querySelector(".teacher-expanded");
            const arrow = teacherCard.querySelector(".teacher-arrow");
            
            arrow.style.cursor = "pointer"; // Make it clear the arrow is clickable
            
            const toggleTeacher = () => {
                const isHidden = expanded.style.display === "none";
                expanded.style.display = isHidden ? "block" : "none";
                arrow.className = isHidden ? "teacher-arrow arrow-up" : "teacher-arrow arrow-down";
            };

            header.addEventListener("click", toggleTeacher);
            arrow.addEventListener("click", toggleTeacher);

            if (window.location.hash === '#' + teacher.id) {
                expanded.style.display = "block";
                arrow.className = "teacher-arrow arrow-up";
                setTimeout(() => teacherCard.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
            }

            teachersList.appendChild(teacherCard);
        });
    }

    // Render Permanences & Calendar
    const permanencesGrid = document.getElementById("dynamic-permanences-grid");
    const calendarSide = document.getElementById("dynamic-calendar-side");
    const calendarMain = document.getElementById("dynamic-calendar-main");

    if ((permanencesGrid || calendarSide || calendarMain) && siteContent.permanencesList) {
        if (permanencesGrid) {
            permanencesGrid.innerHTML = '';
            siteContent.permanencesList.forEach((perm, index) => {
                const pCard = document.createElement("div");
                pCard.className = index % 2 === 0 ? "course-card light" : "course-card";
                pCard.id = perm.id;
                
                pCard.innerHTML = `
                    <h4>${perm.courseTitle}</h4>
                    <p style="margin-bottom: 5px;">${perm.day} ${perm.start} - ${perm.end}</p>
                    <p style="margin-bottom: 5px; font-size: 0.9em;">Salle: ${perm.room}</p>
                    <p style="font-size: 0.9em;">Enseignant: <a href="teachers.html#${perm.teacherId}" style="color: inherit; text-decoration: underline;">${perm.teacherName}</a></p>
                `;
                
                if (window.location.hash === '#' + perm.id) {
                    pCard.style.border = "2px solid #518eda";
                    pCard.style.transform = "scale(1.02)";
                    pCard.style.transition = "all 0.3s ease";
                    setTimeout(() => pCard.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
                }

                permanencesGrid.appendChild(pCard);
            });

            // Search Bar Logic
            const searchInput = document.querySelector('.search-bar');
            if (searchInput) {
                const urlParams = new URLSearchParams(window.location.search);
                const queryCourse = urlParams.get('course');
                
                const filterPermanences = (query) => {
                    const term = query.toLowerCase();
                    const cards = permanencesGrid.querySelectorAll('.course-card');
                    cards.forEach(card => {
                        const title = card.querySelector('h4').textContent.toLowerCase();
                        card.style.display = title.includes(term) ? "block" : "none";
                    });
                };

                if (queryCourse) {
                    searchInput.value = queryCourse;
                    filterPermanences(queryCourse);
                }

                searchInput.addEventListener('input', (e) => {
                    filterPermanences(e.target.value);
                });
            }
        }

        const renderCalendarHTML = () => {
            let html = '<h3 style="margin: 0 0 15px 0; font-size: 1.1em; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Weekly Schedule</h3>';
            html += '<div style="display: flex; flex-direction: column; gap: 10px;">';
            siteContent.permanencesList.forEach(perm => {
                html += `
                    <div style="padding: 10px; background: #f9f9f9; border-left: 4px solid #518eda; border-radius: 4px;">
                        <div style="font-weight: bold; margin-bottom: 4px;">${perm.day}: ${perm.start} - ${perm.end}</div>
                        <a href="permanences.html#${perm.id}" style="color: #333; text-decoration: none; display: block; font-size: 0.9em;">
                            ${perm.courseTitle} <br>
                            <span style="color: #666;">Room ${perm.room}</span>
                        </a>
                    </div>
                `;
            });
            html += '</div>';
            return html;
        };

        if (calendarSide) calendarSide.innerHTML = renderCalendarHTML();
        if (calendarMain) calendarMain.innerHTML = renderCalendarHTML();
    }

    // Render Projects
    const projectsListContainer = document.getElementById("dynamic-projects-list");
    if (projectsListContainer && siteContent.projectsList) {
        projectsListContainer.innerHTML = '';
        siteContent.projectsList.forEach(proj => {
            const row = document.createElement("div");
            row.className = proj.type === 'standard' ? "project-row" : "project-row";
            if (proj.type !== 'standard') row.style.flexDirection = "column";

            if (proj.type === 'histogram') {
                row.innerHTML = `
                    <div style="width: 100%; max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <canvas id="githubHistogram"></canvas>
                    </div>
                    <div class="project-info" style="width: 100%; text-align: center; margin-top: 20px;">
                        <h3>${proj.title}</h3>
                        <p style="font-style: italic; color: #555;">${proj.subtitle}</p>
                    </div>
                `;
            } else if (proj.type === 'standard' || proj.type === 'expanded') {
                let isOpen = false;
                
                const renderState = () => {
                    if (isOpen) {
                        row.style.flexDirection = "column";
                        row.innerHTML = `
                            <div class="project-img" style="width: 100%; height: 250px;">
                                <img src="${proj.img}" alt="${proj.title}">
                            </div>
                            <div class="project-info" style="width: 100%; padding: 30px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                                    <h3>${proj.title}</h3>
                                    <button class="btn-orange toggle-btn" style="position: static;">Fermer</button>
                                </div>
                                <div style="font-style: italic; color: #333; line-height: 1.8;">
                                    ${proj.paragraphs ? proj.paragraphs.map(p => `<p>${p}</p>`).join('') : '<p>Details about this project are currently being updated.</p>'}
                                </div>
                            </div>
                        `;
                    } else {
                        row.style.flexDirection = "row";
                        row.innerHTML = `
                            <div class="project-img">
                                <img src="${proj.img}" alt="${proj.title}">
                            </div>
                            <div class="project-info">
                                <h3>${proj.title}</h3>
                                <p style="font-style: italic; color: #555;">${proj.subtitle || 'Click to view full project details...'}</p>
                                <button class="btn-orange toggle-btn">${proj.btnText || 'En Savoir Plus'}</button>
                            </div>
                        `;
                    }
                    
                    row.querySelector('.toggle-btn').addEventListener('click', () => {
                        isOpen = !isOpen;
                        renderState();
                    });
                };
                
                renderState();
            }

            projectsListContainer.appendChild(row);
        });

        // Try initializing the histogram if it was injected
        if (typeof window.initHistogram === 'function') {
            const hist = document.getElementById('githubHistogram');
            if (hist && !hist.classList.contains('initialized')) {
                hist.classList.add('initialized');
                window.initHistogram();
            }
        }
    }

    // Reservation Modal Logic
    const reserveBtns = document.querySelectorAll(".reserve-btn");
    if (reserveBtns.length > 0) {
        // Create modal container
        const modal = document.createElement("div");
        modal.id = "reservation-modal";
        modal.style.display = "none";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0,0,0,0.5)";
        modal.style.zIndex = "1000";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 8px; max-width: 400px; width: 90%; text-align: left; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                <h3 style="margin-top: 0;">Réserver une place</h3>
                <form id="reservation-form" style="display: flex; flex-direction: column; gap: 15px;">
                    <div>
                        <label for="res-name" style="display:block; margin-bottom: 5px;">Nom complet:</label>
                        <input type="text" id="res-name" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                    </div>
                    <div>
                        <label for="res-perm" style="display:block; margin-bottom: 5px;">Permanence:</label>
                        <select id="res-perm" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                            ${siteContent.permanencesList ? siteContent.permanencesList.map(p => `<option value="${p.id}">${p.courseTitle} (${p.day})</option>`).join('') : '<option>Aucune permanence disponible</option>'}
                        </select>
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;">
                        <button type="button" id="close-modal-btn" style="padding: 8px 15px; border: none; background: #ccc; border-radius: 4px; cursor: pointer;">Annuler</button>
                        <button type="submit" style="padding: 8px 15px; border: none; background: #b4df5f; color: white; font-weight: bold; border-radius: 4px; cursor: pointer;">Réserver</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        const closeModal = () => { modal.style.display = "none"; };
        document.getElementById("close-modal-btn").addEventListener("click", closeModal);
        
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        document.getElementById("reservation-form").addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Votre place a été réservée avec succès !");
            closeModal();
            e.target.reset();
        });

        reserveBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                modal.style.display = "flex";
            });
        });
    }
});
