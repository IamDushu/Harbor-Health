import { useRouter, useSegments } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
import { getUser } from "@/services/userService";

const AuthContext = createContext<any>(null);

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  streamToken: string;
};

export function AuthProvider({ children }: PropsWithChildren) {
  const rootSegment = useSegments()[0];
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync("access_token");
      const refreshToken = await SecureStore.getItemAsync("refresh_token");
      const streamToken = await SecureStore.getItemAsync("stream_token");
      const email = await SecureStore.getItemAsync("email");

      if (accessToken && email) {
        const response = await getUser();
        if (response.is_onboarded) {
          setUser({
            id: response.user_id,
            email: response.email,
            firstName: response.first_name,
            lastName: response.last_name,
            streamToken: streamToken!,
          });
        }
      }
    } catch (error) {
      console.error("Error loading user from SecureStore", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!user && rootSegment !== "(auth)") {
      router.replace("/(auth)/onboard");
    } else if (user && rootSegment !== "(app)") {
      router.replace("/home");
    }
  }, [user, rootSegment, loading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
