import { editCard, getCardsInRoom } from "../../utils/cards";
import { SocketEvents } from "../index";
import { Socket } from "socket.io/dist/socket";
import { Server } from "socket.io";
import { Card } from "../../models/card.model";

export const editCardEvent = (socket: Socket, io: Server, card: Card, roomName: string, callback: any): void => {
    editCard(card, roomName);
    io.to(roomName).emit(SocketEvents.CARDS_DATA, {
        cards: getCardsInRoom(roomName),
    });
}
