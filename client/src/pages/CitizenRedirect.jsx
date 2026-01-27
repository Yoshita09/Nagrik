import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";

export default function CitizenRedirect() {
  const { user, isLoaded } = useUser();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isLoaded || !user || hasRun.current) return;

    hasRun.current = true;

    const setRole = async () => {
      try {
        await user.update({
          publicMetadata: {
            role: "citizen",
          },
        });

        // HARD redirect
        window.location.replace("/");
      } catch (err) {
        console.error("ROLE SET ERROR:", err);
      }
    };

    setRole();
  }, [isLoaded, user]);

  return <p className="p-6">Setting role…</p>;
}
