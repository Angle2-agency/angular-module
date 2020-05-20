import { FacilityListName } from "../facility-list-names.model";
import { devfeteamBaseResponse } from "devfeteam-init";

export class FacilityListNamesResponse extends devfeteamBaseResponse {
    facilities: FacilityListName[];
}
