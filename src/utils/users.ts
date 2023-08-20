// TODO: later add it into mongoDb;

import { User } from "../models/user.model";

const users: User[] = [];

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
    const existingUser = users.find((user) => {
        return user.room === obj.room && user.username === obj.username;
    });

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!',
        };
    }

    // Store user
    const user = { id: obj.id, username: obj.username, room: obj.room };
    users.push(user);
    return { user };
}

export const removeUser = (id: any) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        const returnUser = users[index];
        users.splice(index, 1);
        return returnUser;
    }
}

export const getUser = (id: any) => {
    return users.find((user) => user.id === id);
};

export const getUsersInRoom = (roomName: string) => {
    return users.filter((user) => user.room === roomName);
};

export const getUsersRoom = (id: string) => {
    return users.find((user) => user.id === id)?.room;
}
