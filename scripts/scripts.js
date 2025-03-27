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

            const navbarLinks = document.querySelectorAll(".navbar ul li a");

            navbarLinks.forEach(link => {
                link.addEventListener("click", function (event) {
                    event.preventDefault(); // Sayfa değişimi JS ile olacak
                    const targetId = link.getAttribute("href").substring(1); // #home gibi

                    // Sayfa içeriklerini gizle
                    document.querySelectorAll(".page-content").forEach(page => page.style.display = "none");
                    document.getElementById("main").style.display = "none";

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

                    // Footer'ı tekrar yükle ki silinmesin
                    fetch("/layout/footer.html")
                        .then(response => response.text())
                        .then(data => {
                            document.getElementById("footer-container").innerHTML = data;
                        });
                });
            });
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