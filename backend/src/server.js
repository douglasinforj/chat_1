const { WebSocketServer } = require("ws")    //Importando a websocket
const dotenv = require("dotenv")            //lidando com variaveis de ambiente

dotenv.config()

const wss = new WebSocketServer({ port: process.env.PORT || 8080})    //variavel PORT vem do arquivo .env, ou um valor alternativo 8080


//criando um evento de conexão

wss.on("connection", (ws)=>{        //ws cliente conectando servidor

    ws.on("error", console.error)   //caso de algum erro

    //teste de envio de mensagem do servidor ao cliente
    ws.send("Mensagem enviada pelo servidor!")

    ws.on("message", (data)=>{          //disparado sempre que alguem enviar uma mensagem para o servidor, data = dados do cliente
        wss.clients.forEach((client) => client.send(data.toString()))     //Enviando mensagens para todos os clients conectados
    })

    console.log("client connected")
})