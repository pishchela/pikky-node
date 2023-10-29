import { Server } from "socket.io";

import { joinEvent } from "./events/join.event";
import { disconnectEvent } from "./events/disconnect.event";
import { userReadyEvent } from "./events/user-ready.event";
import { editCardEvent } from "./events/edit-card.event";
import { deleteCardEvent } from "./events/delete-card.event";

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

export enum SocketNotificationEvents {
    USER_CONNECTED = 'userConnected',
    USER_DISCONNECTED = 'userDisconnected',
    USER_SET_READY = 'userSetReady'
}

io.on(SocketEvents.CONNECTION, (socket) => {
    socket.on(SocketEvents.JOIN, (options: any, callback: any) => joinEvent(socket, io, options, callback));
    socket.on(SocketEvents.EDIT_CARD, ({ card, room }: any, callback: any) => editCardEvent(socket, io, card, room, callback));
    socket.on(SocketEvents.DELETE_CARD, ({id, room}: any, callback: any) => deleteCardEvent(socket, io, id, room, callback));
    socket.on(SocketEvents.USER_READY, ({ room }: any, callback: any) => userReadyEvent(socket, io, room));
    socket.on(SocketEvents.DISCONNECT, () => disconnectEvent(socket, io));
});
