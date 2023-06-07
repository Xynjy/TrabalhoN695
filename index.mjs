import express from 'express'
import { connect } from './database.mjs'

const app = express()
let db  
async function connectDatabase() {
  db = await connect()
}
app.use(express.json()) 
connectDatabase()


app.post('/registro', async (req, res) => {
  const { nome, email, senha } = req.body

  if (String(email).length && String(senha).length) {
    await db.collection('usuarios').insertOne({
      nome,
      email,
      senha
    })
  }

  return res.send('cadastrado')
})

app.get('/login', async (req, res) => {
  const { email, senha } = req.query
  let usuario = null

  if (String(email).length && String(senha).length) {
    console.log(db)
    usuario = await db.collection('usuarios').findOne({
      email,
      senha
    })
  }

  return res.send(usuario)
})

app.put('/usuario', async (req, res) => {
  const {email}=req.query
  const { nome } = req.body
  let usuario = null

  usuario = await db.collection('usuarios').updateOne(
    { email },
    { $set: { nome } }
  )

  return res.send(usuario)
})

app.delete('/usuario', async (req, res) => {
  const { email } = req.query

  await db.collection('usuarios').deleteOne({ email })

  return res.send('usuário' + email + ' foi apagado')
})


app.listen(3000, () => {
  console.log('online')
})

