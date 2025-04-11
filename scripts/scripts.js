document.addEventListener("DOMContentLoaded", async function () {
    try {
        const footerResponse = await fetch("/layout/footer.html");
        const footerData = await footerResponse.text();
        document.getElementById("footer-container").innerHTML = footerData;
    } catch (error) {
        console.error("Footer yüklenirken hata oluştu:", error);
    }

    try {
        const navbarResponse = await fetch("/layout/navbar.html");
        const navbarData = await navbarResponse.text();
        document.getElementById("navbar-container").innerHTML = navbarData;
        setTimeout(setupNavbar, 100); // Navbar tamamen yüklendikten sonra başlat
    } catch (error) {
        console.error("Navbar yüklenirken hata oluştu:", error);
    }

    const pages = ["home", "whoAmI", "myProjects", "contact", "invincibleXOX"];
    for (let pageId of pages) {
        try {
            const pageResponse = await fetch(`/pages/${pageId}.html`);
            const pageData = await pageResponse.text();
            document.getElementById(pageId).innerHTML = pageData;
        } catch (error) {
            console.error(`${pageId} sayfası yüklenirken hata oluştu:`, error);
        }
    }

    // Sayfa yüklendikten hemen sonra home'u göster ve animasyonu tetikle
    const homePage = document.getElementById("home");
    homePage.style.display = "block";
    homePage.style.animation = "slideRightPageOpen 0.4s forwards";
});

function setupNavbar() {
    const navbar = document.querySelector(".navbar ul");
    const navbarLinks = document.querySelectorAll(".navbar ul li a");

    if (!navbar || navbarLinks.length === 0) {
        setTimeout(setupNavbar, 100);
        return;
    }

    const underline = document.createElement("div");
    underline.classList.add("navbar-underline");
    navbar.appendChild(underline);

    function moveUnderline(target) {
        const targetRect = target.getBoundingClientRect();
        const navbarRect = navbar.getBoundingClientRect();
        underline.style.left = `${targetRect.left - navbarRect.left + target.offsetWidth / 2}px`;
        underline.style.width = `${target.offsetWidth * 0.5}px`;
    }

    const homeLink = document.querySelector('.navbar ul li a[href="#home"]');
    let currentActiveIndex = Array.from(navbarLinks).indexOf(homeLink); // ilk aktif sayfa

    if (homeLink) {
        homeLink.classList.add("active");
        moveUnderline(homeLink);
        homeLink.style.pointerEvents = "none";
    }

    navbarLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetPage = document.getElementById(targetId);
            const currentActivePage = document.querySelector(".page-content[style*='display: block']");
            const newActiveIndex = Array.from(navbarLinks).indexOf(link);

            if (currentActivePage && currentActivePage !== targetPage) {
                if (targetPage) {
                    if (newActiveIndex > currentActiveIndex) {
                        targetPage.style.animation = "slideRightPageOpen 0.4s forwards";
                        currentActivePage.style.animation = "slideLeftPageClose 0.4s forwards";
                    } else {
                        targetPage.style.animation = "slideLeftPageOpen 0.4s forwards";
                        currentActivePage.style.animation = "slideRightPageClose 0.4s forwards";
                    }
                }
            
                currentActivePage.addEventListener("animationend", function handleAnimEnd() {
                    currentActivePage.style.display = "none";
                    currentActivePage.removeEventListener("animationend", handleAnimEnd);
                });
            }            

            if (targetPage) {
                targetPage.style.display = "block";
            }

            currentActiveIndex = newActiveIndex;

            navbarLinks.forEach(nav => nav.classList.remove("active"));
            link.classList.add("active");
            moveUnderline(link);

            navbarLinks.forEach(nav => nav.style.pointerEvents = "auto");
            link.style.pointerEvents = "none";
        });
    });

    window.addEventListener("resize", () => {
        const activeLink = document.querySelector(".navbar ul li a.active");
        if (activeLink) {
            moveUnderline(activeLink);
        }
    });
}