import { RouterProvider } from "react-router";
import { appRouter } from "../router/app.router";

export const LTJHubApp = () => {
  return <RouterProvider router={appRouter} />;
};
