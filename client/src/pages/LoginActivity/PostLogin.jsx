import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export default function PostLogin() {
  const { user, isLoaded } = useUser();
  const [params] = useSearchParams();
  const hasRun = useRef(false);

  const role = params.get("role"); // citizen | government

  useEffect(() => {
    if (!isLoaded || !user || hasRun.current || !role) return;

    hasRun.current = true;

    const run = async () => {
      try {
        // 1️⃣ Update role
        await user.update({
          publicMetadata: { role },
        });

        // 2️⃣ FORCE reload user from Clerk
        await user.reload();

        // 3️⃣ Hard redirect
        window.location.replace("/");
      } catch (e) {
        console.error("ROLE UPDATE FAILED", e);
      }
    };

    run();
  }, [isLoaded, user, role]);

  return <p className="p-6">Setting role…</p>;
}
