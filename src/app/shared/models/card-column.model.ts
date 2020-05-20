import { Column } from './column.model';
import { SearchCard } from './search-card.model';

export class CardColumn {
    column: Column;
    cards: SearchCard[];
}
