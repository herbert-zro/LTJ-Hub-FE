import { Outlet } from "react-router";

export const AuthCandidatoLayout = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-3 md:p-6">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Outlet />
      </div>
    </div>
  );
};
