// Imports | Importations
import express from 'express'
import mongoose from 'mongoose'
import Messages from './CurvaDB.js'
import Pusher from 'pusher'
import cors from 'cors'

// App & Pusher API Config | Configuration de l'application et de l'API Pusher
const app = express()
const port = process.env.PORT || 9000
const pusher = new Pusher({
// Pusher API config here
})

    // Middlewares | Les middlewares
app.use(express.json())
app.use(cors())

// DB Config | Configuration de la Base de données
mongoose.connect('Replace this with MongoDB infos',{
useCreateIndex: true,
useNewUrlParser: true,
useUnifiedTopology: true})
const db = mongoose.connection
db.once('open',()=>{
    console.log('Database connected/BDD Connectée')
    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()
    changeStream.on('change',(change)=>{
        console.log('It works !/ça marche !', change)
        if(change.operationType==='insert') {
            const messageDetails = change.fullDocument
            pusher.trigger('messages','inserted', { 
                userId : messageDetails.userId,
                avatar: messageDetails.avatar,  
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,})
        } else {console.log('Error related to Pusher/Erreur liée à Pusher')}})})

// API Routes | Routes API
app.get("/",(req,res)=>res.status(200).send("Hey, everything works as planned/hey, tout marche comme prévu"))
app.get('/messages/sync', (req,res)=>{
    Messages.find((err,data)=>{
        if(err) {res.status(500).send(err)} else {res.status(200).send(data)}})})
app.post('/messages/new', (req,res)=>{ 
    const dbMessage = req.body 
    Messages.create(dbMessage, (err,data)=> {
        if (err) {res.status(500).send(err)} else {res.status(201).send(data)}})})

// Listening | l'écoute
app.listen(port,()=>console.log(`Listening on localhost:${port}`))