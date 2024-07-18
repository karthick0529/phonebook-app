import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Home from "./Home";
import Update from "./Update";
import "./App.css";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="container">
          <AppBar position="static" style={{ marginBottom: "20px" }}>
            <Toolbar>
              <Button color="inherit" component={NavLink} to="/">
                Home
              </Button>
              <Button color="inherit" component={NavLink} to="/update">
                Update
              </Button>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/update" element={<Update />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
