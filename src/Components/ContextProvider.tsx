import { useUser } from '@clerk/clerk-react';
import { createContext, useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from './FireBaseSetup';
import { UserDbData, Products } from './types';
import { PaletteMode } from '@mui/material';

// Create a context

interface MyContextProps {
  // darkMode: boolean;
  // setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
  userDbData: UserDbData | null;
  setUserDbData: React.Dispatch<React.SetStateAction<UserDbData | null>>;
  Products: Products[] | [];
  setProducts: React.Dispatch<React.SetStateAction<Products[] | []>>;
  fetchProducts: () => Promise<void>;
  UniqueCatergories: string[]
  Theme: PaletteMode;
  setTheme: React.Dispatch<React.SetStateAction<PaletteMode>>;
  ToggleTheme: () => void
}

export const MyContext = createContext<MyContextProps | null>(null);
interface props {
  children: React.ReactNode
}


export default function MyContextProvider(props: props) {
  const getInitialProducts = (): Products[] => {
    const storedProducts = sessionStorage.getItem('productsData');
    return storedProducts ? JSON.parse(storedProducts) : [];
  };
  const [userDbData, setUserDbData] = useState<UserDbData | null>(null);
  const [UniqueCatergories, setUniqueCatergories] = useState<string[]>([]);
  const [Products, setProducts] = useState<Products[]>((getInitialProducts));
  const { isLoaded, isSignedIn, user } = useUser();
  const getInitialTheme = (): PaletteMode => {
    // Get the theme from local storage or default to 'light'
    const savedTheme = localStorage.getItem('BatteryStoreTheme');
    return (savedTheme as PaletteMode) || 'light';
  };
  const [Theme, setTheme] = useState<PaletteMode>(getInitialTheme);
  const ToggleTheme = () => {
    Theme == 'dark' ? setTheme('light') : setTheme('dark')
    if (Theme == 'dark') {
      setTheme('light')
      localStorage.setItem('BatteryStoreTheme', 'light')
    } else {
      setTheme('dark')
      localStorage.setItem('BatteryStoreTheme', 'dark')
    }
  }

  const fetchFirebaseUser = async (ClerkUser: any) => {

    try {
      const FireBaseUserDocRef = doc(db, 'Users', ClerkUser.id);
      const firebaseUserData = await getDoc(FireBaseUserDocRef);

      const UserData = firebaseUserData.data() as UserDbData | undefined;
      if (UserData) {
        setUserDbData({ ...UserData, id: firebaseUserData.id })
        sessionStorage.setItem('userSessionData', JSON.stringify(UserData))
        console.log(UserData);

        // const clerkUser: any = user
        // fetchProducts(clerkUser)
        return
      } else {

        await setDoc(FireBaseUserDocRef, {
          id: ClerkUser.id,
          userName: ClerkUser?.fullName,
          email: ClerkUser.primaryEmailAddress?.emailAddress,
          role: 'user'
        })
        const firebaseUserData = await getDoc(FireBaseUserDocRef);
        const UserData = firebaseUserData.data() as UserDbData | undefined;
        if (UserData) {
          setUserDbData(UserData)
          sessionStorage.setItem('userSessionData', JSON.stringify(UserData))
          console.log(UserData);

        }

      }
    } catch (error) {
      console.error("Error fetching Users data:", error);
    }

  };
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const categoriesSet = new Set<string>();
      const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        if (product.type) {
          categoriesSet.add(product.type);
        }
      });
      console.log(Array.from(categoriesSet));
      setUniqueCatergories(Array.from(categoriesSet))
      setProducts(itemsList as Products[])
      sessionStorage.setItem('productsData', JSON.stringify(itemsList))
      console.log({ Fetched: itemsList });
    } catch (error) {
      console.log(error);
    }



  }
  useEffect(() => {
    // const LocalTheme = localStorage.getItem('BatteryStoreTheme')
    // if (LocalTheme) {
    //   setTheme(LocalTheme as PaletteMode)
    // }
    if (isLoaded && isSignedIn && user) {
      console.log(user);

      const clerkUser: any = user
      const userSessionData = sessionStorage.getItem('userSessionData')
      if (!userSessionData) {
        fetchFirebaseUser(clerkUser)
      } else {
        console.log({ local: JSON.parse(userSessionData) });

        setUserDbData(JSON.parse(userSessionData))
      }
    }
    const localProductsData = sessionStorage.getItem('productsData')
    if (!localProductsData) {
      fetchProducts()
    } else {
      console.log({ local: JSON.parse(localProductsData) });
      setProducts(JSON.parse(localProductsData) as Products[])
    }
  }, [user])

  // const [darkMode, setDarkmode] = useState(true);
  const contextValue = {
    // darkMode,
    // setDarkmode,
    userDbData,
    setUserDbData,
    Products,
    setProducts,
    fetchProducts,
    Theme,
    UniqueCatergories,
    setTheme,
    ToggleTheme,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  )
}
