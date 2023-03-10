import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import {
    BrowserRouter,
} from "react-router-dom";
import {persister, store} from "./redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate persistor={persister}>
                <App/>
            </PersistGate>
        </Provider>
    </BrowserRouter>
);
