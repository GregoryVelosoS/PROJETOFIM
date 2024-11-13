//Configuração express
const express = require('express')
const app = express()
const port = 5000

// Configuração banco
const mysql = require('mysql2')

//Ler o body e transformar em JSON
app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())

// Código pro CORS funcionar
const cors = require('cors')
app.use(cors())

//Rota para criação de usuário
app.post("/usuario/criar", (req,res) =>{
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha
    const tipo = req.body.tipo
    
    const sql = `INSERT INTO usuario (usu_nome, usu_email, usu_senha, usu_tipo) VALUES ('${nome}', '${email}', '${senha}', '${tipo}')`

    conn.query(sql, (erro) => {
        if(erro){
            console.log(erro)
            res.status(500).json(erro.sqlMessage).end()
        }
        else{
            res.status(200).json("Cadastro efetuado").end()
        }
    })
})


//Rota padrão
app.get("/", (req, res) => {
    res.status(200)
    res.end()
})

//Configura a conexão
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database: "crudfinal"
})

//Código para conexão com o banco
conn.connect((erro) => {
    if(erro){
        console.log(erro)
    }
    else{
        console.log("Conectado com sucesso")
        //Iniciando o servidor
        app.listen(port, ()=>{
            console.log(`Servidor rodando na porta ${port}`)
        })
    }
})