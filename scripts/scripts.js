document.addEventListener("DOMContentLoaded", function () {
    // Navbar ve Footer'ı yükle
    fetch("/layout/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;

            // Navbar tıklama işlemleri
            const navbarLinks = document.querySelectorAll(".navbar ul li a");
            navbarLinks.forEach(link => {
                link.addEventListener("click", function(event) {
                    event.preventDefault(); // Bağlantıyı tıklama yerine JS ile işlem yap
                    const targetId = link.getAttribute("href").substring(1); // #home gibi

                    // Sayfa içeriklerini gizle
                    const allPages = document.querySelectorAll(".page-content");
                    allPages.forEach(page => page.style.display = "none");

                    // "Miraç Abay" başlığını gizle
                    document.getElementById("main").style.display = "none";

                    // Tıklanan sayfayı göster
                    const targetPage = document.getElementById(targetId);
                    if (targetPage) {
                        targetPage.style.display = "block";
                    }
                });
            });
        });

    fetch("/layout/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
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
});