const express = require("express")
const server = express()


// Pegar o bd
const db = require("./database/db")


// Configurar a pasta publica
server.use(express.static("public"))


// Habilitar o uso do req.body (envio de dados)
server.use(express.urlencoded( { extended: true } ) )


// Utilizando a template engine Nunjucks
const nunjucks = require("nunjucks")


// Setando a pasta de trabalho e passando um objeto de configuração
nunjucks.configure("src/views",{
    // Passamos o servidor
    express: server,
    // E nao usamos cache para evitar problemas com arquivos desatualizados
    noCache: true
})


// Configurar a pagina inicial
server.get("/",(req,res)=>{

    // Não usamos dirname pois o caminho ja estah setado no nunjucks
    return res.render("index.html")
})

server.get("/create-point",(req,res)=>{

    return res.render("create-point.html")
})

server.post("/savepoint",(req,res)=>{

    // Inserir dados no banco de dados
    const query = `
    INSERT INTO places 
    (image, name, address, address2, state, city,items) 
    values (?,?,?,?,?,?,?);
    `
   
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){

        if(err){
           console.log(err)
           return res.send("Falha no cadastro")
        }

        return res.render("create-point.html",{saved: true })

    }

    db.run(query,values,afterInsertData)

})

server.get("/search",(req,res)=>{

    const search = req.query.search

    if(search == ""){
        // Pesquisa vazia
        return res.render("search-results.html",{total: 0 })
    }



    // Pegar os dados do bd

    db.all(`SELECT * FROM places WHERE city LIKE  '%${search}%'`,function(err,rows){

        if(err){
            return console.log(err)
        }
        const total = rows.length

        return res.render("search-results.html",{ places:rows, total })

    })

})

// Ligar o servidor na porta 3000
server.listen(3000)
