import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class DateFormatService {

    constructor(private _translateService: TranslateService) { }

    getPrettyDateFormat(date: string): string {
        let time = moment(date).locale(this._translateService.currentLang);
        let timeString = time.startOf('minutes').fromNow();

        if (timeString.includes(this._translateService.instant('SECOND')) || timeString.includes(this._translateService.instant('MINUTE'))) {

            return timeString;
        } else {
            return time.calendar();
        }
    }

}
