import { useState } from 'react';
import { Request } from '@/app/lib/definitionsBDS';

export const useScholarshipDataState = () => {

    const [scholarshipData, setscholarshipData] = useState<Request>({ academicYear: new Date().getFullYear(), physicalCondition: false, studentType: "", yearType: "", studentName: "", nrRange: 0, nrStudent: "" });
    const [studentNr, setStudentNr] = useState<string>(``);

    return {
        scholarshipData, setscholarshipData
    }
}