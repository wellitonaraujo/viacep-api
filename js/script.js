
// Função pata limpar o formulário
function cleanForm(address) {  
        document.querySelector('#endereco').value = " ";
        document.querySelector('#bairro').value = " ";
        document.querySelector('#cidade').value = " ";
        document.querySelector('#estado').value = " ";
}

// Função que renderiza os valores no formulário
function fillForm(address) {
    // Desestruturando de adress
    const { logradouro, bairro, localidade, uf } = address;

    document.querySelector('#endereco').value = logradouro;
    document.querySelector('#bairro').value = bairro;
    document.querySelector('#cidade').value = localidade;
    document.querySelector('#estado').value = uf;
}

// Função para verificar se o cep é numero
const isNumber = (num) => /^[0-9]+$/.test(num);

// Função para verificar se o cep é válido
const cepValid = (cep) => cep.length === 8 && isNumber(cep);


// Fazendo  a requisição da API
async function searchCep() {
    cleanForm()
    const cep = document.querySelector('#cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    // Verifica se o cep é válido
    if (cepValid(cep)) {
        const resp = await fetch(url);
        const address = await resp.json();

    if (address.hasOwnProperty('erro')){
        document.querySelector('#endereco').value = "CEP não encontrado!";

    }else {
        // Consumindo os dados
        fillForm(address);
    }
   
  }else {
    document.querySelector('#endereco').value = "CEP INCORRETO!";
  }
    
}

document.querySelector('#cep')
.addEventListener('focusout', searchCep);
