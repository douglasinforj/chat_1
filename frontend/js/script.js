// Login
//Buscando os elemento e armazenando em variáveis
const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = login.querySelector(".login_input")

// Chat Elements
//Buscando os elemento e armazenando em variáveis
const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat_input")




//Criando aributos do usuário, precisamos criar id
const user = { id: "", name: "", color: ""}


//Array Cores para o usuário
const colors = [
    "caderblue",
    "darkgoldnrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
]




//Variavel para websocket
let websocket




//Sortear cores para os usuários
const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)    //multiplicando pelo numero de cores no array
    return colors[randomIndex]
}


//Criando função que vai processar as mensagens
const processMessage = ({ data }) => {
    alert(data)
}




const handleSubmit = (event) => {
    event.preventDefault()             //evita carregamento da pagina, padrao

    user.id = crypto.randomUUID()            //Funcao do javascript para gerar ids
    user.name = loginInput.value            //Recuperando dados do campo name do usuário
    user.color = getRandomColor()           //Adicionando a função para sortear as cores
    login.style.display = "none"  //Vai oculta o login

    chat.style.display = "flex"   //Vai mostrar Chat

    //Criando conexão com servidor
    websocket = new WebSocket("ws://localhost:8080")
    //processa a mensagem vindo do servidor:
    websocket.onmessage = processMessage


    console.log(user)                 //verificando
}

loginForm.addEventListener("submit", handleSubmit)   //evento clicar

