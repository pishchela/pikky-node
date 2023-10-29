// TODO: later add it into mongoDb;

import { User } from "../models/user.model";
import { NumberUtils } from "./number.utils";

interface UsersMap {
    [key: string]: User[];
}

const usersMap: UsersMap = {};

export const addUser = (obj: { id: any, username: string, room: string }) => {


    if (!obj.username || !obj.room) {
        return {
            error: 'Username and room are required!',
        }
    }
    const existingUser = usersMap[obj.room]?.find((user) => {
        return user.username === obj.username;
    });


    if (existingUser) {
        return {
            error: 'Username is in use!',
        };
    }


    const user = {
        id: obj.id,
        username: obj.username,
        room: obj.room,
        avatarId: NumberUtils.randomInteger(1, 3),
        isReady: false,
    };
    if (!usersMap[obj.room]) {
        usersMap[obj.room] = [];
    }
    usersMap[obj.room].push(user);
    return { user };
}

export const removeUser = (id: any) => {
    for (let room in usersMap) {
        const index = usersMap[room].findIndex((user) => user.id === id);
        if (index !== -1) {
            const returnUser = usersMap[room].at(index);
            usersMap[room].splice(index, 1);
            return returnUser;
        }
    }
}


export const getUsersInRoom = (roomName: string) => {
    return usersMap[roomName];
};

export const getUsersById = (roomName: string, id: string) => {
    return usersMap[roomName].find((user) => user.id === id);
};

export const setUserReady = (id: string, room: string) => {
    const user: User = usersMap[room]?.find((user) => user.id === id);
    if (user) {
        user.isReady = true;
    }
}

export const isAllRoomUsersAreReady = (room: string) => {
    return usersMap[room]?.findIndex((user) => !user.isReady) === -1;
}
