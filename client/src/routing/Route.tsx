import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ROUTES } from "../constants/routing/routePath";
import { Home } from "@/pages";
// import { ROUTES } from "../constants/routing/routePath";
// import { InGame, Login, Reward, Rooms, WaitingRoom } from "../pages";
// import { Game } from "../phaser";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        {/* <Route path={ROUTES.rooms} element={<Rooms />} /> */}
        {/* <Route path={ROUTES.waiting} element={<WaitingRoom />} />
        <Route path={ROUTES.readyRoom} element={<ReadyRoom />} />
        <Route path={ROUTES.inGame} element={<InGame />} />
        <Route path={ROUTES.reward} element={<Reward />} /> */}
        {/* <Route path={ROUTES.testGame} element={<Game />} /> */}
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
