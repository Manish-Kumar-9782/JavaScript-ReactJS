import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Area, Line,
  Bar, Pie, Financial, ColorMapping, ColorPicker, Editor
} from "./pages";
import "./App.css";
const App = () => {
  const activeMenu = true; // a variable to show the active menu state.

  return (
    <BrowserRouter>
      {/* here we are making a flex relative container so we can make some 
    components with fixed position. */}
      <div className="flex relative dark:bg-main-dark-bg">
        {/* a fixed Container To contain the component of theme settings button*/}
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Setting" position="Top">
            <button
              type="button"
              className="text-white text-3xl p-3 
                hover:drop-shadow-xl hover:bg-light-gray"
              style={{ background: "blue", borderRadius: "50%" }}
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>

        {/* A Fixed container for a side bar */}
        {activeMenu ? (
          <div className="fixed w-72 dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 fixed dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}

        {/* Now we will make a activeMenu block */}
        <div
          className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? "md:ml-72" : "flex-2"
            }`}
        >
          <div
            className="fixed md:static bg-main-bg dark:bg-main-bg
            navbar w-full"
          >
            <Navbar />
          </div>
        </div>

        {/* Router container */}
        <div>
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Ecommerce />} />
            <Route path="/ecommerce" element={<Ecommerce />} />

            {/* Pages  */}
            <Route path="/orders" element={<Orders />} />
            <Route path="/employee" element={<Employees />} />
            <Route path="/customers" element={<Customers />} />

            {/* Apps */}
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/calender" element={<Calendar />} />
            <Route path="/color-picker" element={<ColorPicker />} />

            {/* Charts */}
            <Route path="/line" element={<Line />} />
            <Route path="/area" element={<Area />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/color-mapping" element={<ColorMapping />} />
            <Route path="/pyramid" element={<Pyramid />} />
            <Route path="/stacked" element={<Stacked />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
