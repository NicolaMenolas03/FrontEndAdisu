export type RootStackParamList = { 
    Home: undefined;
    Page1: undefined;
    Page2: undefined;
    DatiBorsaDiStudio: undefined;
};
     
export type SimulationResults = { 
    importoMensa: string; 
    importoAlloggio: string; 
    importoTotale: string; 
};

export type IseeData = { 
    id: number; 
    nrRange: number; 
    iseeMin: string; 
    iseeMax: string; 
    academicYear: string; 
};

export type AcademicYear = { 
    id: number; 
    academicYear: string; 
};