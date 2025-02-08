import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useStudentDataState, useStudentEconomicState, useStudentPlaceState, useStudentExamState, useStudentSchoolState } from '@/context/RequestContext';
import { apiService } from "@/services/api";
import { Request } from "@/app/lib/definitionsBDS";

const { formDatiAnagrafici, setformDatiAnagrafici } = useStudentDataState();
const { formDatiEconomici, setformDatiEconomici } = useStudentEconomicState();
const { formDatiEsame, setFormDatiEsame } = useStudentExamState();
const { formDatiResidenza, setformDatiResidenza } = useStudentPlaceState();
const { formDatiScolastici, setformDatiScolastici } = useStudentSchoolState();
const [itemValue, setItemValue] = useState<Request>({ academicYear: new Date().getFullYear(), physicalCondition: false, studentType: "", yearType: "", studentName: "", nrRange: 0 });

export async function createRequest() {
    const [datiAnagrafici, datiEconomici, datiEsami, datiResidenza, datiScolastici, username] =
        await Promise.all([AsyncStorage.getItem('formDatiAnagrafici'), AsyncStorage.getItem('formDatiEconomici'), AsyncStorage.getItem('formDatiEsame'), AsyncStorage.getItem('formDatiResidenza'), AsyncStorage.getItem('formDatiScolastici'), AsyncStorage.getItem('username')]);

    const anagrafici = JSON.parse(datiAnagrafici || "{}");
    const economici = JSON.parse(datiEconomici || "{}");
    const esami = JSON.parse(datiEsami || "{}");
    const residenza = JSON.parse(datiResidenza || "{}");
    const scolastici = JSON.parse(datiScolastici || "{}");

    let response = await apiService.get(
        `/iseerange/get-isee-range/?academicYear=${itemValue.academicYear}`
    );
    const { data } = response;
    if (response.status == 200) {
        let iseeRange = data.find(
            (range: { iseeMin: number; iseeMax: number; }) =>
                economici.isee >= range.iseeMin && economici.isee <= range.iseeMax
        );

        setItemValue(prevState => {
            const newItemValue = {
                ...prevState,
                academicYear: prevState.academicYear,
                studentType: scolastici.statoStudente,
                studentName: username || "",
                yearType: scolastici.annoIscrizioneStudente,
                physicalCondition: anagrafici.disabilita,
                nrRange: iseeRange?.nrRange ?? "",
                nrStudent: scolastici.matricola
            };

            apiService.post('/request/post-request-by-user/', newItemValue)
                .then(response => {
                    if (response.status === 201) {
                        console.log('Richiesta creata con successo');
                    }
                })
                .catch(error => {
                    console.error('Errore nella creazione della richiesta', error);
                });

            return newItemValue;
        });
    }
};