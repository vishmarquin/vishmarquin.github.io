/* =========================================
   1. PRELOADER (TELA DE BOOT) - PRIORIDADE MÁXIMA
========================================= */
// Executa assim que o script lê, não espera o site todo carregar
(function() {
    const removePreloader = () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => { preloader.remove(); }, 500);
        }
    };

    // Garante que o preloader suma após 3.5 segundos (tempo da animação + margem)
    setTimeout(removePreloader, 3500);

    // Se o site carregar rápido, também tenta remover (segurança dupla)
    window.addEventListener('load', () => {
        setTimeout(removePreloader, 3500); 
    });
})();

/* =========================================
   2. CURSOR HACKER (MOUSE)
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Verifica se os elementos do cursor existem antes de rodar
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot segue instantâneo
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline segue suave
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Efeito Hover
        const interactables = document.querySelectorAll('a, button, .cyber-card, input, textarea');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }
});

/* =========================================
   3. EFEITO MATRIX (CHUVA DE CÓDIGO)
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrixCanvas');
    
    // Se não achar o canvas, para aqui e não quebra o resto
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for(let x = 0; x < columns; x++) { drops[x] = 1; }

    const drawMatrix = () => {
        ctx.fillStyle = 'rgba(3, 7, 18, 0.05)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00f3ff'; // Cor Azul Ciano
        ctx.font = fontSize + 'px monospace';

        for(let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975)
                drops[i] = 0;
            drops[i]++;
        }
    };

    setInterval(drawMatrix, 33);
    window.addEventListener('resize', resizeCanvas);
});

/* =========================================
   4. TYPEWRITER (DIGITAÇÃO)
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.text-content p');
    
    if (textElement) {
        const originalText = textElement.innerHTML;
        textElement.innerHTML = ''; // Limpa para digitar
        
        const introText = "Iniciando sistemas... Identidade confirmada...";
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < introText.length) {
                textElement.innerHTML += introText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 30);
            } else {
                // Após digitar a intro, mostra o texto real
                setTimeout(() => {
                    textElement.innerHTML = originalText;
                }, 800);
            }
        }
        
        // Começa a digitar após o preloader sumir
        setTimeout(typeWriter, 3600);
    }
});

/* =========================================
   5. TÍTULO DINÂMICO (ABA DO NAVEGADOR)
========================================= */
let docTitle = document.title;
window.addEventListener("blur", () => {
    document.title = "⚠️ CONEXÃO PERDIDA...";
});
window.addEventListener("focus", () => {
    document.title = docTitle;
});