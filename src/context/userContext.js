import { createContext } from "react";

// внутри функции createContext мы можем задать начальное значение
export const UserContext = createContext({ userId: 1 });
