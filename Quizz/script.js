// Initials Data
let currentQuestion = 0
let correctAnwers = 0



showQuestion()
// Events

document.querySelector('.scoreArea button').addEventListener('click', reset)



// Functions

function showQuestion(){
    if(questions[currentQuestion]){ // quando eu faço isso daqui, a minha variável está indicando umINDICE DENTRO DO MEU ARRAY, no caso o indice 0, ela não se transforma em um elemento do meu array.
        let q = questions[currentQuestion]

        let pct = Math.floor((currentQuestion / questions.length) * 100)
        document.querySelector('.progress--bar').style.width = `${pct}%`
        
        
        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question
        document.querySelector('.options').innerHTML = ''
        document.querySelector('.options').innerHTML = q.options

        let optionsHtml = ''
        for(let i in q.options){
            optionsHtml += `<div data-op = ${i} class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHtml

        document.querySelectorAll('.options .option').forEach((item)=>{
            item.addEventListener('click', optionClickEvent)
        })
        


    }else{
        finishQuiz()
    }
}


function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op')) // se eu nao tivesse colocado o parseInt aqui, ele retornaria a resposta como string e não daria certo pois tem que estar como number.
    let q = questions[currentQuestion]
    if(q.answer === clickedOption){
        correctAnwers++
    }

    currentQuestion++
    showQuestion()
}


function finishQuiz(){
    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.questionArea').style.display = 'none'

    let points = Math.floor((correctAnwers / questions.length) * 100)

    if(points < 30){
        document.querySelector('.scoreText1').innerHTML = 'Você precisa estudar mais!'
        document.querySelector('.scorePct').style.color = 'red'
    }else if(points > 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = 'Estou um pouco, né?'
        document.querySelector('.scorePct').style.color = 'yellow'
    }else if(points > 70){
         document.querySelector('.scoreText1').innerHTML = 'Parabéns!!'
         document.querySelector('.scorePct').style.color = 'green'
         
    }



    document.querySelector('.progress--bar').style.width = '100%'
   
    document.querySelector('.scorePct').innerHTML = `Acertou: ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você fez ${questions.length} questões e acertou ${correctAnwers}`


}


function reset(){
    currentQuestion = 0
    correctAnwers = 0
    showQuestion()
}