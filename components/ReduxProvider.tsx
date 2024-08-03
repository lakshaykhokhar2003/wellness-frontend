'use client';

import {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '@/store/store';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


interface ReduxProviderProps {
    children: ReactNode;
}

const queryClient = new QueryClient();
export default function ReduxProvider({children}: ReduxProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    );
}
