import { Injectable } from '@angular/core';
import { devfeteamRestService } from 'devfeteam-init';
import { ProviderListNamesRequest } from 'app/shared/models/requests/provider-list-names.request';
import { Observable } from 'rxjs';
import { ProviderListNamesResponse } from 'app/shared/models/responses/provider-list-names-response';
import { map } from 'rxjs/operators';

@Injectable()
export class ProviderApiService {

    constructor(private _restfulService: devfeteamRestService) {}

    listNames(request: ProviderListNamesRequest): Observable<ProviderListNamesResponse> {

        return this._restfulService.post('ListNames', request, 'provider-api').pipe(map(res => {

            let searchResponse  = new ProviderListNamesResponse();

            if (res.success) {
                searchResponse = res.value;
            }

            searchResponse.success = res.success;
            return searchResponse;
        }));

    }
}
