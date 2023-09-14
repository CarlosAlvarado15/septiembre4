import React, { useEffect, useState } from "react";

function useSession() {
  const [session, setSession] = useState([]);

  useEffect(() => {
    setSession(localStorage.getItem("data"));
  }, []);
  return {
    session,
    setSession,
  };
}

export { useSession };
