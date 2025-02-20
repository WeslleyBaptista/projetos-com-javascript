let seuVotoPara = document.querySelector('.d-1-voto')
let cargo = document.querySelector('.d-1-politico')
let info = document.querySelector('.d-1-info')
let infoDireita = document.querySelector('.d-1-right')
let infoAbaixo = document.querySelector('.d-2')
let numeros = document.querySelector('.d-1-numero')

let etapaAtual = 0
let numeroA = ''
let votoBranco = false

function comecarEtapa(){
    let etapa = etapas[etapaAtual] 
    votoBranco = false 
    numeroA = '' 
    let numerosHtml = '' 
    for(let i = 0; i < etapa.numeros; i++){
        if(i === 0){ 
            numerosHtml +=  '<div class="voto-numero pisca"></div>'
        }else{
            numerosHtml +=  '<div class="voto-numero"></div>' 
        }
    }

    seuVotoPara.style.display = 'none' 
    cargo.innerHTML = etapa.titulo
    info.innerHTML = ''
    infoAbaixo.style.display  = 'none'
    infoDireita.innerHTML  = ''
    numeros.innerHTML = numerosHtml;

}

function atualizaInterface(){
    let etapa = etapas[etapaAtual]

    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numeroA){ 
            return true
        }else{
            return false
        }
    })
    if(candidato.length > 0){
        candidato = candidato[0] 
        seuVotoPara.style.display = 'block' 
        info.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`
        infoAbaixo.style.display  = 'block'

        let fotosHtml = '';
        for(let i in candidato.fotos) {
           fotosHtml += `<div class="d-1-img"><img src="images/${candidato.fotos[i].url}" alt=""> ${candidato.fotos[i].legenda}</div>`
           infoDireita.innerHTML = fotosHtml
        }
    }else{
        seuVotoPara.style.display = 'block' 
        info.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>'
        infoAbaixo.style.display  = 'block'
    }

   
}





function clicou(n){
    let elNumero = document.querySelector('.voto-numero.pisca')
    if(elNumero !== null){
        elNumero.innerHTML = n
        numeroA = `${numeroA}${n}`

        elNumero.classList.remove('pisca')
        if( elNumero.nextElementSibling !== null){
        elNumero.nextElementSibling.classList.add('pisca')
        }else{
            atualizaInterface()
        }
    }
}

function branco(){
    if(numeroA === ''){
        votoBranco = true
        seuVotoPara.style.display = 'block' 
        info.innerHTML = '<div class="voto-branco pisca">VOTO EM BRANCO</div>'
        infoAbaixo.style.display  = 'block'
        numeros.innerHTML = ''
    }
}


function corrige(){
    comecarEtapa()
}


function confirma(){
    let etapa = etapas[etapaAtual]

    let votoConfirmado = false
    if(votoBranco === true){
        votoConfirmado = true
        console.log("Confirmando como BRANCO")
    }else if(numeroA.length === etapa.numeros){
        votoConfirmado = true
        console.log("Confirmando como " +numeroA)
    }

    if(votoConfirmado){
        etapaAtual++
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa()
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>'
        }
    }
}


comecarEtapa()


