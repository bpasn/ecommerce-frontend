'use client';

import { persistor, store, wrapper } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const ReduxStoreProvider = ({
    children
}: { children: React.ReactNode; }) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                {children}
            </PersistGate>
        </Provider>
    );
};

export default ReduxStoreProvider;