import {createContext} from 'react';

type ContextType = {
    isVerified: boolean,
    setIsVerified: (isVerified: boolean) => void
}

export const NavContext = createContext<ContextType>(null as any);