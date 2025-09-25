const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

// Criar banco sqlite
const db = new sqlite3.Database("./biblioteca.db");

// Criar tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    autor TEXT,
    paginas INTEGER,
    ano INTEGER,
    imagem TEXT
  )
`);

// === ROTAS ===

// Listar todos os livros
app.get("/livros", (req, res) => {
  db.all("SELECT * FROM livros", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Buscar 1 livro
app.get("/livros/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM livros WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// Criar novo livro
app.post("/livros", (req, res) => {
  const { titulo, autor, paginas, ano, imagem } = req.body;
  db.run(
    "INSERT INTO livros (titulo, autor, paginas, ano, imagem) VALUES (?, ?, ?, ?, ?)",
    [titulo, autor, paginas, ano, imagem],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, titulo, autor, paginas, ano, imagem });
    }
  );
});

// Atualizar livro
app.put("/livros/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, autor, paginas, ano, imagem } = req.body;
  db.run(
    "UPDATE livros SET titulo = ?, autor = ?, paginas = ?, ano = ?, imagem = ? WHERE id = ?",
    [titulo, autor, paginas, ano, imagem, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// Deletar livro
app.delete("/livros/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM livros WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
