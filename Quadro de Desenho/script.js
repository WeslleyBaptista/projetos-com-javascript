//Initials Data
let currentColor = 'black'
let canDraw = false
let mouseX = 0
let mouseY = 0
let screen = document.querySelector('#tela')
let ctx = screen.getContext('2d')




// Events
document.querySelectorAll('.color').forEach(item =>{
    item.addEventListener('click', colorClickEvent)
})

screen.addEventListener('mousedown', mouseDownEvent)
screen.addEventListener('mousemove', mouseMoveEvent)
screen.addEventListener('mouseup', mouseUpEvent)


document.querySelector('.clear').addEventListener('click',clearScreen);


// Functions

function colorClickEvent(event){
    let color = event.target.getAttribute('data-color')
    currentColor = color

    document.querySelector('.colorAreaAll .active').classList.remove('active')
    event.target.classList.add('active')
}



function mouseDownEvent(e){
    canDraw = true
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}



function mouseMoveEvent(e){
    if(canDraw){
        draw(e.pageX, e.pageY);
    }
}



function mouseUpEvent(){
    canDraw = false
}


function draw(x, y){
    let pointX = x - screen.offsetLeft
    let pointY = y - screen.offsetTop

    ctx.beginPath()
    ctx.lineWith = 10 // 5px de largura a linha
    ctx.lineJoin = 'round' // formato da linha mais arredondado
    ctx.moveTo(mouseX, mouseY) // mova o cursor para a posição inicial
    ctx.lineTo(pointX, pointY) // faça uma linha até esses 2 pontos.
    ctx.closePath() //comando que determina o fim
    ctx.strokeStyle = currentColor // comando que armazena a cor
    ctx.stroke() // comando que mudar cor da linha

    mouseX = pointX
    mouseY = pointY
}


function clearScreen(){
    //comando de inicio que permite estar apagando a tela
    ctx.setTransform(1,0,0,1,0,0);
    //função que deleta todas as linhas da tela
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
}