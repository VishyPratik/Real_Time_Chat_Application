import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { store } from './redux/Store.jsx'
import {Provider} from "react-redux"

export const serverUrl ="https://real-time-chat-application-backend-7ww2.onrender.com"
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    
  </BrowserRouter>
)
