import { DeletedStatus } from 'devfeteam-init';

export class SearchCardRequest {
    term: string;
    top?: number;
    skip?: number;
    orderby?: string[];
    filters: SearchCardsFilters;
}

export class SearchCardsFilters {
    userIds?: string[];
    providerIds?: string[];
    columnIds: string[];
    boardIds: string[];
    deletedStatus: DeletedStatus;
}
