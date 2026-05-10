const siteContent = {
    "mapMarkers": [
        { "link": "index.html", "label": "Our Department", "x": 15, "y": 40, "textPosition": "above", "color": "#0c0919" },
        { "link": "courses.html", "label": "Our Courses", "x": 77.7, "y": 22.5, "textPosition": "above", "color": "#b4df5f" },
        { "link": "teachers.html", "label": "Our Teachers", "x": 48.7, "y": 67, "textPosition": "under", "color": "#dd4f4f" },
        { "link": "permanences.html", "label": "Permanences", "x": 28.7, "y": 20, "textPosition": "above", "color": "#518eda" },
        { "link": "learning.html", "label": "Learning Together", "x": 72.3, "y": 69, "textPosition": "under", "color": "#555555" },
        { "link": "projects.html", "label": "Our Projects", "x": 91.5, "y": 32, "textPosition": "above", "color": "#e58f35" }
    ],
    "global": {
        "departmentName": "Computer Science Department",
        "navDept": "Our Department",
        "navCourses": "Our Courses",
        "navTeachers": "Our Teachers",
        "navPermanences": "Permanences",
        "navLearning": "Learning Together",
        "navProjects": "Our Projects",
        "navContact": "Contact Us",
        "navAbout": "About Us",
        "siteMap": "SITE",
        "siteMapSubtitle": "LA MAISON"
    },
    "index": {
        "aboutHeading": "Our department",
        "card1Title": "Explain important concepts to future engineers",
        "card1Text": "Lorem Ipsum",
        "card2Title": "Create useful and interesting courses for everyone",
        "card2Text": "Lorem Ipsum",
        "card3Title": "Accompany the students in their progressions",
        "card3Text": "Lorem Ipsum",
        "coursesHeading": "The courses of our Department",
        "coursesText": "Lorem Ipsum",
        "researchersHeading": "Our researchers",
        "researchersText": "Lorem Ipsum",
        "newResearchHeading": "New Research"
    },
    "permanences": {
        "permanencesTitle": "Permanences",
        "planningTitle": "Planning",
        "searchPlaceholder": "Chercher une matière",
        "courseCardTitle": "Another Course",
        "courseCardText": "Time & Description of the Permanence",
        "reserveBtn": "Réservez sa place"
    },
    "learning": {
        "mainTitle": "Learning Together",
        "usefulWebsites": "Useful Website :",
        "executor": "Executor :",
        "usefulDocs": "Useful Documents :"
    },
    "projects": {
        "mainTitle": "Projects",
        "subTitle": "Histogram-Github-Commits-In-EFREI",
        "project1Title": "A Github made in the department",
        "project1Text": "Small Description of this research",
        "project2Title": "A Research made in the department",
        "project2Text": "Small Description of this research",
        "expandedProjectTitle": "A Project made in the department",
        "expandedProjectText1": "Full Text about the research",
        "btnMore": "En Savoir Plus",
        "btnClose": "Fermer"
    },
    "courses": {
        "mainTitle": "Our Courses",
        "course1Title": "Web Programming 1: HTML, CSS, JS",
        "course1Text": "This course.",
        "course2Title": "Another Course",
        "course2Text": "This course.",
        "btnPermanences": "Voir les Permanences"
    },
    "teachers": {
        "mainTitle": "Our Teachers",
        "teacher1Name": "Amir CHACHOUI",
        "teacher1Title": "Enseignant en informatique",
        "teacher2Name": "Yaovi Giovani SOGLO",
        "teacher2Title": "Enseignant, Responsable Pédagogique",
        "teacherContacts": "Contacts...",
        "btnContact": "Contactez ce professeur"
    },
    "about": {
        "mainTitle": "About the Developers",
        "description": "Information about the team building this platform."
    },
    "contact": {
        "mainTitle": "Contact Us",
        "description": "Get in touch with the Computer Science Department."
    },
    "coursesList": [
        { "id": "c1", "title": "Web Programming 1: HTML, CSS, JS", "desc": "This course covers the basics of web development.", "img": "assets/images/EFREI-CampusVILLEJUIF-042024@CorinneHameau-065.jpg" },
        { "id": "c2", "title": "Advanced Java", "desc": "Object-oriented programming and advanced Java concepts.", "img": "assets/images/EFREI-CampusVILLEJUIF-042024@CorinneHameau-066.jpg" },
        { "id": "c3", "title": "Database Management", "desc": "SQL and NoSQL database management and design.", "img": "assets/images/EFREI-CampusVILLEJUIF-042024@CorinneHameau-154.jpg" },
        { "id": "c4", "title": "Algorithms & Data Structures", "desc": "Core computer science concepts.", "img": "assets/images/EFREI-CampusVILLEJUIF-042024@CorinneHameau-213.jpg" }
    ],
    "teachersList": [
        { "id": "t-amir", "name": "Amir CHACHOUI", "role": "Enseignant en informatique", "img": "assets/images/EFREI-CampusVILLEJUIF-042024@CorinneHameau-064.jpg", "contact": "amir.chachoui@efrei.fr" },
        { "id": "t-yaovi", "name": "Yaovi Giovani SOGLO", "role": "Enseignant, Responsable Pédagogique", "img": "assets/images/EFREI-CampusVILLEJUIF-042024@CorinneHameau-732.jpg", "contact": "yaovi.soglo@efrei.fr" }
    ],
    "permanencesList": [
        { "id": "p-1", "courseTitle": "Web Programming 1: HTML, CSS, JS", "teacherId": "t-amir", "teacherName": "Amir CHACHOUI", "day": "Lundi", "start": "14:00", "end": "16:00", "room": "A204" },
        { "id": "p-2", "courseTitle": "Advanced Java", "teacherId": "t-yaovi", "teacherName": "Yaovi Giovani SOGLO", "day": "Mardi", "start": "10:00", "end": "12:00", "room": "B101" },
        { "id": "p-3", "courseTitle": "Database Management", "teacherId": "t-amir", "teacherName": "Amir CHACHOUI", "day": "Mercredi", "start": "08:00", "end": "10:00", "room": "C305" },
        { "id": "p-4", "courseTitle": "Algorithms", "teacherId": "t-yaovi", "teacherName": "Yaovi Giovani SOGLO", "day": "Jeudi", "start": "15:00", "end": "17:00", "room": "A204" }
    ],
    "projectsList": [
        {
            "id": "proj-github",
            "type": "histogram",
            "title": "A Github made in the department",
            "subtitle": "Commits across the cs-efrei organization over the last 52 weeks."
        },
        {
            "id": "proj-2",
            "type": "standard",
            "title": "A Research made in the department",
            "subtitle": "Small Description of this research",
            "img": "assets/images/EFREI-CampusVILLEJUIF-042024@CorinneHameau-066.jpg",
            "btnText": "En Savoir Plus"
        },
        {
            "id": "proj-3",
            "type": "expanded",
            "title": "A Project made in the department",
            "img": "assets/images/EFREI-CampusVILLEJUIF-042024@CorinneHameau-213.jpg",
            "btnText": "Fermer",
            "paragraphs": [
                "Full Text about the research",
                "Full Text about the research",
                "Full Text about the research"
            ]
        }
    ]
};
