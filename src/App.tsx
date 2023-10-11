// import React, { useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";

import { Box } from "@chakra-ui/react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainRoute from "./routes/MainRoute";
import ArticleRoute from "./routes/ArticleRoute";

import { articleLoader } from "./redux/slices/articlesSlice";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainRoute />,
    },
    {
      path: "/article/:id",
      element: <ArticleRoute />,
      loader: articleLoader,
    },
  ]);

  return (
    <div className="App">
      <Box maxW={960} m={"auto"}>
        <RouterProvider router={router} />
      </Box>
    </div>
  );
}

export default App;
