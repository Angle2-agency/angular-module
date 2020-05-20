import { Tag, Annotation, Metadata } from 'devfeteam-init';
import { Patient } from '../patient.model';

export class CreateCardRequest {

    boardId: string;
    columnId: string;
    title: string;
    patient: Patient;
    tags: Tag[];
    turn?: string;
    providerId?: string;
    userId: string;
    notes?: Annotation[];
    metadata?: Metadata[];
    collapsed: boolean;
    content?: string;
}
