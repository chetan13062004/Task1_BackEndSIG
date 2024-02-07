const express = require("express");

const app = express();

//to parse the request body
app.use(express.json());


//Books Api Routes: GET, POST, PUT, DELETE
let books = [
    {
        id: 1,
        name: "Harry Potter",
        author: "J.K. Rowling"
    },
    {
        id: 2,
        name: "The Alchemist",
    },
    {
        id: 3,
        name: "The Da Vinci Code",
    }

];


// app.get("/", (req, res) => {
//     res.status(200).json({ message: "Hello change this to list of books!" });
// })

// Add other requests GET, POST, PUT, DELETE

//get request
app.get('/books', (req, res) => {
    res.json(books);
});

//post request
app.post('/addbooks',(req,res)=>{
    const{id,name,author}=req.body;

    const newBook = {id,name,author};
    
    if(books.push(newBook)){
        res.json({msg : "Book Added Successfully"});
    }else{
        res.send("Not added");
    }
    
})

//delete request
app.delete('/deleteBook/:id', (req, res) => {
    const { id } = req.params;
    const index = books.findIndex(book => book.id === parseInt(id));

    if (index !== -1) {
        res.json({ msg: "Book deleted successfully" });
    } else {
        res.status(404).send("Book not found");
    }
});

//put request (update)
app.put("/updateBook/:id",(req,res)=>{
    const {id}=req.params;
    const {name,author}=req.body;

    const index=books.findIndex(book=>book.id===parseInt(id));


    if(index !== -1){
        if(name) books[index].name=name;
        if(author) books[index].author=author;

        res.json({MSG:"Book updated successfully"});
    }else{
        res.send("Book not found");
    }
})



app.listen(8000, () => {
    console.log(`App is live on: http://localhost:8000`);
});