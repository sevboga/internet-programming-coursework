const logo_light = "img/logo.png";
const logo_dark = "img/logo_dm.png";

const header_html = ` 
        <nav class="navbar navbar-expand-lg bg-body border-bottom labov-navbar">
            <div class="container">
                <!--logo-->
                <a class="navbar-brand py-0" href="index.html">
                    <img class="site-logo"
                         src="${logo_light}" 
                         alt="LaBov Coffee Logo" 
                         height="110">
                </a>
                <!-- title is shrinked -->
                <span class="navbar-text fw-bold text-labov d-none d-md-inline-block"> Labov Coffee</span>
                
                <!-- hamburger button | appears in small displays -->
                <button class="navbar-toggler ms-auto" type="button"
                        data-bs-toggle="collapse" data-bs-target="#mainnav"
                        aria-controls="mainnav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <button id="theme-toggle" 
                        class="btn btn-outline-secondary ms-2 order-lg-5" 
                        type="button"
                        aria-label="Switch to dark mode"> 
                    <i class="bi bi-moon-fill"> </i>
                </button>
                
                <!--navbar-->
                <div class="collapse navbar-collapse" id="mainnav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"> <a class="nav-link" href="index.html">Home</a></li>
                        <li class="nav-item"> <a class="nav-link" href="menu.html">Menu</a></li>
                        <li class="nav-item"> <a class="nav-link" href="tasks.html">Tasks</a></li>
                        <li class="nav-item"> <a class="nav-link" href="about.html">About</a></li>
                        <li class="nav-item"> <a class="nav-link" href="contact.html">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>`;
const footer_html = `
        <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <img class="site-logo" src="${logo_light}" alt="LaBov Coffee Logo" height="100">
            <small class="text-center">&copy; 2019-2026 LaBov Coffee, Pastry &amp; Bakery. All rights reserved.</small>
            <div class="fs-4">
                <a href="mailto:menboga@outlook.com" class="footer-link me-3" aria-label="Email us"><i class="bi bi-envelope-fill"></i></a>
                <a href="https://www.instagram.com/la_bov/" class="footer-link me-3" target="_blank" aria-label="Follow us on Instagram"><i class="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/LaBov19/" class="footer-link me-3" target="_blank" aria-label="Follow us on Facebook"><i class="bi bi-facebook"></i></a>
            </div>
        </div>`;
//call the header and the footer
document.querySelector("#site-header").innerHTML = header_html;
document.querySelector("#site-footer").innerHTML = footer_html;


//showing current tab
const current_page = location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".labov-navbar  .nav-link").forEach(link => {
    if (link.getAttribute("href") === current_page) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});


// Dark mode
//changing from light to dark and from dark to light theme
const theme_button = document.querySelector("#theme-toggle");
const html_element = document.querySelector("html");

function changeTheme(theme) {
    html_element.setAttribute("data-bs-theme", theme);

    //changing logos
    document.querySelectorAll(".site-logo").forEach(logo => {
        if (theme === "dark") {
            logo.setAttribute("src", logo_dark);
        }
        else {
            logo.setAttribute("src", logo_light);
        }
    });

    //theme button
    if (theme === "dark") {
        theme_button.innerHTML = '<i class="bi bi-sun-fill"></i>';
        theme_button.setAttribute("aria-label", "Switch to light mode");
    }
    else {
        theme_button.innerHTML = '<i class="bi bi-moon-fill"></i>';
        theme_button.setAttribute("aria-label", "Switch to dark mode");
    }
}

//Click the button
theme_button.addEventListener("click", () => {
    if (html_element.getAttribute("data-bs-theme") === "dark") {
        changeTheme("light");
    }
    else {
        changeTheme("dark");
    }
});

//begin with light mode
changeTheme("light");

