const API_URL = "https://hp-api.onrender.com/api/characters";
const defaultImage = "https://via.placeholder.com/200x260?text=No+Image";

document.getElementById("searchButton").addEventListener("click", buscarPersonaje);
document.getElementById("searchInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") buscarPersonaje();
});

function buscarPersonaje() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const contenedor = document.getElementById("resultsContainer");
  contenedor.innerHTML = "<p style='color:#0ff;'>🔍 Buscando...</p>";

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const resultados = data.filter(p =>
        p.name.toLowerCase().includes(query)
      );

      contenedor.innerHTML = "";

      if (resultados.length === 0) {
        contenedor.innerHTML = "<p style='color:red;'>❌ Personaje no encontrado.</p>";
        return;
      }

      resultados.sort((a, b) => a.name.localeCompare(b.name));

      resultados.forEach(personaje => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");

        tarjeta.innerHTML = `
          <img src="${personaje.image || defaultImage}" alt="${personaje.name}">
          <h3>${personaje.name}</h3>
          <p>${personaje.house || "Casa desconocida"}</p>
        `;

        contenedor.appendChild(tarjeta);
      });
    })
    .catch(error => {
      console.error("Error al obtener los personajes:", error);
      contenedor.innerHTML = "<p style='color:red;'>⚠️ Error al cargar los datos.</p>";
    });
}
