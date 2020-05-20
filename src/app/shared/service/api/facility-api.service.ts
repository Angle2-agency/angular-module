import { Injectable } from "@angular/core";
import { devfeteamRestService } from "devfeteam-init";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { FacilityListNamesRequest } from "app/shared/models/requests/facility-list-names.request";
import { FacilityListNamesResponse } from "app/shared/models/responses/facility-list-names.response";

@Injectable()
export class FacilityApiService {

    constructor(private _restfulService: devfeteamRestService) {}

    listNames(request: FacilityListNamesRequest): Observable<FacilityListNamesResponse> {
        return this._restfulService.post('ListNames', request, 'facility-api').pipe(map(res => {
            
            let searchResponse = new FacilityListNamesResponse();

            if (res.success) {
                searchResponse = res.value;
            }

            searchResponse.success = res.success;

            return searchResponse;
        }));
    }
}