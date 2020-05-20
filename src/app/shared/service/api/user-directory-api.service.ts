import { Injectable } from '@angular/core';
import { devfeteamRestService } from 'devfeteam-init';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListNamesUserDirectoryRequest } from 'app/shared/models/requests/list-names-userdirectory.request';
import { UserDirectoryListNamesResponse } from 'app/shared/models/responses/user-directory-list-names.response';

@Injectable()
export class UserDirectoryApiService {

    constructor(private _restfulService: devfeteamRestService) {}

    listNames(request: ListNamesUserDirectoryRequest): Observable<UserDirectoryListNamesResponse> {

        return this._restfulService.post('ListNames', request, 'userdirectory-api').pipe(map(res => {
            
            let searchResponse = new UserDirectoryListNamesResponse();

            if (res.success) {
                searchResponse = res.value;
            }

            searchResponse.success = res.success;
            return searchResponse;
        }));
    }
}
