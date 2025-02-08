import { useState } from 'react';
import { Esame } from '@/app/lib/definitionsBDS';

export const useStudentDataState = () => {
    const [formDatiAnagrafici, setformDatiAnagrafici] = useState({ nome: '', cognome: '', sesso: '', etaNascita: '', cittadinanza: '', disabilita: false, });
    const [errors, setErrors] = useState({ nome: '', cognome: '', sesso: '', etaNascita: '', cittadinanza: '', });

    return {
        formDatiAnagrafici, setformDatiAnagrafici, errors, setErrors
    }
}

export const useStudentSchoolState = () => {
    const [formDatiScolastici, setformDatiScolastici] = useState({ matricola: '', ateneo: '', corso: '', dipartimento: '', durata: '', annoIscrizioneStudente: '1 anno', statoStudente: 'Full Time', });
    const [errors, setErrors] = useState({ matricola: '', ateneo: '', corso: '', dipartimento: '', durata: '', statoStudente: '', });

    return {
        formDatiScolastici, setformDatiScolastici, errors, setErrors
    }
}
export const useStudentPlaceState = () => {
    const [formDatiResidenza, setformDatiResidenza] = useState({ provincia: "", comune: "", indirizzo: "", cap: "", });
    const [errors, setErrors] = useState({ provincia: "", comune: "", indirizzo: "", cap: "", });

    return {
        formDatiResidenza, setformDatiResidenza, errors, setErrors
    }
}

export const useStudentExamState = () => {

    const [formDatiEsame, setFormDatiEsame] = useState({ matricola: '', corso: '', dipartimento: '', });
    const [esami, setEsami] = useState<Esame[]>([{ materia: '', cfu: '', data: '' }]);
    const [errori, setErrori] = useState<{ materia?: string; cfu?: string; data?: string }[]>([]);

    return {
        formDatiEsame, setFormDatiEsame, esami, setEsami, errori, setErrori
    }
}

export const useStudentEconomicState = () => {
    const [formDatiEconomici, setformDatiEconomici] = useState({ isee: 0, dataRilascio: "", autorizzoINPS: false, });
    const [errors, setErrors] = useState({ dataRilascio: "", });

    return {
        formDatiEconomici, setformDatiEconomici, errors, setErrors
    }
}