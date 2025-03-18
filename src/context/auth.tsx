import { useRouter, useSegments } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<any>(null);

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export function AuthProvider({ children }: PropsWithChildren) {
  const rootSegment = useSegments()[0];
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    // if (user === undefined) return;

    if (!user && rootSegment !== "(auth)") {
      router.replace("/(auth)/onboard");
    } else if (user && rootSegment !== "(app)") {
      router.replace("/home");
    }
  }, [user, rootSegment]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
