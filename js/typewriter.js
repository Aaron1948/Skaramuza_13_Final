const app = document.getElementById("typewriter");

const typewriter = new Typewriter(app, {
    loop: true,
    delay: 75
});

typewriter
    .typeString("SKARAMUZA13")
    .pauseFor(800)
    .start();