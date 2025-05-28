const express = require("express");
const app = express();
const port = 5000;

const path = require("path");
const caminho = path.join(__dirname, "pages");

const mysql = require("mysql");

// Ler o body e transformar em JSON
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Rota para atualizar as informações de bebe
app.post("/bebes/atualizar", (req, res) => {
  const id = req.body.idValor;
  const nome = req.body.nome;
  const sexo = req.body.sexo;
  const mae = req.body.nomeMae;
  const sql = `UPDATE bebe 
               SET nome_bebe = '${nome}', sexo = '${sexo}', nome_mae = '${mae}' WHERE id_bebe = ${id}`
    conn.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      res.status(200).sendFile(`${caminho}/home.html`);
    }
  });
});

// Rota para buscar as informações de bebe específico
app.get("/bebes/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM bebe WHERE id_bebe = ${id}`;
  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados[0]);
    }
  });
});

// Rota pra pagina de editar
app.get("/bebe/editar/:id", (req, res) => {
  res.status(200).sendFile(`${caminho}/editarbebe.html`);
});

//Rota para excluir o bebe do banco de dados
app.get("/bebes/excluir/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM bebe WHERE id_bebe = ${id}`;
  conn.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      res.status(200).sendFile(`${caminho}/home.html`);
    }
  });
});

//Rota para inserir os bebes do banco de dados
app.post("/bebe/insert", (req, res) => {
  const nome = req.body.nome;
  const sexo = req.body.sexo;
  const mae = req.body.nomeMae;

  const sql = `INSERT INTO bebe (nome_bebe, sexo, nome_mae)
                 VALUES ('${nome}', '${sexo}', '${mae}')`;

  conn.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      res.status(201).redirect("/home");
    }
  });
});

// Rota pra pagina de cadastro
app.get("/bebe/cadastrar", (req, res) => {
  res.status(200).sendFile(`${caminho}/cadastrarbebe.html`);
});

//Rota para buscar os bebes do banco de dados
app.get("/bebes", (req, res) => {
  const sql = `SELECT * FROM bebe`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados).sendFile(`${caminho}/home.html`);
    }
  });
});

// Rota pra pagina index/home
app.get("/home", (req, res) => {
  res.status(200).sendFile(`${caminho}/home.html`);
});

// Mesma rota pra pagina index/home 2 - O retorno
app.get("/", (req, res) => {
  res.status(200).sendFile(`${caminho}/home.html`);
});

//Erro quando não achar a rota
app.use((req, res, next) => {
  res.status(404).sendFile(`${caminho}/404.html`);
});

//Cria a conexao com o banco
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodeBercario",
});

conn.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("Conectado com sucesso");
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }
});
