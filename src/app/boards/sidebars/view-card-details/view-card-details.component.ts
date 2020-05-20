import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModuleService, PhoneHelperService, PatientModuleService, Patient } from 'devfeteam-init';
import { ProviderListNamesRequest } from 'app/shared/models/requests/provider-list-names.request';
import { ProviderApiService } from 'app/shared/service/api/provider-api.service';
import { ReadCardRequest } from 'app/shared/models/requests/read-card.request';
import { BoardsApiService } from 'app/shared/service/api/boards-api.service';
import { Card } from 'app/shared/models/card.model';
import { ListNamesUserDirectoryRequest } from 'app/shared/models/requests/list-names-userdirectory.request';
import { UserDirectoryFilters } from 'app/shared/models/user-directory-filters';
import { UserDirectoryApiService } from 'app/shared/service/api/user-directory-api.service';
import { ReadPatientRequest } from 'app/shared/models/requests/read-patient.request';
import { DemographicsApiService } from 'app/shared/service/api/demographics-api.service';
import { DateFormatService } from 'app/shared/service/date-format/date-format.service';

@Component({
    selector: 'view-card-details',
    templateUrl: './view-card-details.component.html',
    styleUrls: ['./view-card-details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ViewCardDetailsComponent implements OnInit {

    card: Card;
    columnName: string;
    providerName: string;
    cardId: string;
    boardId: string;

    phone: string;
    assignee: string;
    tags: string;
    requestProperties: any;
    readingPatient: boolean;

    constructor(private _moduleService: ModuleService,
        private _providerApiService: ProviderApiService,
        private _boardsApiService: BoardsApiService,
        private _phoneHelperService: PhoneHelperService,
        private _userDirectoryApiService: UserDirectoryApiService,
        private _patientModuleService: PatientModuleService,
        private _demographicsService: DemographicsApiService,
        private _dateFormatService: DateFormatService) {
    }
           

    ngOnInit(): void { 
        this.cardId = this._moduleService.moduleConfiguration.moduleData.cardId;
        this.boardId = this._moduleService.moduleConfiguration.moduleData.boardId;
        this.columnName = this._moduleService.moduleConfiguration.moduleData.columnName;
        this.buildNoteProperties();
        this.readCard();
    }

    buildNoteProperties(): void {
        this.requestProperties = {
            cardId: this.cardId,
            boardId: this.boardId
        };
    }

    readCard(): void {

        let request: ReadCardRequest = {
            boardId: this.boardId,
            cardId: this.cardId
        };

        this._boardsApiService.read(request).subscribe(result => {

            if (result.success) {
                this.card = result.card;
                this.getPhone();
                this.getProviders();
                this.getUser();
                this.getTags();
            }

        });
    }

    getPhone(): void {

        if (this.card.patient && (this.card.patient.telecom && this.card.patient.telecom.length > 0))  {

            this.phone = '';

            for (let index = 0; index < this.card.patient.telecom.length; index++) {

                const telecom = this.card.patient.telecom[index];

                if (telecom.system === 'phone') {
                    
                    let phone = this._phoneHelperService.getPhoneForDisplay(telecom.value, true);
                    this.phone += `${phone}, `;
                }
                
            }

            // Remove extra space and comma from the last phone
            this.phone = this.phone.substring(0, this.phone.length - 2);
        }
    }

    getProviders(): void {

        if (this.card.providerId) {
            let providerIdsArray: string[] = [];
            providerIdsArray.push(this.card.providerId);

            let request: ProviderListNamesRequest = {
                providerIds: providerIdsArray
            };

            this._providerApiService.listNames(request).subscribe(result => {

                if (result && result.success) {

                    if (result.providers.length > 0) {
                        this.providerName = result.providers[0].name;
                    }   
                }
            });
        }
    }

    getUser(): void {

        if (this.card.userId) {

            let userIdsArray: string[] = [];
            userIdsArray.push(this.card.userId);

            let filters: UserDirectoryFilters = {
                userIds: userIdsArray
            };

            let request: ListNamesUserDirectoryRequest = {
                filters: filters
            };

            this._userDirectoryApiService.listNames(request).subscribe(result => {
                
                if (result && result.success) {

                    if (result.user && result.user.length > 0) {
                        this.assignee = result.user[0].displayName;
                    }
                }
            });
        }
    }

    getTags(): void {

        if (this.card.tags && this.card.tags.length > 0) {

            this.tags = '';

            this.card.tags.forEach(tag => {
                this.tags += `${tag.text}, `;
            });

            // Remove extra space and comma
            this.tags = this.tags.substring(0, this.tags.length - 2);
        }
    }

    openDemographicsHome(): void {

        let request: ReadPatientRequest = {
            id: this.card.patient.patientId
        };

        this.readingPatient = true;

        this._demographicsService.read(request).subscribe(result => {

            if (result && result.success) {

                let patient: Patient = {
                    usualName: result.patient.name[0].text,
                    genderCode: result.patient.gender,
                    patientId: result.patient.id,
                    birthDate: result.patient.birthdate,
                    episode: undefined,
                    encounter: undefined,
                    recordNumber: result.patient.identifier[0].value
                };

                this._patientModuleService.openPatient(patient);
            }

            this.readingPatient = false;
        });
    }

    getFormattedDate(date: string): string {
        return this._dateFormatService.getPrettyDateFormat(date);
    }
}
