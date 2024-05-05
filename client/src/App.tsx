import { useEffect, useState } from "react";
import { useDojo } from "./dojo/useDojo";
import AppRoutes from "./routing/Route";

function App() {
    const {
        setup: {
            systemCalls: { spawn, move },
            clientComponents: { Position, Moves },
        },
        account,
    } = useDojo();

    return (
        <>
            hellos
        </>
    );
}

export default App;
