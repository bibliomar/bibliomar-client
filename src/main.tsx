import React from "react";
import ReactDOM from "react-dom/client";
import Bibliomar from "./Bibliomar";
import { registerSW } from "virtual:pwa-register";

// Equivalent to 1h in milliseconds
const timeout = 60 * 60 * 1000;
const updateSW = registerSW({
    onRegistered(r) {
        if (r) {
            window.setInterval(() => {
                try {
                    r.update().then();
                } catch (e) {
                    console.error(e);
                }
            }, timeout);
        }
    },
});
ReactDOM.createRoot(document.getElementById("root")!).render(<Bibliomar />);
