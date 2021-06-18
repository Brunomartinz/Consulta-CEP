var submiteButton = document.querySelector('#app form button')

var zipCodeField = document.querySelector('#app form input')

var content = document.querySelector('#app main')

submiteButton.addEventListener('click', run)

function run(event) {
  event.preventDefault()

  var zipCode  = zipCodeField.value;

  zipCode = zipCode.replace(' ', '')
  zipCode = zipCode.replace('-', '')
  zipCode = zipCode.trim();

axios
.get('https://viacep.com.br/ws/' + zipCode +'/json/')
.then(function(response) {
  if(response.data.error) {
     throw new Error('CEP inválido')
  }
  // esvazia o conteudo , caso tenha sido preenchido anteriormente
  content.innerHTML = ''

  createLine(response.data.logradouro)
  createLine(response.data.bairro)
  createLine(response.data.localidade + ' - ' + response.data.uf)
  
})
.catch(function(error) {
  createLine('Ops, algo deu errado!')
console.log(error)
})
}

function createLine(text) {
  // cria um novo elemento html
var line = document.createElement('p');
// cria um novo texto para essa tag p
var text = document.createTextNode(text);
// essa nova linha rece o valor do texto digitado
line.appendChild(text)
// coloca essa linha p en nosso documento HTML 
content.appendChild(line)
}