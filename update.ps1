$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    
    $navNew = "<nav>`r`n            <a href='index.html' class='link-dept' data-text='global.navDept'>Our Department</a>`r`n            <a href='courses.html' class='link-courses' data-text='global.navCourses'>Our Courses</a>`r`n            <a href='teachers.html' class='link-teachers' data-text='global.navTeachers'>Our Teachers</a>`r`n            <a href='permanences.html' class='link-permanences' data-text='global.navPermanences'>Permanences</a>`r`n            <a href='learning.html' class='link-learning' data-text='global.navLearning'>Learning Together</a>`r`n            <a href='projects.html' class='link-projects' data-text='global.navProjects'>Our Projects</a>`r`n            <a href='contact.html' class='link-contact' data-text='global.navContact'>Contact Us</a>`r`n            <a href='about.html' class='link-about' data-text='global.navAbout'>About Us</a>`r`n        </nav>"
    $content = $content -replace '(?s)<nav>.*?</nav>', $navNew

    $content = $content -replace '(?s)<div class="site-label">.*?</div>', ''

    $content = $content -replace '(?s)<div class="header-logo">\s*<img src="assets/images/Logo-Efrei-Blanc.png" alt="efrei logo" style="height: 40px;">\s*</div>', '<a href="index.html" class="header-logo"><img src="assets/images/Logo-Efrei-Blanc.png" alt="efrei logo"></a>'

    $content = $content -replace '(?s)<div class="header-logo">\s*<svg.*?</svg>\s*<div class="logo-text">efrei</div>\s*</div>', '<a href="index.html" class="header-logo"><img src="assets/images/Logo-Efrei-Blanc.png" alt="efrei logo"></a>'

    if ($content -notmatch 'js/loader.js') {
        $content = $content -replace '</body>', "<script src='js/content.js'></script>`r`n    <script src='js/loader.js'></script>`r`n</body>"
    }

    [System.IO.File]::WriteAllText($f.FullName, $content)
}
