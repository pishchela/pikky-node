import { Card } from "../models/card.model";

const cards: Card[] = [];

export const editCard = (card: Card, room: string) => {
    const newCard = {
        ...card,
        room,
    };
    const cardIndex = cards.findIndex((c) => c.id === card.id);
    if (cardIndex === -1) {
        cards.push(newCard);
    } else {
        cards[cardIndex] = newCard;
    }
}

export const deleteCard = (id: string) => {
    const cardIndex = cards.findIndex((c) => c.id === id);
    if (cardIndex === -1) {
        return;
    } else {
        cards.splice(cardIndex, 1);
    }
}


export const getCardsInRoom = (room: string) => {
    return cards.filter((card) => card.room === room);
}
