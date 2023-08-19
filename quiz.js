const elQuiz = document.querySelector(".quiz")
const elPergunta = elQuiz.querySelector(".pergunta")
const elAlternativas = elQuiz.querySelector(".alternativas")
let mostrarQuestao = document.querySelector(".mostrarQuestao")
let mostrarErros = document.querySelector(".mostrarErros")
let mostrarAcertos = document.querySelector(".mostrarAcertos")
let contErros = 0
let contAcertos = 0
let contQuestao = 1
const modal = document.querySelector('.modal')
const content = modal.querySelector('.content')
const janela = modal.querySelector('.window')


function erro(corNova, mensagem) {
  modal.classList.add("opened")
  janela.style.backgroundColor = corNova
  content.innerHTML = mensagem
    

  var tempoDeAtraso = 1300
  setTimeout(function() {
    modal.classList.remove("opened")
  }, tempoDeAtraso)
}

async function main() {
  
  const request = await fetch("quiz.json")
  const quiz = await request.json()

  numeroDaPergunta = 0

  function carregarPergunta(nPergunta) {
    if(nPergunta >= quiz.length) {
      elPergunta.innerHTML = 'Parabéns, você gastou seu tempo!'
      elAlternativas.innerHTML = ''
      mostrarQuestao.classList.add('escondido')
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
      erro('green', 'Acertou!')
      atualizarAcertos()
      carregarPergunta(++numeroDaPergunta)
      atualizarPergunta()
      return
    }
    erro('red', 'Errou!')
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

mostrarErros.textContent = "Erros: " + contErros
mostrarAcertos.textContent = "Acertos: " + contAcertos
main()