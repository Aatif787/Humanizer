/**
 * Luxury Font Cycling Engine for "Saniya"
 * Dynamically loads elegant fonts from Google Fonts API and cycles them.
 */

class FontCycler {
    constructor(elementId, interval = 1500) {
        this.element = document.getElementById(elementId);
        this.interval = interval;
        this.fonts = [
            'Dancing Script', 'Great Vibes', 'Pacifico', 'Lobster', 'Sacramento',
            'Satisfy', 'Kaushan Script', 'Permanent Marker', 'Abril Fatface',
            'Playfair Display', 'Cinzel Decorative', 'Limelight', 'Poiret One',
            'Alex Brush', 'Allura', 'Arizonia', 'Bad Script', 'Bilbo Swash Caps',
            'Calligraffitti', 'Caveat', 'Clicker Script', 'Cookie', 'Courgette',
            'Damion', 'Devonshire', 'Euphoria Script', 'Fondamento', 'Glass Antiqua',
            'Grand Hotel', 'Homemade Apple', 'Italianno', 'Jim Nightshade',
            'Julius Sans One', 'La Belle Aurore', 'League Script', 'Marck Script',
            'Meddon', 'Meie Script', 'Miss Fajardose', 'Montez', 'Mr De Haviland',
            'Mrs Saint Delafield', 'Niconne', 'Nothing You Could Do', 'Over the Rainbow',
            'Pinyon Script', 'Quintessential', 'Rochester', 'Rouge Script', 'Ruthie',
            'Seaweed Script', 'Shadows Into Light', 'Stalemate', 'Tangerine', 'Vibur',
            'Yellowtail', 'Yesteryear', 'Zeyada'
        ];
        this.currentIndex = 0;
        this.init();
    }

    async init() {
        if (!this.element) return;
        this.loadFont(this.fonts[0]);
        setInterval(() => this.cycle(), this.interval);
    }

    loadFont(fontName) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}&display=swap`;
        document.head.appendChild(link);
    }

    cycle() {
        this.currentIndex = (this.currentIndex + 1) % this.fonts.length;
        const font = this.fonts[this.currentIndex];
        this.loadFont(font);
        this.element.classList.add('font-swap-active');

        const rotation = (Math.random() * 10 - 5).toFixed(2);
        const scale = (0.95 + Math.random() * 0.1).toFixed(2);

        setTimeout(() => {
            this.element.style.fontFamily = `'${font}', cursive`;
            this.element.style.transform = `rotate(${rotation}deg) scale(${scale})`;
            setTimeout(() => {
                this.element.classList.remove('font-swap-active');
            }, 600);
        }, 300);
    }
}

/**
 * Starry Night Sky — Twinkling Stars + Shooting Stars
 */
class StarField {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.shootingStars = [];
        this.count = 220;
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => {
            this.resize();
            this.regenerateStars();
        });

        this.regenerateStars();
        this.animate();
        setInterval(() => this.addShootingStar(), 4000 + Math.random() * 6000);
    }

    regenerateStars() {
        this.stars = [];
        for (let i = 0; i < this.count; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.3,
                baseAlpha: Math.random() * 0.6 + 0.3,
                alpha: 0,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinkleOffset: Math.random() * Math.PI * 2
            });
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addShootingStar() {
        this.shootingStars.push({
            x: Math.random() * this.canvas.width * 0.7,
            y: Math.random() * this.canvas.height * 0.4,
            len: 80 + Math.random() * 60,
            speed: 8 + Math.random() * 6,
            alpha: 1,
            angle: Math.PI / 4 + (Math.random() * 0.3 - 0.15)
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const time = Date.now() * 0.001;

        // Draw twinkling stars
        this.stars.forEach(s => {
            s.alpha = s.baseAlpha + Math.sin(time * s.twinkleSpeed * 60 + s.twinkleOffset) * 0.3;
            s.alpha = Math.max(0.05, Math.min(1, s.alpha));

            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
            if (s.size > 1.5) {
                this.ctx.shadowBlur = 8;
                this.ctx.shadowColor = 'rgba(200, 200, 255, 0.5)';
            } else {
                this.ctx.shadowBlur = 0;
            }
            this.ctx.fill();
        });

        // Draw shooting stars
        this.ctx.shadowBlur = 0;
        this.shootingStars = this.shootingStars.filter(ss => {
            ss.x += Math.cos(ss.angle) * ss.speed;
            ss.y += Math.sin(ss.angle) * ss.speed;
            ss.alpha -= 0.015;

            if (ss.alpha <= 0) return false;

            const tailX = ss.x - Math.cos(ss.angle) * ss.len;
            const tailY = ss.y - Math.sin(ss.angle) * ss.len;

            const grad = this.ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
            grad.addColorStop(0, 'rgba(255,255,255,0)');
            grad.addColorStop(1, `rgba(255,255,255,${ss.alpha})`);

            this.ctx.beginPath();
            this.ctx.moveTo(tailX, tailY);
            this.ctx.lineTo(ss.x, ss.y);
            this.ctx.strokeStyle = grad;
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();
            return true;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Auto-initialize when loaded
window.addEventListener('DOMContentLoaded', () => {
    new FontCycler('saniya-text');
    new StarField('particles-canvas');
});
