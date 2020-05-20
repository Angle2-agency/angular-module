import { Column } from './column.model';
import { ImageIndex } from './enums/image-index.model';
import { Tag } from 'devfeteam-init';

export class ListBoard {
    boardId: string;
    name: string;
    description: string;
    facilityIds: string[];
    imageIndex: ImageIndex;
    tags: Tag[];
    columns: Column[];
    deleted?: boolean;
}
