const immersionData = {
    ALPHA: {
        title: "ALPHA - Pr. Junior e Pr. Cris",
        address: "Endereço: Av. Getúlio Vargas, 10 Jardim Cinira - Itap da Serra - SP"
    },
    HABACUQUE: {
        title: "HABACUQUE - Diac.Victor e Diac.Larissa",
        address: "Endereço: Av. Getúlio Vargas, 16 Jardim Cinira - Itap da Serra - SP"
    },
    EFRAIN: {
        title: "EFRAIN - Diac.Fran",
        address: "Endereço: Rua Deodoro da Fonseca, 01 Jardim Cinira - Itap da Serra - SP"
    },
    EMANUEL: {
        title: "EMANUEL - Diac.Marcelo e Ob.Leia",
        address: "Endereço: Rua Augusto de Almeida Batista, 3359 Jardim Batista - São Paulo - SP"
    }
};

const galleryData = {
    abba2024: {
        title: "Conferência ABBA 2024",
        folder: "./img/gallery/ConferênciaABBA2024",
        mainImage: "foto1.jpg",
        albumUrl: "https://www.terabox.com/portuguese/sharing/link?surl=ATbNtzWuIOYz3eaqNztC8A&path=%2FABBA2024"
    },
    cultos: {
        title: "Cultos de Domingo",
        folder: "./img/gallery/cultos",
        mainImage: "culto1.jpg",
        albumUrl: "https://www.terabox.com/portuguese/main?category=all&path=%2FCulto%20Domingo"
    },
    espiritosanto2025: {
        title: "Conferência do Espírito Santo 2025",
        folder: "./img/gallery/Conferência do Espírito Santo 2025",
        mainImage: "ConferênciaEP2025.jpeg",
        albumUrl: "#"
    }
};

function closeImmersionPopup() {
    const popup = document.getElementById("immersionPopup");
    if (!popup) {
        return;
    }

    popup.style.display = "none";
    document.body.style.overflow = "auto";
}

function openImmersionPopup(immersionName) {
    const popup = document.getElementById("immersionPopup");
    const data = immersionData[immersionName];

    if (!popup || !data) {
        return;
    }

    popup.innerHTML = `
        <div class="popup-content">
            <button type="button" class="close-popup" aria-label="Fechar">&times;</button>
            <div class="popup-header">
                <h2>${data.title}</h2>
                <p class="immersion-address">${data.address}</p>
            </div>
            <div class="popup-body">
                <div class="map-container">
                    <iframe
                        src="https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="300"
                        frameborder="0"
                        scrolling="no"
                        marginheight="0"
                        marginwidth="0">
                    </iframe>
                </div>
            </div>
        </div>
    `;

    popup.style.display = "block";
    document.body.style.overflow = "hidden";

    const closeBtn = popup.querySelector(".close-popup");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeImmersionPopup);
    }
}

function openGalleryModal(category) {
    const data = galleryData[category];
    if (!data || !data.albumUrl || data.albumUrl === "#") {
        console.error("URL do álbum não encontrada para a categoria:", category);
        return;
    }

    try {
        window.open(data.albumUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
        console.error("Erro ao abrir o álbum:", error);
        alert("Não foi possível abrir o álbum. Por favor, tente novamente.");
    }
}

function generateMainGalleryHTML() {
    const galleryGrid = document.querySelector(".gallery-grid");
    if (!galleryGrid) {
        console.error("Elemento .gallery-grid não encontrado");
        return;
    }

    galleryGrid.innerHTML = "";
    Object.entries(galleryData).forEach(([category, data]) => {
        const mainImageHTML = `
            <div class="gallery-item main-item" data-category="${category}">
                <img src="${data.folder}/${data.mainImage}" alt="${data.title}" loading="lazy" />
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h3>${data.title}</h3>
                        <p>Clique para ver o álbum completo</p>
                    </div>
                </div>
            </div>
        `;
        galleryGrid.insertAdjacentHTML("beforeend", mainImageHTML);
    });
}

function openPrayerForm() {
    const modal = document.getElementById("prayerModal");
    if (!modal) {
        return;
    }

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closePrayerModal() {
    const modal = document.getElementById("prayerModal");
    const prayerName = document.getElementById("prayerName");
    const prayerText = document.getElementById("prayerText");

    if (modal) {
        modal.style.display = "none";
    }
    document.body.style.overflow = "auto";

    if (prayerName) {
        prayerName.value = "";
    }
    if (prayerText) {
        prayerText.value = "";
    }
}

function sendPrayerRequest() {
    const name = document.getElementById("prayerName")?.value.trim();
    const prayerText = document.getElementById("prayerText")?.value.trim();

    if (!name || !prayerText) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const phoneNumber = "5511937439575";
    const message = encodeURIComponent(`*Pedido de Oração*\n\n*Nome:* ${name}\n*Pedido:* ${prayerText}`);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(whatsappUrl, "_blank");
    closePrayerModal();
}

function openConceptPopup() {
    window.open("./docs/conceito.pdf", "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navOverlay = document.querySelector(".nav-overlay");
    const prayerModal = document.getElementById("prayerModal");
    const currentYearEl = document.getElementById("currentYear");
    const conceptBtn = document.querySelector(".concept-btn");

    if (currentYearEl) {
        currentYearEl.textContent = String(new Date().getFullYear());
    }

    generateMainGalleryHTML();

    window.addEventListener("scroll", () => {
        if (!header) {
            return;
        }

        header.classList.toggle("scrolled", window.scrollY > 50);
    });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            navOverlay?.classList.toggle("active");

            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
        });
    }

    const closeMobileMenu = () => {
        if (!menuToggle || !navLinks) {
            return;
        }

        navLinks.classList.remove("active");
        navOverlay?.classList.remove("active");

        const icon = menuToggle.querySelector("i");
        if (icon) {
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
        }
    };

    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId && targetId.startsWith("#")) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            closeMobileMenu();
        });
    });

    navOverlay?.addEventListener("click", closeMobileMenu);

    document.querySelectorAll(".immersion-item").forEach((item) => {
        item.addEventListener("click", () => {
            const immersionName = item.getAttribute("data-immersion");
            if (immersionName) {
                openImmersionPopup(immersionName);
            }
        });
    });

    document.querySelectorAll(".filter-btn").forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach((btn) => {
                btn.classList.remove("active");
            });
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");
            document.querySelectorAll(".gallery-item").forEach((item) => {
                const isVisible = filterValue === "all" || item.getAttribute("data-category") === filterValue;
                item.classList.toggle("hidden", !isVisible);
            });
        });
    });

    document.querySelectorAll(".gallery-item").forEach((item) => {
        item.addEventListener("click", () => {
            const category = item.getAttribute("data-category");
            if (category) {
                openGalleryModal(category);
            }
        });
    });

    document.querySelector('[data-action="open-prayer-modal"]')?.addEventListener("click", openPrayerForm);
    document.querySelector('[data-action="send-prayer-request"]')?.addEventListener("click", sendPrayerRequest);
    document.querySelector(".prayer-modal-close")?.addEventListener("click", closePrayerModal);

    window.addEventListener("click", (event) => {
        const immersionPopup = document.getElementById("immersionPopup");
        if (event.target === immersionPopup) {
            closeImmersionPopup();
        }
        if (event.target === prayerModal) {
            closePrayerModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePrayerModal();
            closeImmersionPopup();
        }
    });

    if (conceptBtn) {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            conceptBtn.innerHTML = `
                <i class="fas fa-download"></i>
                Baixar Conceito da Nossa Logo
            `;
        }
    }
});

