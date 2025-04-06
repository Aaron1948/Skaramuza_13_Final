const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Si sale del canvas, reaparece
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        /*ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';*/
        ctx.fillStyle = 'rgba(228, 106, 106, 0.7)';
        ctx.fill();
      }
    }

    function init() {
      for (let i = 0; i < 150; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    init();
    animate();