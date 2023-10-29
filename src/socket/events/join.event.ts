import { Server } from "socket.io";
import { Socket } from "socket.io/dist/socket";

import { addUser, getUsersInRoom } from "../../utils/users";
import { setBoardTypeToEdit } from "../../utils/room";
import { getCardsInRoom } from "../../utils/cards";
import { SocketEvents, SocketNotificationEvents } from "../index";

export const joinEvent = (socket: Socket, io: Server, options: any, callback: Function): void => {
    // TODO: need to close join if boardType of room is !EDIT and name is not in a room ( user can reload page)
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

    socket.broadcast.to(user.room).emit(SocketNotificationEvents.USER_CONNECTED, { username: user.username });

    callback();
}
