import { useState } from 'react';
import { apiService } from "@/services/api";
import { Request } from "@/app/lib/definitionsBDS";
import AsyncStorage from '@react-native-async-storage/async-storage';


export function useScholarshipRequest() {
    const [itemValue, setItemValue] = useState<Request>({ academicYear: new Date().getFullYear(), physicalCondition: false, studentType: "", yearType: "", studentName: "", nrRange: 0, nrStudent: "" });

    async function createRequest() {
        try {
            const [datiAnagrafici, datiEconomici, datiEsami, datiResidenza, datiScolastici, username] =
                await Promise.all([
                    AsyncStorage.getItem('formDatiAnagrafici'),
                    AsyncStorage.getItem('formDatiEconomici'),
                    AsyncStorage.getItem('formDatiEsame'),
                    AsyncStorage.getItem('formDatiResidenza'),
                    AsyncStorage.getItem('formDatiScolastici'),
                    AsyncStorage.getItem('username')
                ]);

            const anagrafici = JSON.parse(datiAnagrafici || "{}");
            const economici = JSON.parse(datiEconomici || "{}");
            const esami = JSON.parse(datiEsami || "{}");
            const residenza = JSON.parse(datiResidenza || "{}");
            const scolastici = JSON.parse(datiScolastici || "{}");

            let response = await apiService.get(
                `/iseerange/get-isee-range/?academicYear=${itemValue.academicYear}`
            );

            const { data } = response;
            if (!response?.data || !Array.isArray(data) || data.length === 0) {
                console.error("Errore: Nessun dato ricevuto da API");
                return;
            }

            let iseeRange = data.find(
                (range) => (economici?.isee ?? 0) >= range.iseeMin && (economici?.isee ?? 0) <= range.iseeMax
            );

            setItemValue(prevState => {
                const newItemValue = {
                    ...prevState,
                    academicYear: prevState.academicYear,
                    studentType: scolastici?.statoStudente ?? "",
                    studentName: username || "",
                    yearType: scolastici?.annoIscrizioneStudente ?? "",
                    physicalCondition: anagrafici?.disabilita ?? false,
                    nrRange: iseeRange?.nrRange ?? "",
                    nrStudent: scolastici?.matricola ?? ""
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
        } catch (error) {
            console.error("Errore in createRequest:", error);
        }
    };
    return { createRequest };
}
