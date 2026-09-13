console.log();
// export express -
const express = require('express');

// http modeule install
const http = require('http');

const path = require('path');


const app = express();

//crating server -
const server = http.createServer(app);

// new server for socket - S big s
const {Server} = require('socket.io');

// io - 
const io = new Server(server);
// eh ho gya socket te aapna server attach


// TRY -    
// adding path - directory name
// console.log(__dirname);
// console.log(path.join(__dirname));
// console.log(path.join(__dirname, 'public/index.html'));

// console.log(path.join(__dirname));

// 2nd way using middleware 
app.use(express.static(path.join(__dirname, 'public')));


// making connection using io 
io.on('connection', (socket) => {
    // RECIEVE - kithe recieve krna
    socket.on("message from frontend", (frontend_toh_recieved_message) => {
        console.log(frontend_toh_recieved_message);

        // je mai eethe emit krna
        io.emit("message from backend", `${socket.id} : ${frontend_toh_recieved_message}`);
        // io.emit("message from backend", "hello i am from backend");
    });
    console.log('user is connected', socket.id);    // jd vi connection bnda jd new id bndi hai
})


// adding api - 
// app.get('/', (req, res)=>{
//     // res.send();
//     res.json({
//         name: "jashanjit kaur",
//         age: 95,
//         city: "patiala"
//     });
// })

app.get('/', (req, res)=>{
    // res.send("hello");

    // but mai eethe static file nu dikhana hai 
    // res.sendFile('./public/index.js');          // sendFile ch path do 

    // Error - TypeError: path must be absolute or specify root to res.sendFile
    // absolute path den li import kro path

    // giving absolute path - 
    // res.sendFile(path.join(__dirname, 'public/index.html'));

    // using middleware - 
    res.sendFile('index.html');
})


// making server - 
// app.listen(5000, ()=>{
//     console.log("server is running on port http://localhost:5000");
// })

server.listen(5000, ()=>{
    console.log("server is running on port http://localhost:5000");
})