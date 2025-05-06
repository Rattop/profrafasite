function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

document.getElementById("ano-atual").textContent = new Date().getFullYear();
