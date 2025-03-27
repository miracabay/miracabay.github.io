document.addEventListener("DOMContentLoaded", async function () {
    // Footer'ı yükle (Hep görünsün)
    try {
        const footerResponse = await fetch("/layout/footer.html");
        const footerData = await footerResponse.text();
        document.getElementById("footer-container").innerHTML = footerData;
    } catch (error) {
        console.error("Footer yüklenirken hata oluştu:", error);
    }

    // Navbar'ı yükle
    try {
        const navbarResponse = await fetch("/layout/navbar.html");
        const navbarData = await navbarResponse.text();
        document.getElementById("navbar-container").innerHTML = navbarData;
        setupNavbar(); // Navbar yüklenince eventleri tanımla
    } catch (error) {
        console.error("Navbar yüklenirken hata oluştu:", error);
    }

    // Sayfaların dışarıdan çekileceği kısımlar
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

    // İlk yüklemede sadece "home" göster, ama URL değiştirme
    document.getElementById("home").style.display = "block";
});

// Navbar olaylarını tanımlayan fonksiyon
function setupNavbar() {
    const navbar = document.querySelector(".navbar ul");
    const navbarLinks = document.querySelectorAll(".navbar ul li a");

    // **✨ Alt çizgi animasyonu için özel bir eleman ekleyelim**
    const underline = document.createElement("div");
    underline.classList.add("navbar-underline");
    navbar.appendChild(underline);

    function moveUnderline(target) {
        const targetRect = target.getBoundingClientRect();
        const navbarRect = navbar.getBoundingClientRect();
        underline.style.left = `${targetRect.left - navbarRect.left + target.offsetWidth / 2}px`;
        underline.style.width = `${target.offsetWidth * 0.5}px`; // Çizgi genişliği
    }

    // **📌 İlk açılışta "home" aktif olsun**
    const homeLink = document.querySelector('.navbar ul li a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add("active");
        moveUnderline(homeLink);
        homeLink.style.pointerEvents = "none"; // Tıklanamaz yap
    }

    navbarLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);

            // Sayfa içeriklerini gizle
            document.querySelectorAll(".page-content").forEach(page => page.style.display = "none");

            // Yeni sayfayı göster
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.style.display = "block";
            }

            // Aktif linki güncelle
            navbarLinks.forEach(nav => nav.classList.remove("active"));
            link.classList.add("active");

            // Alt çizgiyi yeni aktif elemana kaydır
            moveUnderline(link);

            // Tıklanamaz yap
            navbarLinks.forEach(nav => nav.style.pointerEvents = "auto");
            link.style.pointerEvents = "none";
        });
    });
}