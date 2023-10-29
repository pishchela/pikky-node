import { getUsersInRoom, isAllRoomUsersAreReady, setUserReady } from "../../utils/users";
import { setBoardTypeToGame } from "../../utils/room";
import { SocketEvents } from "../index";
import { Socket } from "socket.io/dist/socket";
import { Server } from "socket.io";

export const userReadyEvent = (socket: Socket, io: Server, roomName: string): void => {
    setUserReady(socket.id, roomName);
    if (isAllRoomUsersAreReady(roomName)) {
        setBoardTypeToGame(roomName);
        io.to(roomName).emit(SocketEvents.SET_BORD_TYPE_GAME);
    }
    io.to(roomName).emit(SocketEvents.USER_DATA, {
        users: getUsersInRoom(roomName),
    });
}
