import { HiddenStatus } from '../enums/hidden-status.model';
import { DeletedStatus } from 'devfeteam-init';

export class ListColumnsRequest {
    boardId: string;
    filters: ListColumnsFilters;
}

export class ListColumnsFilters {
    deletedStatus: DeletedStatus;
    hiddenStatus: HiddenStatus;
}

