const elQuiz = document.querySelector(".quiz")
const elPergunta = elQuiz.querySelector(".pergunta")
const elAlternativas = elQuiz.querySelector(".alternativas")
let QuestaoAtual = document.querySelector(".questaoAtual")
let mostrarQuestao = document.querySelector(".mostrarQuestao")
let mostrarErros = document.querySelector(".mostrarErros")
let mostrarAcertos = document.querySelector(".mostrarAcertos")
let contErros = 0
let contAcertos = 0
let contQuestao = 1

function mudarCor(corNova, mensagem) {
  var body = document.body
  var main = document.querySelector('main')
  var corOriginal = main.style.backgroundColor
  body.style.backgroundColor = corNova

  var tempoDeAtraso = 1000
  var divMensagem = document.getElementById('mensagem')
  divMensagem.textContent = mensagem
  divMensagem.style.display = 'block'

  main.classList.add('escondido')

  setTimeout(function() {
    main.classList.remove('escondido')
    divMensagem.style.display = 'none'
    body.style.backgroundColor = corOriginal
  }, tempoDeAtraso)
}

async function main() {
  
  const request = await fetch("quiz.json")
  const quiz = await request.json()

  numeroDaPergunta = 0

  function carregarPergunta(nPergunta) {
    if(nPergunta >= quiz.length) {
      --contQuestao
      elPergunta.innerHTML = 'Parabéns, você gastou seu tempo!'
      elAlternativas.innerHTML = ''
      return
    }
    elPergunta.innerHTML = quiz[nPergunta].pergunta
    elAlternativas.innerHTML = ""
    // for (let i = 0; i < 9; i++) {
    //   elRespostas.innerHTML += `<button>${quiz[nPergunta].alternativas[i]}</button>`
    // }
    quiz[nPergunta].alternativas.forEach(alt => elAlternativas.innerHTML += `<button>${alt}</button>`)
  }

  elAlternativas.addEventListener("click", ev => {
    const botaoClicado = ev.target.closest("button")
    if(!botaoClicado)
      return

    const arrayAlternativas = [...elAlternativas.children]
    const numeroDaAlternativaClicada = arrayAlternativas.indexOf(botaoClicado)

    if (numeroDaAlternativaClicada == quiz[numeroDaPergunta].resposta) {
      mudarCor('green', 'Acertou!')
      atualizarAcertos()
      carregarPergunta(++numeroDaPergunta)
      atualizarPergunta()
      return
    }
    mudarCor('red', 'Errou!')
    atualizarErros()
  })

  carregarPergunta(0)
  atualizarPergunta()
}

function atualizarErros() {
  ++contErros
  mostrarErros.textContent = "Erros: " + contErros
}

function atualizarAcertos() {
  ++contAcertos
  mostrarAcertos.textContent = "Acertos: " + contAcertos
}

function atualizarPergunta() {
  mostrarQuestao.textContent = "Questão Atual:  " + contQuestao
  ++contQuestao
}

function desaparecer() {
  var botao = document.getElementById('botao')
  
  botao.style.display = 'none'
  main()
  mostrarErros.textContent = "Erros: " + contErros
  mostrarAcertos.textContent = "Acertos: " + contAcertos
  mostrarAcertos.classList.add('padding')
  mostrarQuestao.classList.add('padding')
  mostrarErros.classList.add('padding')
}
