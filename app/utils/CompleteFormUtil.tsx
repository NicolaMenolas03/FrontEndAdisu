import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStudentDataState, useStudentEconomicState, useStudentPlaceState, useStudentExamState, useStudentSchoolState } from '@/context/RequestContext';

const { formDatiAnagrafici, setformDatiAnagrafici } = useStudentDataState();
const { formDatiEconomici, setformDatiEconomici } = useStudentEconomicState();
const { formDatiEsame, setFormDatiEsame } = useStudentExamState();
const { formDatiResidenza, setformDatiResidenza } = useStudentPlaceState();
const { formDatiScolastici, setformDatiScolastici } = useStudentSchoolState();


export const createRequest = async () => {
    let datiAnagrafici = await AsyncStorage.getItem('formDatiAnagrafici');
    let datiEconomici = await AsyncStorage.getItem('formDatiEconomici');
    let datiEsami = await AsyncStorage.getItem('formDatiEsame');
    let datiResidenza = await AsyncStorage.getItem('formDatiResidenza');
    let datiScolastici = await AsyncStorage.getItem('formDatiScolastici');

    if (datiAnagrafici !== null && datiEconomici !== null && datiEsami !== null && datiResidenza !== null && datiScolastici !== null) {
        setformDatiAnagrafici(JSON.parse(datiAnagrafici));
        setformDatiEconomici(JSON.parse(datiEconomici));
        setFormDatiEsame(JSON.parse(datiEsami));
        setformDatiResidenza(JSON.parse(datiResidenza));
        setformDatiScolastici(JSON.parse(datiScolastici));

        //Prendere isee range e scrivere get per prenderlo in base quello inserito dall'utente
        //

    }
};