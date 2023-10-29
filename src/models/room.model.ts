export enum BordType {
    EDIT= 'EDIT',
    GAME = 'GAME',
    SCORE = 'SCORE'
}

export interface Room {
    bordType: BordType;
}
