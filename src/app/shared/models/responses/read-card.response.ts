import { devfeteamBaseResponse } from 'devfeteam-init';
import { Card } from '../card.model';

export class ReadCardResponse extends devfeteamBaseResponse {
    card: Card;
}
