document.querySelector('.busca').addEventListener('submit', async function (event){
    event.preventDefault();

    let input = document.querySelector('#searchInput').value
    
    if(input !== ''){
        clearInfo()
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=782954e623ddb8c39fa077373a8213c9&units=metric&lang=pt_br`
        let results = await fetch(url)
        let json = await results.json()

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })

        } else{
            clearInfo()
            showWarning('Não encontramos a sua localização.')
        }

        console.log(json)
    }


})


function showInfo(json){
    showWarning('')

    document.querySelector('.resultado').style.display = 'block'

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp}`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`


}


function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}


function clearInfo(){
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'

}