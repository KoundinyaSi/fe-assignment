// src/app/client-provider.js
'use client';

import { MyProvider } from '../context/MyContext';

export default function ClientProvider({ children }) {
    return <MyProvider>{children}</MyProvider>;
}
