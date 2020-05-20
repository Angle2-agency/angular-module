import { devfeteamBaseResponse } from 'devfeteam-init';
import { Column } from '../column.model';

export class ListColumnsResponse extends devfeteamBaseResponse {
    columns: Column[];
}
