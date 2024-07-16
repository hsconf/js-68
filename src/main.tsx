import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {PrimeReactProvider} from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css';
import {Provider} from "react-redux";
import {store} from "./Tools/store";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <PrimeReactProvider>
              <Provider store={store}>
                  <App />
              </Provider>
          </PrimeReactProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
