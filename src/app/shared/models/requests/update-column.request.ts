import { Column } from "../column.model";

export class UpdateColumnRequest {
    boardId: string;
    column: Column;
}