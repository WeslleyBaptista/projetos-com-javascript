// Dados Iniciais

let square = {
    a1:'', a2:'', a3:'',
    b1:'', b2:'', b3:'',
    c1:'', c2:'', c3:''
}

let turn = ''
let playing = false 
let warning = '' 


reset()

// Eventos
document.querySelector('.reset').addEventListener('click', reset)

document.querySelectorAll('.item').forEach((item)=>{ 
    item.addEventListener('click', itemClick)
})


// Funções
function itemClick(event){
    let item = event.target.getAttribute('data-item')

    if(playing && square[item] === ''){
        square[item] = turn
        showCaractere()
        togglePlayer()
    } 
    
}


function reset(){
    warning = ''

    let random = Math.floor(Math.random() * 2)
    turn = (random === 0) ? turn = 'X': turn = 'O';


    for(let i in square){
        square[i] = ''
    }

    playing = true
   
    showCaractere()
    InfoTurn()
}



function showCaractere(){
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = square[i]
    }
    
    checkGame()
}


function InfoTurn(){
   
    document.querySelector('.vez').innerHTML = turn
    document.querySelector('.resultado').innerHTML = warning
}


function togglePlayer(){
    if(turn === 'X'){
        turn = 'O'
    }else{
        turn = 'X'
    }
    
    InfoTurn()
}


function checkGame(){
    if(checkWinnerFor('X')){
        warning = 'O x foi o vencedor!'
        playing = false
    }else if(checkWinnerFor('O')){
        warning = 'O o foi o vencedor!'
        playing = false
    }else if(isFull()){
        warning = 'Deu empate!'
        playing = false
    }
}


function checkWinnerFor(turn){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for(let i in pos) {
        let pArray = pos[i].split(',')
        console.log(pArray);

        let hasWon = pArray.every(option => square[option] === turn)

        if(hasWon){
            return true
        }
    }

    return false
}


function isFull(){
    for(let i in square){
     
        if(square[i]===''){
            return false;
        }
    }

    return true;
}











