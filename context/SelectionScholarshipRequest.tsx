import { useState } from 'react';

export const useScholarshipRequestState = () => {

    const [hasMadeARequest, sethasMadeARequest] = useState<string | null>(null);

    return {
        hasMadeARequest, sethasMadeARequest
    }
}
