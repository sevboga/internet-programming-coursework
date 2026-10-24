const header_html = ` 
        <nav class="navbar navbar-expand-lg bg-white border-bottom labov-navbar"> <!--rwra edw gia to gkri-->
            <div class="container">
                <!--logo-->
                <a class="navbar-brand py-0" href="index.html">
                    <img src="img/logo.png" alt="LaBov Coffee Logo" height="110">
                </a>
                <!--titlos sthn selida // krubetai oso mikrainei -->
                <span class="navbar-text fw-bold text-labov d-none d-md-inline"> Labov Coffee</span>
                <!--hamburger button // bgainei se mikres othones kinita klp. -->
                <button class="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#mainnav"
                        aria-controls="mainnav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
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
            <img src="img/logo.png" alt="LaBov Coffee Logo" height="100">
            <small class="text-center">&copy; 2019-2026 LaBov Coffee, Pastry &amp; Bakery. All rights reserved.</small>
            <div class="fs-4">
                <!-- na balw target_blank na to stelnw se allh selida???-->
                <a href="mailto:menboga@outlook.com" class="footer-link me-3" aria-label="Email us"><i class="bi bi-envelope-fill"></i></a>
                <a href="https://www.instagram.com/la_bov/" class="footer-link me-3" target="_blank" aria-label="Follow us on Instagram"><i class="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/LaBov19/" class="footer-link me-3" target="_blank" aria-label="Follow us on Facebook"><i class="bi bi-facebook"></i></a>
            </div>
        </div>`;

document.getElementById("site-header").innerHTML = header_html;
document.getElementById("site-footer").innerHTML = footer_html;
