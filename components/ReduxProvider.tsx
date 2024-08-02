'use client';

import {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '@/store/store';

interface ReduxProviderProps {
    children: ReactNode;
}

export default function ReduxProvider({children}: ReduxProviderProps) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}