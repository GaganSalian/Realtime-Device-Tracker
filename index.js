const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    console.log("User connected:", socket.id);

    
    socket.on("send-location", function (data) {
        io.emit("recive-location", {
            id: socket.id,
            ...data,
        });
    });

    
    socket.on("disconnect", function () {
        console.log("User disconnected:", socket.id);
        io.emit("user-disconnected", socket.id);
    });
});

app.get("/", function (req, res) {
    res.render("index");
});

server.listen(8000, () => {
    console.log("Server started on http://localhost:8000");
});
