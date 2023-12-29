import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://lthkzpqbqxtsbvogxqyh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0aGt6cHFicXh0c2J2b2d4cXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2MTY4ODUsImV4cCI6MjAxOTE5Mjg4NX0.ZweGiteob641iTGOwWCUL9Zw7kLPCgzB222e0qEfMGg"
);

export interface User {
  email: string;
  // Add other user-related properties as needed
}

type SignIn = (email: string, password: string) => Promise<User | null>;

const signIn: SignIn = async (
  email: string,
  password: string
): Promise<User | null> => {
  return await supabase.auth
    .signInWithPassword({ email, password })
    .then((res) => {
      const email = res.data.user?.email;

      if (!email) return null;
      const user: User = { email };
      return user;
    });
};

type SignOut = () => Promise<void>;
const signOut: SignOut = async () => {
  await supabase.auth.signOut();
};

const handleEvent = (
  event: string,
  email: string | undefined,
  setUser: (user: User | null) => void
) => {
  if (event === "INITIAL_SESSION") {
    if (email) {
      setUser({ email });
    } else {
      setUser(null);
    }
  } else if (event === "SIGNED_IN") {
    if (email) {
      setUser({ email });
    }
  } else if (event === "SIGNED_OUT") {
    setUser(null);
  } else if (event === "PASSWORD_RECOVERY") {
    // handle password recovery event
  } else if (event === "TOKEN_REFRESHED") {
    // handle token refreshed event
  } else if (event === "USER_UPDATED") {
    // handle user updated event
  }
};

const subscribe = (setUser: (user: User | null) => void) => {
  supabase.auth.onAuthStateChange(async (event) => {
    supabase.auth
      .getSession()
      .then((res) => {
        const email = res.data.session?.user.email;
        handleEvent(event, email, setUser);
      })
      .catch((er) => console.error(er));
  });
};

export default { signIn, signOut, subscribe };
