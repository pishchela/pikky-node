import { BordType, Room } from "../models/room.model";

export const roomRecord: Record<string, Room> = {};

export const getRoomBoardType = (room: string) => {
    if (!roomRecord[room]?.bordType) {
        roomRecord[room].bordType = BordType.EDIT;
    } else {
        return roomRecord[room].bordType;
    }
}

export const setBoardTypeToGame = (room: string) => {
    setBoardType(room, BordType.GAME);
}

export const setBoardTypeToEdit = (room: string) => {
    setBoardType(room, BordType.EDIT);
}


const setBoardType = (room: string, boardType: BordType) => {
    if (!roomRecord[room]?.bordType) {
        roomRecord[room] = {
            ...roomRecord[room],
            bordType: boardType,
        };
    } else {
        roomRecord[room].bordType = boardType;
    }
}
