const axios = require("axios")
const express = require ("express")
const app = express()
const cors = require ("cors")

app.listen("3000", () => {
    console.log("Servidor rodando na porta 3000, tudo certo!")
})

app.use(cors())

app.use((req, res, next) =>  {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})
app.use(express.json())

app.route("/time").post((req, res) => {
    
    const email = req.body.email
    const time = req.body.time
    const interesse = req.body.interesse
    const cassino = req.body.cassino
    const jogo = req.body.jogo
    console.log(email)
    console.log(time)
    console.log(interesse)
    console.log(cassino)
    console.log(jogo)

    async function InsertApiRD () {
        try {
            const result = await axios.post(
    
                "https://api.rd.services/platform/conversions?api_key=xxxxxxxxxxxxxxxxxxxxxxxxxx",
                
                {
                    "event_type": "CONVERSION",
                    "event_family": "CDP",
                    "payload": {
                      "conversion_identifier": "Bot Conversa",
                      "email": email,
                      "cf_time": interesse,
                      "cf_time_do_coracao": time,
                      "cf_cassino": cassino,
                      "cf_jogo": jogo
                  
                    }
                  }
    
    
    
            )
            console.log(result.config.data)
            res.status(200).send(result.config.data)
            console.log("Processado com sucesso!")
            
    
        } catch (error) {
            console.error("Ocorreu um erro", error)
            res.status(500).send("Erro")
        }
    }
    
    InsertApiRD()

})

