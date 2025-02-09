import { useState } from 'react';
import { Request } from '@/app/lib/definitionsBDS';


export const useScholarshipDataState = () => {

    const [scholarshipData, setscholarshipData] = useState<Request>({ academicYear: new Date().getFullYear(), physicalCondition: false, studentType: "", yearType: "", studentName: "", nrRange: 0, nrStudent: "" });
    const [studentNr, setStudentNr] = useState<string>(``);
    const [studentType, setStudentType] = useState<string>(``);
    const [nrRange, setNrRange] = useState<string>(``);
    const [iseeMin, setIseeMin] = useState<number>(0);
    const [iseeMax, setIseeMax] = useState<number>(0);
    const [physicalCondition, setPhysicalCondition] = useState<boolean>(false);
    const [result, setResult] = useState({ importoMensa: "", importoAlloggio: "", importoTotale: "" });

    return {
        scholarshipData, setscholarshipData,
        studentNr, setStudentNr, studentType, setStudentType,
        nrRange, setNrRange, iseeMin, setIseeMin, iseeMax, setIseeMax,
        physicalCondition, setPhysicalCondition,
        result, setResult
    }
}