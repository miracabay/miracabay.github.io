document.addEventListener("DOMContentLoaded", function () {
    // Footer'ı yükle (Hep görünsün)
    fetch("/layout/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        });

    // Navbar'ı yükle
    fetch("/layout/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
            setupNavbar(); // Navbar yüklenince eventleri tanımla
        });

    // Sayfaların dışarıdan çekileceği kısımlar
    const pages = ["home", "whoAmI", "myProjects", "contact", "invincibleXOX"];
    pages.forEach(pageId => {
        fetch(`/pages/${pageId}.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById(pageId).innerHTML = data;
            });
    });

    // İlk yüklemede sadece "home" göster, ama URL değiştirme
    document.getElementById("home").style.display = "block";
});

// Navbar olaylarını tanımlayan fonksiyon
function setupNavbar() {
    const navbarLinks = document.querySelectorAll(".navbar ul li a");

    // **📌 İlk açılışta 'home' sayfası seçili olacak şekilde aktif yap**
    const homeLink = document.querySelector('.navbar ul li a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add("active");
        homeLink.style.pointerEvents = "none"; // Tıklanamaz yap
    }

    navbarLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Sayfa değişimi JS ile olacak
            const targetId = link.getAttribute("href").substring(1); // #home gibi

            // Sayfa içeriklerini gizle
            document.querySelectorAll(".page-content").forEach(page => page.style.display = "none");

            // Tıklanan sayfayı göster
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.style.display = "block";
            }

            // Navbar'daki aktif linki güncelle
            navbarLinks.forEach(nav => nav.classList.remove("active"));
            link.classList.add("active");

            // Tıklanamaz yap
            navbarLinks.forEach(nav => nav.style.pointerEvents = "auto"); // Önce hepsini aç
            link.style.pointerEvents = "none"; // Aktif olana tıklamayı engelle
        });
    });
}