import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import { Detail, Main, Root } from "@pages";
import Helmet from "@components/commons/Helmet";
import { GlobalStyle, theme } from "@styles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 60 * 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "detail",
        children: [
          {
            path: "",
            element: <Navigate to="/" />,
          },
          {
            path: ":pokemonId",
            element: <Detail />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Helmet />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);
