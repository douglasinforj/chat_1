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
const chatMesseges = chat.querySelector(".chat__messages")




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


//Função criando a mensagem no chat utilizando tags do html:
const createMessageSelElement = (content) => {
    const div = document.createElement("div")

    div.classList.add("message--self")
    div.innerHTML = content

    return div
}





//Sortear cores para os usuários
const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)    //multiplicando pelo numero de cores no array
    return colors[randomIndex]
}


//Criando função que vai processar as mensagens
const processMessage = ({ data }) => {
    //TODO: Retirar o alert e o console.log
    //alert(data)
    console.log(JSON.parse(data))  //convertendo a string em objeto, para manusear os elemento

    //objetos
    const { userId, userName, userColor, content } = JSON.parse(data)
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









//Função para enviar a mensagem para o servidor:
const sendMessage = (event) => {
    event.preventDefault()

    //Criando objetos para evniar ao servidor
    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }

    websocket.send(JSON.stringify(message))    //enviado a mensagem
    
    chatInput.value = ""    //limpando o input após enviar a mensagem

}


//Botão para login
loginForm.addEventListener("submit", handleSubmit)   

//Botão enviar mensagem para o servidor
chatForm.addEventListener("submit", sendMessage)   



