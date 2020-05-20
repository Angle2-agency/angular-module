import { Tag } from "devfeteam-init";
import { Column } from "../column.model";

export class UpdateBoardRequest  {
    name: string;
    description?: string;
    facilityIds?: string[];
    imageIndex?: number;
    tags?: Tag[];
    columns: Column[];
    boardId?: string;
}