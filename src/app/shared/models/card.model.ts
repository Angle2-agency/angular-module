import { Patient, Tag, Annotation, Metadata } from 'devfeteam-init';
import { CardTransition } from './card-transition.model';
import { CardPatient } from './card-patient.model';

export class Card {
    boardId: string;
    columnId: string;
    cardId: string;
    title: string;
    patient: CardPatient;
    tags: Tag[];
    created: string;
    modified: string;
    turn: string;
    providerId: string;
    userId: string;
    notes: Annotation[];
    metadata: Metadata[];
    collapsed: boolean;
    content: string;
    transitionedFrom: CardTransition;
}
