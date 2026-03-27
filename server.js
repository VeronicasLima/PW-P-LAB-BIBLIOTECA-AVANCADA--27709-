require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.SERVER_PORT || 4242;

app.get("/", (req, res) => {
    res.json({ message: "API a funcionar 🚀" });
});

let users = [
    { id: 1, name: "Ana", email: "anapaula@gmail.com" },
    { id: 2, name: "João", email: "joao@gmail.com" }
];

app.get("/users", (req, res) => {
    res.json(users);
});

app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id);

    if (!user) {
        return res.status(404).json({ message: "Não encontrado" });
    }

    res.json(user);
});

app.post("/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Campos obrigatórios" });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Não encontrado" });
    }

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Campos obrigatórios" });
    }

    users[index] = { id, name, email };

    res.json(users[index]);
});


app.delete("/users/:id", (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.json({ message: "Apagado" });
});

app.listen(PORT, () => {
    console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
});

