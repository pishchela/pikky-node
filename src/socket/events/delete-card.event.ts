import { deleteCard, getCardsInRoom } from "../../utils/cards";
import { SocketEvents } from "../index";
import { Socket } from "socket.io/dist/socket";
import { Server } from "socket.io";

export const deleteCardEvent = (socket: Socket, io: Server, id: string, roomName: string, callback: any): void => {
    deleteCard(id);
    io.to(roomName).emit(SocketEvents.CARDS_DATA, {
        cards: getCardsInRoom(roomName),
    });
}
