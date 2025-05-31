import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Import global styles
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import ShopContextProvider from './context/ShopContext.jsx'; // Import context provider for global state management
import { Provider } from 'react-redux';
import store from './redux/store.js';



    
    
 
// Render the React application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter enables routing in the application */}
    <BrowserRouter>
      {/* ShopContextProvider provides global state management for the shop context */}
      <ShopContextProvider>
        {/* Main application component */}
        <Provider store={store}>
        <App />
        </Provider>
        
      </ShopContextProvider>
    </BrowserRouter>
  </StrictMode>
);

