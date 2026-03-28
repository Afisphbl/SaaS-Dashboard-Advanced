import React, { createContext, useReducer, useEffect } from "react";
import { supabase } from "../api/supabaseClient";

const initialState = {
  session: null,
  user: null,
  loading: true,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        session: action.payload.session,
        user: action.payload.user,
        loading: false,
      };
    case "SET_SESSION":
      return {
        ...state,
        session: action.payload.session,
        user: action.payload.user,
      };
    case "SIGN_OUT":
      return { ...state, session: null, user: null };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export const AuthContext = createContext({
  ...initialState,
  dispatch: () => null,
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;
        if (mounted) {
          dispatch({
            type: "INITIALIZE",
            payload: { session, user: session?.user || null },
          });
        }
      } catch (error) {
        console.error("Error getting session", error);
        if (mounted) {
          dispatch({ type: "ERROR", payload: error.message });
        }
      }
    }

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_OUT") {
        dispatch({ type: "SIGN_OUT" });
      } else {
        dispatch({
          type: "SET_SESSION",
          payload: { session, user: session?.user || null },
        });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
