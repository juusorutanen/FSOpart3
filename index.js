	
const express = require('express')
const app = express()


let persons	= [
{
id: 1,
name:"Arto Hellas",
number:	"040-123456"
},
{
id: 2,
name:"Ada Lovelace",
number:	"39-44-5323523"
},
{
id: 3,
name:"Dan Abramov",
number:	"12-43-234345"
},
{
id: 4,
name:"Mary Poppendieck",
number:	"39-23-6423122"
}
]

app.get('/api/persons', (request,response)=> {
    response.json(persons)
  })

// calculate how many people are in the persons array
app.get('/api/info', (request,response)=> {
    let amountOfPersons = persons.length
    response.send(`<h1>Phonebook has info for ${amountOfPersons} people</h1>`)
    
  })

const PORT = 3001
app.listen(PORT, () => {
console.log(`server running on port ${PORT}`)
})