document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNavUl = document.querySelector('.main-nav ul'); // Renomeado para clareza

    if (navToggle && mainNavUl) {
        navToggle.addEventListener('click', function() {
            mainNavUl.classList.toggle('nav-active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scroll para links âncora e destaque do link ativo
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    const dropdownToggle = document.querySelector('.dropdown-toggle-nav'); // Para o dropdown
    const dropdownMenu = document.querySelector('.dropdown-menu-nav'); // Para o dropdown

    function setActiveLink() {
        let currentSection = "";
        const sections = document.querySelectorAll('main section'); // Seleciona seções dentro do main

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Ajuste o offset se o header tiver altura variável ou se precisar de mais precisão
            if (pageYOffset >= sectionTop - (document.querySelector('.site-header').offsetHeight + 20) ) {
                currentSection = section.getAttribute('id');
            }
        });

        // Remove 'active' de todos os links, incluindo o toggle do dropdown
        document.querySelectorAll('.main-nav ul li a').forEach(link => {
            link.classList.remove('active');
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });

        // Lógica para destacar o item "Arquivo" se uma subpágina dele estiver ativa (não aplicável aqui diretamente com scroll)
        // Mas podemos garantir que não fique ativo se outra seção principal estiver
        if (currentSection && dropdownToggle.classList.contains('active') && !dropdownMenu.contains(document.querySelector('.main-nav a.active'))) {
            // Se uma seção principal está ativa, e o dropdown estava ativo, desativa o dropdown
            // Isso é mais para consistência visual, a lógica de qual seção está visível é mais importante
        }
    }

    setActiveLink(); // Define o link ativo no carregamento da página
    window.addEventListener('scroll', setActiveLink);

    // Fechar menu mobile ao clicar em um link de seção
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNavUl.classList.contains('nav-active')) {
                mainNavUl.classList.remove('nav-active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Lógica para o Dropdown no menu (especialmente para mobile)
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(event) {
            // Previne o comportamento padrão do link se for um '#'
            if (this.getAttribute('href') === '#') {
                event.preventDefault();
            }
            
            // Se o menu principal mobile estiver ativo, alterna o submenu
            if (window.innerWidth <= 992) { // Mesmo breakpoint do CSS para o menu mobile
                const parentLi = this.parentElement; // O <li> que contém o dropdown
                parentLi.classList.toggle('open'); // Adiciona/remove classe para mostrar/esconder .dropdown-menu-nav
            }
            // Em telas maiores, o hover CSS já cuida disso, mas podemos adicionar lógica se necessário
        });
    }


    // Simples validação de formulário de contato (exemplo)
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

});