const express=require('express')
const {Server}=require('socket.io')
const app=express()






const server=app.listen(4000,()=>{
    console.log("Server established successfully ast port 4000")
})

const inputOuptut=new Server(server)

inputOuptut.on('connection',(socket)=>{
    // console.log(socket.id)
    // socket.emit("hi",{
    //     greeting:"hello don"
    // })
    // console.log('Someone has connected')
    // socket.on('abc',(data)=>{
    //   console.log(data)
    // }) //abc vneko event name ho jun chai same huna parxa server snga

    socket.on('sendData',(data)=>{
        console.log(data)
        // if(data){
        // socket.emit("response","Your data was received")// socket vaneko jsle request garyo teslai matra pthaune
        // }
       inputOuptut.emit("response","Thank you") //this will brodcast the message to
                                            //prevent it we can use io.to(socket.id).emit()
    })
      
    // socket.on('disconnect',()=>{
    //     console.log('Disconnected a user')
    // })
})