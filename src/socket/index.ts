import { Server } from "socket.io";

import {
    addUser,
    getUsersInRoom,
    isAllRoomUsersAreReady,
    removeUser,
    setUserReady,
} from "../utils/users";
import {
    deleteCard,
    editCard,
    getCardsInRoom,
} from "../utils/cards";
import { setBoardTypeToEdit, setBoardTypeToGame } from "../utils/room";

const io = new Server(8080);

export enum SocketEvents {
    CONNECTION = 'connection',
    JOIN = 'join',
    DISCONNECT = 'disconnect',
    USER_DATA = 'userData',
    CARDS_DATA = 'cardsData',
    EDIT_CARD = 'editCard',
    DELETE_CARD = 'deleteCard',
    USER_READY = 'userReady',
    SET_BORD_TYPE_EDIT = 'setBordTypeEdit',
    SET_BORD_TYPE_GAME = 'setBordTypeGame',
    SET_BORD_TYPE_SCORE = 'setBordTypeScore',
}

io.on(SocketEvents.CONNECTION, (socket) => {

    // TODO: need to close join if boardType of room is !EDIT

    socket.on(SocketEvents.JOIN, (options: any, callback: any) => {
        const { error, user } = addUser({id: socket.id, ...options});
        if (error) {
            return callback(error);
        }
        if (getUsersInRoom(user.room).length === 1) {
            io.to(user.room).emit(SocketEvents.SET_BORD_TYPE_EDIT);
            setBoardTypeToEdit(user.room);
        }
        socket.join(user.room);

        io.to(user.room).emit(SocketEvents.USER_DATA, {
            users: getUsersInRoom(user.room),
        });

        io.to(user.room).emit(SocketEvents.CARDS_DATA, {
            cards: getCardsInRoom(user.room),
        });

        callback();
    });

    socket.on(SocketEvents.EDIT_CARD, ({ card, room }: any, callback: any) => {
        editCard(card, room);
        io.to(room).emit(SocketEvents.CARDS_DATA, {
            cards: getCardsInRoom(room),
        });
    });

    socket.on(SocketEvents.DELETE_CARD, ({id, room}: any, callback: any) => {
        deleteCard(id);
        io.to(room).emit(SocketEvents.CARDS_DATA, {
            cards: getCardsInRoom(room),
        });
    });

    socket.on(SocketEvents.USER_READY, ({ room }: any, callback: any) => {
        setUserReady(socket.id, room);
        if (isAllRoomUsersAreReady(room)) {
            //
            setBoardTypeToGame(room);
            io.to(room).emit(SocketEvents.SET_BORD_TYPE_GAME);
        }
        io.to(room).emit(SocketEvents.USER_DATA, {
            users: getUsersInRoom(room),
        });
    });

    socket.on(SocketEvents.DISCONNECT, () => {
        const user = removeUser(socket.id);

        if (user) {
            const room = user.room;
            io.to(room).emit(SocketEvents.USER_DATA, {
                users: getUsersInRoom(room),
                room,
            });
            if (getUsersInRoom(room).length === 0) {
                //
                io.to(room).emit(SocketEvents.SET_BORD_TYPE_EDIT);
            } else if (isAllRoomUsersAreReady(room)) {
                //
                io.to(room).emit(SocketEvents.SET_BORD_TYPE_GAME);
            }
        }
    });

});
