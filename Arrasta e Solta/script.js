let areas = {
    a: null,
    b: null,
    c: null
}

// Events 
document.querySelectorAll('.item').forEach((item)=>{
    item.addEventListener('dragstart', dragStart) // Disparado quando o item começa a ser arrastado.
    item.addEventListener('dragend', dragEnd) // Disparado quando o arraste termina.
})

document.querySelectorAll('.area').forEach((area)=>{
    area.addEventListener('dragover', dragOver) // Disparado continuamente enquanto o elemento arrastado está sobre uma área de destino válida.
    area.addEventListener('dragleave', dragLeave) // Disparado quando o elemento arrastado sai de uma área de destino válida.
    area.addEventListener('drop', drop) // Disparado quando o elemento arrastado é solto em uma área de destino válida.
})


document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral)
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral)
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral)


// Functions Item

function dragStart(e){
    e.currentTarget.classList.add('dragging')
}

function dragEnd(e){
    e.currentTarget.classList.remove('dragging')
}



// Funticons Area

function dragOver(e){
    if(e.currentTarget.querySelector('.item') === null){ 
        e.preventDefault() // e dessa forma aqui eu libero, o dragOver tem o comportamento natural de não liberar o elemento, quando eu coloco um preventDefault eu inibo este comportamento.
        e.currentTarget.classList.add('hover')
       
    }
    

}



function dragLeave(e){
    e.currentTarget.classList.remove('hover')
}



function drop(e){ // Para que essa função funcione eu preciso 'liberar'' no dragOver para que seja permiitido dropar o item aqui.
    e.currentTarget.classList.remove('hover')

    if(e.currentTarget.querySelector('.item') === null){ // Se na área de drop não tiver nenhum elemento com a classe .item, então rode o código a seguir
        let dragItem = document.querySelector('.item.dragging') // Selecionei o elemento que está sendo arrastado
        e.currentTarget.appendChild(dragItem) // Na área de drop acrescente o ''dragItem''.
    }
    updateAreas()
    
}





// Functions Neutral Area

function dragOverNeutral(e){
    e.preventDefault()
    e.currentTarget.classList.add('hover')
}



function dragLeaveNeutral(e){
    e.currentTarget.classList.remove('hover')
}



function dropNeutral(e){
    e.currentTarget.classList.remove('hover')
    let dragItem = document.querySelector('.item.dragging') // Selecionei o elemento que está sendo arrastado
    e.currentTarget.appendChild(dragItem)
    updateAreas()
}




// Logic Areas

function updateAreas(){
    document.querySelectorAll('.area').forEach(area=>{
        let name = area.getAttribute('data-name')

        if(area.querySelector('.item') !== null){
            areas[name] = area.querySelector('.item').innerHTML
        }else{
            areas[name] = null
        }
    })

    if(areas.a === '1' && areas.b === '2' && areas.c === '3'){
        document.querySelector('.areas').classList.add('correct')
    }else{
        document.querySelector('.areas').classList.remove('correct')
    }

}