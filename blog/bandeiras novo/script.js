
const countries = [
    { name: "Brasil", code: "brazil", type: "special", desc: "Verde e amarelo com o losango e o círculo azul celestial." },
    { name: "Japão", code: "japan", type: "special", desc: "O disco solar 'Hinomaru' centralizado fundo branco." },
    { name: "Canadá", code: "canada", type: "special", desc: "Duas barras vermelhas laterais e a folha de bordo central." },
    { name: "Espanha", code: "spain", type: "special", desc: "Bandeira conhecida como 'La Rojigualda'." },
    { name: "Colômbia", code: "colombia", type: "special", desc: "O amarelo ocupa 50% da bandeira." },
    { name: "Equador", code: "ecuador", type: "special", desc: "Similar à Colômbia com o brasão (simplificado)." },
    { name: "Venezuela", code: "venezuela", type: "special", desc: "Amarelo, azul e vermelho com arco de estrelas." },
    { name: "Israel", code: "israel", type: "special", desc: "Estrela de Davi entre duas listras azuis." },
    { name: "Argentina", code: "argentina", type: "special", desc: "Azul celeste e branco com o Sol de Maio." },
    { name: "Uruguai", code: "uruguay", type: "special", desc: "Nove listras e o Sol de Maio no canto." },
    { name: "França", code: "france", type: "v", colors: ["bg-blue", "bg-white", "bg-red"], desc: "Tricolor vertical clássica." },
    { name: "Itália", code: "italy", type: "v", colors: ["bg-green", "bg-white", "bg-red"], desc: "Verde, branco e vermelho verticais." },
    { name: "Alemanha", code: "germany", type: "h", colors: ["bg-black", "bg-red", "bg-gold"], desc: "Preto, vermelho e ouro." },
    { name: "Rússia", code: "russia", type: "h", colors: ["bg-white", "bg-blue", "bg-red"], desc: "Branco, azul e vermelho horizontais." },
    { name: "Portugal", code: "portugal", type: "special", desc: "Verde e vermelho com o escudo nacional." }
];

const grid = document.getElementById('flagGrid');
const searchInput = document.getElementById('searchInput');

function generateHTML(c) {
    if (c.type === "v") return c.colors.map(color => `<div class="stripe-v ${color}"></div>`).join('');
    if (c.type === "h") return c.colors.map(color => `<div class="stripe-h ${color}"></div>`).join('');
    
    switch(c.code) {
        case "brazil": return `<div class="flag-brazil"><div class="losango"></div><div class="circulo"></div></div>`;
        case "japan": return `<div class="flag-japan"><div class="sun"></div></div>`;
        case "canada": return `<div class="flag-canada"><span class="leaf">🍁</span></div>`;
        case "spain": return `<div class="flag-spain"><div class="sp-red"></div><div class="sp-yellow"></div><div class="sp-red"></div></div>`;
        case "colombia":
        case "ecuador": return `<div class="flag-colombia"><div class="co-yellow"></div><div class="co-blue"></div><div class="co-red"></div></div>`;
        case "venezuela": return `<div class="flag-venezuela"><div class="ve-yellow"></div><div class="ve-blue"></div><div class="ve-red"></div><div class="ve-stars">✨</div></div>`;
        case "israel": return `<div class="flag-israel"><div class="isr-strip"></div><div class="isr-star">✡</div><div class="isr-strip"></div></div>`;
        case "argentina": return `<div style="display:flex; flex-direction:column; width:100%; height:100%"><div class="stripe-h" style="background:#74ACDF"></div><div class="stripe-h" style="background:#fff"></div><div class="stripe-h" style="background:#74ACDF"></div><div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:30px">☀️</div></div>`;
        case "portugal": return `<div style="display:flex; width:100%; height:100%"><div style="width:40%; background:#006600"></div><div style="width:60%; background:#f00"></div><div style="position:absolute; left:40%; top:50%; transform:translate(-50%,-50%); width:40px; height:40px; background:gold; border-radius:50%; border:2px solid red"></div></div>`;
        default: return '';
    }
}

function render(data) {
    grid.innerHTML = data.map(c => `
        <article class="flag-card" onclick="openModal('${c.code}')">
            <div class="canvas">${generateHTML(c)}<div class="overlay"><span>Ver Detalhes</span></div></div>
            <h2>${c.name}</h2>
        </article>
    `).join('');
    document.getElementById('counter').innerText = `${data.length} países encontrados`;
}

function openModal(code) {
    const c = countries.find(x => x.code === code);
    document.getElementById('modalBody').innerHTML = `
        <div class="canvas modal-flag">${generateHTML(c)}</div>
        <h2 style="color:var(--accent)">${c.name}</h2>
        <p style="margin-top:15px; line-height:1.6">${c.desc}</p>
    `;
    document.getElementById('flagModal').style.display = "flex";
}

document.querySelector('.close-btn').onclick = () => document.getElementById('flagModal').style.display = "none";
window.onclick = (e) => { if(e.target.id === 'flagModal') document.getElementById('flagModal').style.display = "none"; }

searchInput.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    render(countries.filter(c => c.name.toLowerCase().includes(val)));
});

render(countries);



