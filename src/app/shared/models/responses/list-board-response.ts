import { devfeteamBaseResponse } from 'devfeteam-init';
import { ListBoard } from '../list-board.model';

export class ListBoardResponse extends devfeteamBaseResponse {
    boards: ListBoard[];    
}
