import { devfeteamBaseResponse } from 'devfeteam-init';
import { Provider } from '../provider.model';


export class ProviderListNamesResponse extends devfeteamBaseResponse {
    providers: Provider[];
}
