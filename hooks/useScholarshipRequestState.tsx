import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useScholarshipRequestState = () => {
  const [hasMadeARequest, sethasMadeARequest] = useState<string | null>(null);

  return {
    hasMadeARequest,
    sethasMadeARequest,
  };
};

export async function deleteAllData() {
  await AsyncStorage.removeItem("formDatiAnagrafici");
  await AsyncStorage.removeItem("formDatiEconomici");
  await AsyncStorage.removeItem("formDatiEsame");
  await AsyncStorage.removeItem("formDatiResidenza");
  await AsyncStorage.removeItem("formDatiScolastici");
}
