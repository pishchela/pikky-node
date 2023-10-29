import { getUsersInRoom, isAllRoomUsersAreReady, removeUser } from "../../utils/users";
import { SocketEvents } from "../index";
import { Socket } from "socket.io/dist/socket";
import { Server } from "socket.io";

export const disconnectEvent = (socket: Socket, io: Server): void => {
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
}
