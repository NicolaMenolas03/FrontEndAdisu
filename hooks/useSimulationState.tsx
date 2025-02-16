import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type SimulationResults = any; // Sostituisci con il tipo corretto
type RootStackParamList = any; // Sostituisci con il tipo corretto

export const useSimulationState = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState<SimulationResults | null>(null);
    const [tipologiaStudente, setTipologiaStudente] = useState('');
    const [anniAccademici, setAnniAccademici] = useState<any[]>([]);
    const [selectedAnno, setSelectedAnno] = useState<string>('');
    const [isee, setIsee] = useState<string>('');
    const [isees, setIsees] = useState<any[]>([]);
    const [selectedRange, setSelectedRange] = useState<string>('');
    const [disabilita, setDisabilita] = useState(false);
    const [pastiAggiuntivi, setPastiAggiuntivi] = useState(false);
    const [corsoSTEM, setCorsoSTEM] = useState(false);

    return {
        navigation,
        showResults, setShowResults,
        results, setResults,
        tipologiaStudente, setTipologiaStudente,
        anniAccademici, setAnniAccademici,
        selectedAnno, setSelectedAnno,
        isee, setIsee,
        isees, setIsees,
        selectedRange, setSelectedRange,
        disabilita, setDisabilita,
        pastiAggiuntivi, setPastiAggiuntivi,
        corsoSTEM, setCorsoSTEM
    };
};
