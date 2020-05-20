import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe
    ],
    imports     : [],
    exports     : [
        KeysPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe
    ]
})
export class FusePipesModule
{
}
