// Lista de palavras comuns que serão ignoradas
const PALAVRAS_RUINS = new Set([
  "a","as","o","os","um","uma","uns","umas",
  "de","da","do","das","dos","em","no","na","nos","nas",
  "por","para","com","sem","sobre","entre","até","após","antes",
  "contra","desde","perante","sob","trás",
  "eu","tu","ele","ela","nós","vós","eles","elas",
  "me","te","se","nos","vos","lhe","lhes",
  "este","esta","esse","essa","aquele","aquela",
  "isto","isso","aquilo","meu","minha","seu","sua","nosso","nossa",
  "e","mas","ou","porque","que","quando","como","onde","se","então",
  "também","ainda","já","não","sim","pois","porém","todavia","logo",
  "ser","estar","ter","haver","ir","fazer","poder","dizer",
  "vai","vão","sou","era","foi","foram","tem","têm","tinha","tiveram",
  "até","mais","menos","muito","pouco","cada","outro","outra",
  "mesmo","mesma","aqui","ali","lá","agora","depois","então",
  "sua","seu","seus","suas","meus","minhas",
  "um","dois","três","quatro","cinco","seis","sete","oito","nove","dez"
]);

const botaoMostraPalavras = document.querySelector('#botao-palavrachave');
const campoTexto = document.querySelector('#entrada-de-texto');
const campoResultado = document.querySelector('#resultado-palavrachave');

botaoMostraPalavras.addEventListener('click', mostraPalavrasChave);

function mostraPalavrasChave() {
  const texto = campoTexto.value.trim();

  if (!texto) {
    campoResultado.textContent = "Digite um texto para analisar 😅";
    return;
  }

  const palavrasChave = processaTexto(texto);
  campoResultado.textContent = palavrasChave.length > 0 
    ? palavrasChave.join(", ")
    : "Nenhuma palavra-chave encontrada 🤔";
}

function processaTexto(texto) {
  let palavras = texto.split(/\P{L}+/u)
    .map(p => p.toLowerCase())
    .filter(p => p.length > 2);

  palavras = palavras.filter(p => !PALAVRAS_RUINS.has(p));

  const frequencias = contaFrequencias(palavras);

  return Object.entries(frequencias)
    .sort((a, b) => b[1] - a[1])
    .map(([palavra]) => palavra)
    .slice(0, 10);
}

function contaFrequencias(palavras) {
  const frequencias = new Map();

  for (const palavra of palavras) {
    frequencias.set(palavra, (frequencias.get(palavra) || 0) + 1);
  }

  return Object.fromEntries(frequencias);
}