import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import CenteredPage from './Components/CenteredPage.tsx';
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react';
import MyContextProvider from './Components/ContextProvider.tsx';
import HomePage from './Components/HomePage.tsx';
import Products from './Components/Products.tsx';
import ProductDetails from './Components/ProductDetails.tsx';
import NotFoundPage from './Components/NotFoundPage.tsx';
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/battery-store", element: <HomePage /> },
      { path: "/products", element:<CenteredPage><Products /></CenteredPage>},
      { path: "/products/:productId", element: <CenteredPage><ProductDetails /></CenteredPage> },
      { path: "/sign-in", element: <CenteredPage><SignUp routing='hash' forceRedirectUrl={'/battery-store'} /></CenteredPage> },
      { path: "/sign-up", element: <CenteredPage><SignIn routing='hash' forceRedirectUrl={'/battery-store'} /></CenteredPage> },
      { path: "*", element: <CenteredPage><NotFoundPage /></CenteredPage> },
    ]
  }
])

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <MyContextProvider>
          <RouterProvider router={router} />
        </MyContextProvider>
    </ClerkProvider>
  // </React.StrictMode>,
)