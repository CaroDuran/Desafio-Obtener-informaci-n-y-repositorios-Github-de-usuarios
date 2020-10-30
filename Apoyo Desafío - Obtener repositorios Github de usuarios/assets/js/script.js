
async function request(url){
    try{
        const resp = await fetch(url).then(response => response.json())
        return resp
    }catch(err){
        console.log(err)
    }
}

async function getUser(user){
    return await request(`https://api.github.com/users/${user}`);
}

async function getRepo(user,page,perPage){
    return await request(`https://api.github.com/users/${user}/repos?page=${page}&per_page=${perPage}`)
}

let btn = $('button')

btn.on('click',(e)=>{
    e.preventDefault();
    let user = $('#nombre').val()
    let page = $('#pagina').val()
    let perPage = $('repoPagina').val()

    Promise.all([getUser(user), getRepo(user,page,perPage)]).then(results =>{
        printHtml(results)
        })
    })

    function printHtml(data){
        let userInfo = document.createElement('div') 
        let repoInfo = document.createElement('div')

        let userUl = document.createElement('ul')
        let repoUl = document.createElement('ul')

        // Descontructurar un objeto
        const {name, login, public_repos, location, type} = data[0]

        [name, login, public_repos, location, type].forEach(element => {
            let li = document.createElement('li')
            li.innerHTML = `<strong>${element}</strong>`
            userUl.appendChild('li')
        })

        userInfo.className = 'userInfo col-6'
        repoInfo.className = 'repoInfo col-6'

        userInfo.appendChild(userUl) // appendChild agrega al div un ul // Agrega un hijo
        repoInfo.appendChild(repoUl)

        $('#resultados').empty() // vuelve a cargar la info en el mismo div
        $('#resultados').append('userInfo')
        $('#resultados').append('repoInfo')
        

        console.log(data)
    }




//Ambas llamadas en paralelo
//getUser('CaroDuran').then(resp => console.log(resp))
//getRepo('CaroDuran',0,100).then(resp => console.log(resp))
//result.then(resp => { console.log(resp)}) 

// Ambas llamadas en paralelo pero retornando juntas
// Promise.all([getUser('CaroDuran'), getRepo('CaroDuran',0,100)]).then(prom=>{
    //console.log(prom[0])
    //console.log('********************************');
    //console.log(prom[1])
//})





