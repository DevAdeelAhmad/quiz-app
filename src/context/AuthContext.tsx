// "use client";
// import { auth } from "@/lib/firebase";
// import { GoogleAuthProvider, getRedirectResult, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
// import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";

// interface AuthContextProps { user: any; googleSignIn: () => void; signout: () => void; }
// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// interface AuthContextProviderProps {
//   children: ReactNode;
// }

// export const AuthContextProvider: FC<AuthContextProviderProps> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<any | null>(null);

//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithRedirect(auth, provider).catch((error) => {
//       console.error("Google Sign-In Error:", error);
//     });
//   };

//   const signout = () => {
//     signOut(auth);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     const handleRedirectResult = async () => {
//       try {
//         const result = await getRedirectResult(auth);
//         if (result?.user) {
//           setUser(result.user);
//         }
//       } catch (error) {
//         console.error("Redirect Result Error:", error);
//       }
//     };

//     handleRedirectResult();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, googleSignIn, signout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error(
//       "useUserAuth must be used within an AuthContextProvider"
//     );
//   }
//   return context;
// };
