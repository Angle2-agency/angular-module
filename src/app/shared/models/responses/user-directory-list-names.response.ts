import { devfeteamBaseResponse } from 'devfeteam-init';
import { User } from '../user.model';

export class UserDirectoryListNamesResponse extends devfeteamBaseResponse {
    user: User[];
}
