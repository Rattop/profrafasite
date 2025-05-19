// Array de projetos com informações expandidas
const projetos = [
    {
        id: 1,
        nome: "Duny jogos",
        aluno: "Anny Beatriz",
        imagem: "https://placehold.co/400x300/DDDD/AAAA&text=Duny+Jogos",
        url: "https://dunyjogos.neocities.org",
        status: "Em desenvolvimento",
        descricao: "?",
        dataCriacao: "2025-05-19",
        tecnologias: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 2,
        nome: "Point-X",
        aluno: "Bruno Ramos",
        imagem: "https://placehold.co/400x300/CCCC/AAAA&text=Point-X",
        url: "https://point-x.neocities.org",
        status: "Em desenvolvimento",
        descricao: "?",
        dataCriacao: "2025-05-19",
        tecnologias: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 3,
        nome: "Pelu Coelho",
        aluno: "Pedro Coelho",
        imagem: "https://placehold.co/400x300/BBBB/AAAA&text=Pelu+Coelho",
        url: "https://pelucoelho.neocities.org",
        status: "Em desenvolvimento",
        descricao: "?",
        dataCriacao: "2025-05-19",
        tecnologias: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 4,
        nome: "Katuaba",
        aluno: "Carla Martins",
        imagem: "https://placehold.co/400x300/AAAA/AAAA&text=Katuaba",
        url: "https://katuaba.neocities.org",
        status: "Em desenvolvimento",
        descricao: "?",
        dataCriacao: "2025-05-19",
        tecnologias: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 5,
        nome: "PlaceHolder",
        aluno: "PlaceHolder da Silva",
        imagem: "https://placehold.co/400x300/9999/AAAA&text=PlaceHolder",
        url: "https://x",
        status: "Em desenvolvimento",
        descricao: "Projeto em desenvolvimento",
        dataCriacao: "2025-05-19",
        tecnologias: ["HTML", "CSS", "JavaScript"]
    }
];

// Função melhorada para renderizar os projetos
function renderizarProjetos() {
    const container = document.getElementById('portfolio-container');
    if (!container) return;

    container.innerHTML = projetos.map(projeto => {
        // Validar URL
        const url = projeto.url.startsWith('http') ? projeto.url : `https://${projeto.url}`;
        
        // Criar string de tecnologias
        const tecnologias = projeto.tecnologias ? projeto.tecnologias.join(', ') : '';
        
        return `
            <a href="${url}" class="portfolio-link" target="_blank" rel="noopener noreferrer">
                <div class="portfolio-item" data-id="${projeto.id}">
                    <img src="${projeto.imagem}" 
                         alt="${projeto.nome || 'Projeto sem nome'}"
                         onerror="this.src='https://placehold.co/400x300/FF0000/FFFFFF&text=Imagem+Indisponível'">
                    <span class="portfolio-status">${projeto.status}</span>
                    <div class="portfolio-caption">
                        <h3>${projeto.nome || 'Projeto sem nome'}</h3>
                        <p>Por: ${projeto.aluno}</p>
                        <p class="project-description">${projeto.descricao}</p>
                        <p class="project-tech">Tecnologias: ${tecnologias}</p>
                        <small>Criado em: ${formatarData(projeto.dataCriacao)}</small>
                    </div>
                </div>
            </a>
        `;
    }).join('');

    // Adicionar event listeners para os cards após renderização
    adicionarEventListeners();
}

// Função para formatar a data
function formatarData(data) {
    try {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(data).toLocaleDateString('pt-BR', options);
    } catch (e) {
        return data;
    }
}

// Função para adicionar event listeners
function adicionarEventListeners() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        // Adicionar efeito hover
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Adicionar verificação de link antes de abrir
        const link = item.parentElement;
        link.addEventListener('click', function(e) {
            const url = this.href;
            if (!url || url === 'https://x') {
                e.preventDefault();
                alert('Este projeto ainda não está disponível.');
            }
        });
    });
}

// Função para adicionar novo projeto com validação
function adicionarProjeto(novoProjeto) {
    // Validar campos obrigatórios
    if (!novoProjeto.nome || !novoProjeto.aluno || !novoProjeto.url) {
        console.error('Campos obrigatórios faltando');
        return false;
    }

    // Adicionar campos padrão se não fornecidos
    const projetoCompleto = {
        id: projetos.length + 1,
        status: "Em desenvolvimento",
        dataCriacao: new Date().toISOString().split('T')[0],
        tecnologias: ["HTML", "CSS", "JavaScript"],
        ...novoProjeto
    };

    projetos.push(projetoCompleto);
    renderizarProjetos();
    return true;
}

// Inicializar quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');

    if (navToggle && mainNavUl) {
        navToggle.addEventListener('click', function() {
            mainNavUl.classList.toggle('nav-active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scroll para links âncora e destaque do link ativo
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    const dropdownToggle = document.querySelector('.dropdown-toggle-nav');
    const dropdownMenu = document.querySelector('.dropdown-menu-nav');

    function setActiveLink() {
        let currentSection = "";
        const sections = document.querySelectorAll('main section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - (document.querySelector('.site-header').offsetHeight + 20)) {
                currentSection = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.main-nav ul li a').forEach(link => {
            link.classList.remove('active');
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });

        if (currentSection && dropdownToggle?.classList.contains('active') && 
            dropdownMenu && !dropdownMenu.contains(document.querySelector('.main-nav a.active'))) {
            // Lógica do dropdown aqui se necessário
        }
    }

    setActiveLink();
    window.addEventListener('scroll', setActiveLink);

    // Fechar menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNavUl.classList.contains('nav-active')) {
                mainNavUl.classList.remove('nav-active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Lógica do Dropdown
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(event) {
            if (this.getAttribute('href') === '#') {
                event.preventDefault();
            }
            
            if (window.innerWidth <= 992) {
                const parentLi = this.parentElement;
                parentLi.classList.toggle('open');
            }
        });
    }

    // Validação do formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            if (nome === '' || email === '' || mensagem === '') {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            alert('Formulário enviado com sucesso (simulação)!');
            contactForm.reset();
        });
    }

    // Atualizar ano no footer
    const anoAtualSpan = document.getElementById('ano-atual');
    if (anoAtualSpan) {
        anoAtualSpan.textContent = new Date().getFullYear();
    }

    // Inicializar os projetos
    renderizarProjetos();
});