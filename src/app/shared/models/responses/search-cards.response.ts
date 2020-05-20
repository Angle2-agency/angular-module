import { devfeteamBaseResponse } from 'devfeteam-init';
import { SearchCard } from '../search-card.model';

export class SearchCardsResponse extends devfeteamBaseResponse {
    cards: SearchCard[];
}
