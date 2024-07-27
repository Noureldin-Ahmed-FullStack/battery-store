import { useUser } from '@clerk/clerk-react';
import { createContext, useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from './FireBaseSetup';
import { UserDbData, Products } from './types';

// Create a context
interface MyContextProps {
  // darkMode: boolean;
  // setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
  userDbData: UserDbData | null;
  setUserDbData: React.Dispatch<React.SetStateAction<UserDbData | null>>;
  Products: Products[] | [];
  setProducts: React.Dispatch<React.SetStateAction<Products[] | []>>;
  fetchProducts: (ClerkUser: any) => Promise<void>;
}

export const MyContext = createContext<Partial<MyContextProps>>({});
interface props {
  children: React.ReactNode
}


export default function MyContextProvider(props: props) {
  const [userDbData, setUserDbData] = useState<UserDbData | null>(null);
  const [Products, setProducts] = useState<Products[]>([]);
  const { isLoaded, isSignedIn, user } = useUser();
  const fetchFirebaseUser = async (ClerkUser: any) => {

    try {
      const FireBaseUserDocRef = doc(db, 'Users', ClerkUser.id);
      const firebaseUserData = await getDoc(FireBaseUserDocRef);

      const UserData = firebaseUserData.data() as UserDbData | undefined;
      if (UserData) {
        setUserDbData({...UserData,id:firebaseUserData.id})
        console.log(UserData);

        // const clerkUser: any = user
        // fetchProducts(clerkUser)
        return
      } else {

        await setDoc(FireBaseUserDocRef, {
          id: ClerkUser.id,
          userName: ClerkUser?.fullName,
          email: ClerkUser.primaryEmailAddress?.emailAddress
        })
        const firebaseUserData = await getDoc(FireBaseUserDocRef);
        const UserData = firebaseUserData.data() as UserDbData | undefined;
        if (UserData) {
          setUserDbData(UserData)
          console.log(UserData);
          
        }
      }
    } catch (error) {
      console.error("Error fetching Users data:", error);
    }

  };
  const fetchProducts = async (ClerkUser: any) => {
    try {
      const UserCollectionRef = collection(db, 'Products');
      const q = query(UserCollectionRef, where("user", "==", ClerkUser.id)); // Assuming userId property in Pets collection
      const data = await getDocs(q);

      
      const fetchedProducts: Products[] = [];
      data.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.data()) {
          const data = doc.data() as Products
          data.id = doc.id
          fetchedProducts.push(data)
        }
      });
      if (fetchedProducts) {
        setProducts(fetchedProducts)
      }

    } catch (error) {
      console.error(error)
    }

  }
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log(user);
      
      const clerkUser: any = user
      fetchFirebaseUser(clerkUser)
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
  };

  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  )
}
