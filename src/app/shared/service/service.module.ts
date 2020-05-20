import { NgModule } from '@angular/core';
import { ProviderApiService } from './api/provider-api.service';
import { BoardsApiService } from './api/boards-api.service';
import { UserDirectoryApiService } from './api/user-directory-api.service';
import { DemographicsApiService } from './api/demographics-api.service';
import { DateFormatService } from './date-format/date-format.service';
import { FacilityApiService } from './api/facility-api.service';

@NgModule({
    imports: [],
    exports: [],
    providers: [ProviderApiService, BoardsApiService, UserDirectoryApiService, 
        DemographicsApiService, DateFormatService, FacilityApiService],
})
export class ServiceModule {}
