import { ColumnTransition } from './column-transition.model';

export class Column {
    columnId?: string;
    position: number;
    name: string;
    description: string;
    hidden: boolean;
    deleted?: boolean;
    transition?: ColumnTransition;
}
