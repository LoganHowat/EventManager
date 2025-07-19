import { useEffect, useState, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { createContext } from 'react';
export const TokenContext = createContext<string | null>(null);

function TokenProvider({ children }: { children: ReactNode }) {
  const { getIdTokenClaims } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const claims = await getIdTokenClaims();
      setToken(claims?.__raw || null);
    };
    fetchToken();
  }, [getIdTokenClaims]);

  return (
    <TokenContext.Provider value={token}>
      {children}
    </TokenContext.Provider>
  );

}

export default TokenProvider