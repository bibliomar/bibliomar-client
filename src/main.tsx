import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Bibliomar from "./Bibliomar";
import { registerSW } from "virtual:pwa-register";
import "./i18n";

// Equivalent to 1h in milliseconds
const timeout = 60 * 60 * 1000;
registerSW({
    onRegisteredSW(str, r) {
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
    immediate: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Bibliomar />
    </StrictMode>
);
