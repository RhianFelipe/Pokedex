

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`//numero estatico para uma -->interpolação de um id 
const generatePokemonsPromises = () => Array(150).fill().map((_, index) => //para que cada interação a gente adicione um item no fim desse array
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name , id , types }) => {  //queremos "reduzir" a Array  para uma string
        const elemensTypes = types.map(typeInfo => typeInfo.type.name)
        accumulator += `
    
    <li class="card ${elemensTypes [0]}">
    <img class="card-image " alt="${name}"  src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"/> 
    <h2 class="card-title"> ${id}. ${name} </h2>
    <p class="card-subtitle"> ${elemensTypes.join(' | ')}  </p>   
   
   
    </li>`
       
        return accumulator
    }, '')


const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonsPromises()
Promise.all(pokemonPromises) //recebe uma array de promises como argumento,e quando todas as promises da array estiverem resolvidas,ele vai retornar uma promise
    .then(generateHTML) //vamos receber uma array com todos os resultados resolvidos dessas pokemonsPromises
    .then(insertPokemonsIntoPage)



   
 //join retorna uma nova string  com todas os itens do array concatenados e separados por virgula 
//pedindo ao browser que ele traga dados de outro lugar
//fetch(url) metodo que ao ser invocado faz uma requisição http e traz dados da url que voce especifica por argumento, ele retorna tambem uma promisse
//.then(response => response.json()) resposta da promisse em formato JSON, para obtermos o body da resposta
//.then(pokemon => { soq o then também retorna uma promisse,entao temos q fazer outro then  })