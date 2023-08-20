import { User } from "./user.model";

export interface Card {
    id: string;
    key: string;
    description: string;
    owner: User;
    room?: string;
}
