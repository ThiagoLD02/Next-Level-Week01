
function populateUFs(){
    
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //function nome(res){return res.json()}
    .then( states => {

        
        for( const state of states){
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs()

function getCities(event){

    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    // console.log(event.target.value) Bom para testar se o select esta correto

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then( res => res.json() ) //function nome(res){return res.json()}
    .then( cities => {

        
        for( const city of cities){
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )
}

document
    .querySelector("select[name=uf]") //Buscar um campo na página
    .addEventListener("change",getCities)

// Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
    
    const itemLi = event.target
    
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // Verificar e adicionar os itens ja selecionados
    const alreadySelected = selectedItems.findIndex( function(item){
        
        const itemFound = item == itemId
        return itemFound

    } )
    // Ou podemos fazer uma arrow function
    // const alreadySelected = selectedItems.findIndex( item => item == itemId )

    // Se ja estiver selecionado
    if( alreadySelected >=0 ){
        //Tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }
    // Se nao estiver, adicionar a selecao
    else {
        selectedItems.push(itemId)
    }

    // Atualizar o campo escondido com os itens selecionados

    collectedItems.value = selectedItems



}























