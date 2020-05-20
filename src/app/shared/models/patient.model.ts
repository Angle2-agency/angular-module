import { HumanName, ContactPoint, Coverage } from 'devfeteam-init';

export class Patient {
    patientId: string;
    name: HumanName;
    telecom: ContactPoint[];
    coverage: Coverage[];
}
