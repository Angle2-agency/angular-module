import { Column } from "../column.model";

export class AddColumnRequest {
    boardId: string;
    column: Column;
}