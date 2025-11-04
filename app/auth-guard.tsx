"use client";

import { Button } from "./components/ui/Button";
import { useUserStore } from "./lib/store";

export default function AuthGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Placeholder for future authentication logic
  const { isAuthenticated, loading, loginAsAdmin, loginAsGuest } = useUserStore(
    (state) => state
  );

  if (!isAuthenticated && !loading) {
    // Future redirect to login page can be implemented here
    return (
      <div className="h-screen flex justify-center items-center bg-white text-gray-800">
        <div className="shadow p-4 flex items-center justify-center flex-col gap-4 rounded border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">PopPlan</h1>
          <p>You must be logged in to view this page.</p>
          <div className="flex gap-4">
            <Button onClick={() => loginAsAdmin()}>Login as Admin</Button>
            <Button
              onClick={() => {
                loginAsGuest();
              }}
            >
              Login as Guest
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
