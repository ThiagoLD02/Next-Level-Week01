// Importar a dependencia do Sqlite3
const sqlite3 = require("sqlite3").verbose()
// Verbose mostrara qualquer alteracao no terminal

// Criar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// Para podermos utilizar o require para usar o banco
module.exports = db

db.serialize(()=>{
//     // Criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // Deletar

    // db.run(`DELETE FROM places WHERE id = ?`,[5],function(err){

    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso!")
    // })

    // // Consulta

    // db.all(`SELECT * FROM places`, function(err,rows){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Aqui estão seus registros: ")
    //     console.log(rows)
    // })


})