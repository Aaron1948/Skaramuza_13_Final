// NOTICIAS

document.addEventListener("DOMContentLoaded", () => {
    fetch("news.json")
        .then(response => response.json())
        .then(data => {
            const newsSection = document.getElementById("news-section");

            data.forEach(noticia => {
                newsSection.innerHTML += `
                    <div class="news-item">
                        <h3 class="noticias2">${noticia.titulo}</h3>
                        <p class="noticias">${noticia.descripcion}</p>
                        <a href="${noticia.enlace}" target="_blank">Leer más</a>
                    </div>
                `;
            });
        })
        .catch(error => console.error("Error al cargar las noticias:", error));
});