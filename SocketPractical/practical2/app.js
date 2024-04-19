const express = require("express");
const connectDb = require("./database");
const { Server } = require("socket.io");
const app = express();

const Book = require("./model/bookModel");
connectDb();
const server = app.listen(4000, () => {
  console.log("server is running on port 4000");
});

const io = new Server(server);

//CRUD
io.on("connection", (socket) => {
  console.log("A user Connected");

  //create operation(addBook)
  socket.on("addBook", async (data) => {
    try {
      if (data) {
        const { bookName, bookPrice } = data;
        const newBook = await Book.create({
          bookName,
          bookPrice,
        });
        socket.emit("response", {
          status: 200,
          message: "book added successfully",
          data: newBook,
        });
      }
    } catch (error) {
      socket.emit("response", { status: 500, message: "something went wrong" });
    }
  });

  //getBoooks
  socket.on("getBook",async(data)=>{
    try {
      const books= await  Book.find()
      socket.emit('response',{status:200,message:"book fetched successfully",data:books})
    } catch (error) {
      socket.emit("response",{ status: 500, message: "something went wrong" });
    }
  })

  //update Books

   socket.on("updateBook",async(data)=>{
    try {
      if(data){
        const {bookName,bookPrice,bookId}=data;
       const updatedBook= await Book.findByIdAndUpdate(bookId,{
          bookName,
          bookPrice
        },{new:true});
        socket.emit("response",{status:200,message:"book updated Successfully",data:updatedBook})
      }
    } catch (error) {
      socket.emit("response", { status: 500, message: "something went wrong" });
    }
   })


   //delete Book
    socket.on("deleteBook",async(data)=>{
      try {
        if(data){
        const {bookId}=data
      await Book.findByIdAndDelete(bookId);
      socket.emit("response",{status:200,message:"Book deleted Successfully"})
      }  
    } catch (error) {
        socket.emit("response", { status: 500, message: "something went wrong" });
      }
    })
});
