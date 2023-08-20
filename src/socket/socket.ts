import { Server } from "socket.io";

import {
    addUser,
    getUsersInRoom,
    removeUser,
} from "../utils/users";
import {
    deleteCard,
    editCard,
    getCardsInRoom,
} from "../utils/cards";

const io = new Server(8080);

io.on("connection", (socket) => {

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({id: socket.id, ...options});
        if (error) {
            return callback(error);
        }
        socket.join(user.room);

        io.to(user.room).emit('userData', {
            users: getUsersInRoom(user.room),
        });

        io.to(user.room).emit('cardsData', {
            cards: getCardsInRoom(user.room),
        });

        callback();
    });

    socket.on('editCard', ({ card, room }, callback) => {
        editCard(card, room);
        io.to(room).emit('cardsData', {
            cards: getCardsInRoom(room),
        });
    });

    socket.on('deleteCard', ({id, room}, callback) => {
        deleteCard(id);
        io.to(room).emit('cardsData', {
            cards: getCardsInRoom(room),
        });
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('userData', {
                users: getUsersInRoom(user.room),
                room: user.room,
            });
        }
    });

});
