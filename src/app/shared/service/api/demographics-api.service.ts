import { Injectable } from '@angular/core';
import { devfeteamRestService } from 'devfeteam-init';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReadPatientRequest } from 'app/shared/models/requests/read-patient.request';
import { ReadPatientResponse } from 'app/shared/models/responses/read-patient-response';

@Injectable()
export class DemographicsApiService {

    constructor(private _restfulService: devfeteamRestService) {}

    read(request: ReadPatientRequest): Observable<ReadPatientResponse> {

        return this._restfulService.post('Read', request, 'demographics-api').pipe(map(res => {
            
            let searchResponse = new ReadPatientResponse();

            if (res.success) {
                searchResponse = res.value;
            }

            searchResponse.success = res.success;
            return searchResponse;
        }));
    }
}
