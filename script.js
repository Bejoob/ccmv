// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth scroll para links do header
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Fecha o menu mobile se estiver aberto
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
}); 

// Dados das imersões com fotos
const immersionData = {
    ALPHA: {
        title: "ALPHA - Pr. Junior e Pr. Cris",
        address: "Endereço: Av. Getúlio Vargas, 10 Jardim Cinira - Itap da Serra - SP",
        gallery: [
            "./img/immersions/ALPHA/foto1.jpeg",
            "./img/immersions/ALPHA/foto2.jpg",
            "./img/immersions/ALPHA/foto3.jpg",
            // Adicione mais fotos conforme necessário
        ]
    },
    HABACUQUE: {
        title: "HABACUQUE - Diac.Victor e Diac.Larissa",
        address: "Endereço: Av. Getúlio Vargas, 16 Jardim Cinira - Itap da Serra - SP",
        gallery: [
            "./img/immersions/HABACUQUE/foto1.jpg",
            "./img/immersions/HABACUQUE/foto2.jpg",
            "./img/immersions/HABACUQUE/foto3.jpg",
            // Adicione mais fotos conforme necessário
        ]
    },
    EFRAIN: {
        title: "EFRAIN - Diac.Fran",
        address: "Endereço: Rua Deodoro da Fonseca, 01 Jardim Cinira - Itap da Serra - SP",
        gallery: [
            "./img/immersions/EFRAIN/foto1.jpg",
            "./img/immersions/EFRAIN/foto2.jpg",
            "./img/immersions/EFRAIN/foto3.jpg",
            // Adicione mais fotos conforme necessário
        ]
    },
    EMANUEL: {
        title: "EMANUEL - Diac.Marcelo e Ob.Leia",
        address: "Endereço: Rua Augusto de Almeida Batista, 3359 Jardim Batista - São Paulo - SP",
        gallery: [
            "./img/immersions/EMANUEL/foto1.jpg",
            "./img/immersions/EMANUEL/foto2.jpg",
            "./img/immersions/EMANUEL/foto3.jpg",
            // Adicione mais fotos conforme necessário
        ]
    }
};

// Função para abrir o popup com galeria
function openImmersionPopup(immersionName) {
    const popup = document.getElementById('immersionPopup');
    const data = immersionData[immersionName];
    
    if (data) {
        // Criar o conteúdo do popup
        const popupContent = `
            <div class="popup-content">
                <span class="close-popup">&times;</span>
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
                    <div class="immersion-gallery">
                        <div class="main-image">
                            <img src="${data.gallery[0]}" alt="${data.title}">
                        </div>
                        <div class="thumbnails">
                            ${data.gallery.map((photo, index) => `
                                <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage(this, '${photo}')">
                                    <img src="${photo}" alt="${data.title} - Foto ${index + 1}">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        popup.innerHTML = popupContent;
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Adicionar eventos para fechar
        const closeBtn = popup.querySelector('.close-popup');
        closeBtn.onclick = () => {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        popup.onclick = (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        };
    }
}

// Função para trocar a imagem principal
function changeMainImage(thumbnail, newSrc) {
    // Remove a classe active de todas as miniaturas
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Adiciona a classe active na miniatura clicada
    thumbnail.classList.add('active');
    
    // Atualiza a imagem principal
    const mainImage = document.querySelector('.main-image img');
    mainImage.src = newSrc;
}

// Adicionar eventos de clique nas imersões
document.querySelectorAll('.immersion-item').forEach(item => {
    item.addEventListener('click', () => {
        const immersionName = item.getAttribute('data-immersion');
        openImmersionPopup(immersionName);
    });
});

// Fechar popup
document.querySelector('.close-popup').addEventListener('click', () => {
    document.getElementById('immersionPopup').style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fechar popup ao clicar fora
window.addEventListener('click', (e) => {
    const popup = document.getElementById('immersionPopup');
    if (e.target === popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}); 

// Atualizar o objeto galleryData
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
    }
};

// Função para abrir o álbum
function openGalleryModal(category) {
    const data = galleryData[category];
    if (data && data.albumUrl) {
        try {
            window.open(data.albumUrl, '_blank', 'noopener,noreferrer');
        } catch (error) {
            console.error('Erro ao abrir o álbum:', error);
            alert('Não foi possível abrir o álbum. Por favor, tente novamente.');
        }
    } else {
        console.error('URL do álbum não encontrada para a categoria:', category);
    }
}

// Atualizar a função generateMainGalleryHTML
function generateMainGalleryHTML() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) {
        console.error('Elemento .gallery-grid não encontrado');
        return;
    }

    // Limpar conteúdo existente
    galleryGrid.innerHTML = '';

    // Criar cards principais para cada categoria
    Object.entries(galleryData).forEach(([category, data]) => {
        const mainImageHTML = `
            <div class="gallery-item main-item" data-category="${category}">
                <img src="${data.folder}/${data.mainImage}" 
                     alt="${data.title}" 
                     loading="lazy"
                     onerror="console.error('Erro ao carregar imagem:', this.src)">
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h3>${data.title}</h3>
                        <p>Clique para ver o álbum completo</p>
                    </div>
                </div>
            </div>
        `;
        galleryGrid.insertAdjacentHTML('beforeend', mainImageHTML);
    });

    // Adicionar eventos de clique
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            openGalleryModal(category);
        });
    });
}

// Inicializar a galeria quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    generateMainGalleryHTML();
});

// Atualizar os filtros para usar a nova estrutura
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
}); 

// Atualizar as funções de pedido de oração
function openPrayerForm() {
    const modal = document.getElementById('prayerModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function sendPrayerRequest() {
    const name = document.getElementById('prayerName').value.trim();
    const prayerText = document.getElementById('prayerText').value.trim();
    
    if (!name || !prayerText) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    const phoneNumber = '5511999999999'; // Substitua pelo número do WhatsApp da igreja
    const message = encodeURIComponent(`*Pedido de Oração*\n\n*Nome:* ${name}\n*Pedido:* ${prayerText}`);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    closePrayerModal();
}

function closePrayerModal() {
    const modal = document.getElementById('prayerModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Limpar os campos
    document.getElementById('prayerName').value = '';
    document.getElementById('prayerText').value = '';
}

// Adicionar eventos quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Evento para fechar o modal quando clicar no X
    const closeBtn = document.querySelector('.prayer-modal-close');
    if (closeBtn) {
        closeBtn.onclick = closePrayerModal;
    }
    
    // Evento para fechar o modal quando clicar fora dele
    const modal = document.getElementById('prayerModal');
    if (modal) {
        window.onclick = function(event) {
            if (event.target === modal) {
                closePrayerModal();
            }
        }
    }
    
    // Evento para tecla ESC fechar o modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closePrayerModal();
        }
    });
}); 

// Função para controlar o popup do PDF
function openConceptPopup() {
    // Abre o PDF em uma nova aba
    window.open('./docs/conceito.pdf', '_blank');
}

// Modifica o botão para indicar a ação correta baseado no dispositivo
document.addEventListener('DOMContentLoaded', function() {
    const conceptBtn = document.querySelector('.concept-btn');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        conceptBtn.innerHTML = `
            <i class="fas fa-download"></i>
            Baixar Conceito da Nossa Logo
        `;
    }
});

// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    if (menuToggle && navLinks && navOverlay) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            
            // Toggle do ícone do menu
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Fechar menu ao clicar em um link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });

        // Fechar menu ao clicar no overlay
        navOverlay.addEventListener('click', function() {
            navLinks.classList.remove('active');
            this.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    }
});

