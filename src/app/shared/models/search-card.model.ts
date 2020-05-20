import { Patient, Tag, Annotation, Metadata } from 'devfeteam-init';

export class SearchCard {
    boardId: string;
    columnId: string;
    cardId: string;
    title: string;
    patient: Patient;
    tags: Tag[];
    created: string;
    modified: string;
    turn: string;
    providerId: string;
    userId: string;
    notes: Annotation[];
    metadata: Metadata;
    collapsed: boolean;
    deleted: boolean;
}
