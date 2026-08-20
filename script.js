let todosOsJogos = [];
 
async function carregar() {
  const status = document.getElementById("status");
  status.textContent = "Carregando...";
  document.getElementById("grid").innerHTML = "";
 
  try {
    const res = await fetch("https://www.gamerpower.com/api/giveaways?type=game");
    if (!res.ok) throw new Error("Falha na requisição");
 
    todosOsJogos = await res.json();
    mostrar(todosOsJogos);
  } catch (erro) {
    status.textContent = "Não foi possível carregar os jogos agora. Tente novamente.";
    console.error(erro);
  }
}
 
function mostrar(lista) {
  const grid = document.getElementById("grid");
  const status = document.getElementById("status");
 
  status.textContent = lista.length ? "" : "Nenhum jogo encontrado.";
 
  grid.innerHTML = lista.slice(0, 12).map(jogo => `
    <div class="jogo">
      <img src="${jogo.thumbnail}" alt="${jogo.title}" onerror="this.src='https://placehold.co/300x160?text=Sem+imagem'">
      <h3>${jogo.title}</h3>
      <a href="${jogo.open_giveaway_url}" target="_blank">Resgatar →</a>
    </div>
  `).join("");
}
 
function filtrar() {
  const termo = document.getElementById("busca").value.toLowerCase();
  const filtrados = todosOsJogos.filter(jogo =>
    jogo.title.toLowerCase().includes(termo)
  );
  mostrar(filtrados);
}
 
document.getElementById("busca").addEventListener("input", filtrar);
document.getElementById("recarregar").addEventListener("click", carregar);
 
carregar();
 