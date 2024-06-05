import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import GlobalStyles from "../src/components/GlobalStyles"
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from "react-redux";
import store from "./app/store.jsx";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <GlobalStyles>
                    <Router>
                        <App />
                    </Router>
                </GlobalStyles>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </AuthContextProvider>
)
