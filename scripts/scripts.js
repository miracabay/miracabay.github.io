document.addEventListener("DOMContentLoaded", function () {
    // Navbar ve Footer'ı yükle
    fetch("/layout/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;

            // Aktif sayfa linkine `current-page` sınıfını ekle
            const currentPage = window.location.pathname.split("/").pop(); // Şu anki sayfa adını al
            const navLinks = document.querySelectorAll(".navbar a"); // Navbar'daki tüm linkleri al

            navLinks.forEach(link => {
                if (link.getAttribute("href") === currentPage) {
                    link.classList.add("current-page"); // Eğer şu anki sayfa linki ile eşleşiyorsa `current-page` ekle
                }
            });
        });

    fetch("/layout/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        });
});
