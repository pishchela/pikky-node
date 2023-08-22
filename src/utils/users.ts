// TODO: later add it into mongoDb;

import { User } from "../models/user.model";
import { NumberUtils } from "./number.utils";

const usersRecord: Record<string, User[]> = {};

export const addUser = (obj: { id: any, username: string, room: string }) => {
    // Clean the data
    obj.username = obj.username.trim().toLowerCase();
    obj.room = obj.room.trim().toLowerCase();

    // Validate the data
    if (!obj.username || !obj.room) {
        return {
            error: 'Username and room are required!',
        }
    }
    const existingUser = usersRecord[obj.room]?.find((user) => {
        return user.username === obj.username;
    });

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!',
        };
    }

    // Store user
    const user = { id: obj.id, username: obj.username, room: obj.room, avatarId: NumberUtils.randomInteger(1, 3) };
    if (!usersRecord[obj.room]) {
        usersRecord[obj.room] = [];
    }
    usersRecord[obj.room].push(user);
    return { user };
}

export const removeUser = (id: any) => {
    for (let room in usersRecord) {
        const index = usersRecord[room].findIndex((user) => user.id === id);
        if (index !== -1) {
            const returnUser = usersRecord[room].at(index);
            usersRecord[room].splice(index, 1);
            return returnUser;
        }
    }
}


export const getUsersInRoom = (roomName: string) => {
    return usersRecord[roomName];
};
