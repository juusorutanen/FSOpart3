const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// calculate how many people are in the persons array
app.get("/api/info", (request, response) => {
  let amountOfPersons = persons.length;
  response.send(`<h1>Phonebook has info for ${amountOfPersons} people</h1>`);
});

// show persons phone number

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  console.log(person);
  if (person) {
    response.send(person.number);
  } else {
    response.status(404).end();
  }
});

// delete persons phonenumber

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    person.number = "";
  } else {
    response.status(404).end();
  }
});

// generate a new id that is always different

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

// add new person

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: !body.name ? "name missing" : "number missing",
    });
  }

  const personExists = persons.find((person) => person.name === body.name);

  if (personExists) {
    return response.status(400).json({
      error: "name already exists",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
