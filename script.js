// Vienoje vietoje keičiamas kontaktų konfigas
const SETTINGS = {
    phone: "+370 600 12345",
    email: "info@restoranas.lt",
    address: "Vilniaus g. 10, Vilnius",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Vilniaus+g.+10,+Vilnius",
};
const THEME_KEY = "theme";
function applyTheme(mode){
    document.documentElement.classList.toggle("theme-dark", mode === "dark");
}
const saved = localStorage.getItem(THEME_KEY);
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(saved ? saved : (prefersDark ? "dark" : "light"));

document.addEventListener("DOMContentLoaded", () => {
    // ... (tavo esamas kodas)
    const tBtn = document.getElementById("themeToggle");
    if (tBtn){
        tBtn.addEventListener("click", () => {
            const dark = document.documentElement.classList.toggle("theme-dark");
            localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Sticky stilius
    const header = document.getElementById("header");
    const onScroll = () => header.classList.toggle("is-sticky", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mobile nav
    const nav = document.getElementById("nav");
    const navToggle = document.getElementById("navToggle");
    navToggle.addEventListener("click", () => nav.classList.toggle("show"));
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("show")));

    // Scroll reveal
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => e.isIntersecting && e.target.classList.add("is-inview"));
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));

    // Kontaktai (vienoje vietoje)
    document.querySelectorAll("[data-phone]").forEach(el => {
        el.textContent = SETTINGS.phone;
        el.href = `tel:${SETTINGS.phone.replace(/\s+/g,'')}`;
    });
    document.querySelectorAll("[data-email]").forEach(el => {
        el.textContent = SETTINGS.email;
        el.href = `mailto:${SETTINGS.email}`;
    });
    document.querySelectorAll("[data-address]").forEach(el => el.textContent = SETTINGS.address);
    document.querySelectorAll("[data-map]").forEach(el => el.href = SETTINGS.mapUrl);

    // Metai footeryje
    document.getElementById("year").textContent = new Date().getFullYear();

    // Filtravimas
    const filters = document.getElementById("filters");
    const cards = [...document.querySelectorAll("#menuGrid .dish")];

    filters.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-filter]");
        if (!btn) return;

        filters.querySelectorAll("button").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        const f = btn.dataset.filter;
        cards.forEach(card => {
            const ok = f === "all" || card.dataset.category === f;
            card.style.display = ok ? "" : "none";
        });
    });
});
