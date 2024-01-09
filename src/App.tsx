import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {useState, useContext, createContext} from 'react';
import ShowArticle from './ArticleAction/ShowArticle.tsx';
import CreateArticle from './ArticleAction/CreateArticle.tsx';
import Login from './Login&SignUp/Login.tsx';
import SignUp from './Login&SignUp/SignUp.tsx';
import Navbar from './Navbar.tsx';
import Home from './Home.tsx';
export type AuthoType = {
  AuthoState: boolean
  setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthenContext = createContext<AuthoType>({AuthoState:true, setState:()=>{}});
// export const useAuthenContext = () => useContext(AuthenContext);

function Logout(){
  const {AuthoState, setState} = useContext(AuthenContext);
  function HandleLogout(){
    setState(false);
    console.log("autho state after logging out: ", AuthoState);
  }
  return (
    <div className='container'>
      <p className='text-warnig bg-light'>Do you really want to log out?</p> <br />
      <button onClick={HandleLogout}>Log out</button>
    </div>
  );
}

function App() {
  const [AuthoState, setState] = useState<boolean>(false);
  console.log(AuthoState);
  return AuthoState 
  ?(<AuthenContext.Provider value={{AuthoState, setState}}>
    <div className='container-lg bg-light text-center align-items-center'>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<CreateArticle />} />
        <Route path="/home" element={<Home />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/create' element={<CreateArticle /> } />
        <Route path='/show/:userID' element={<ShowArticle />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
      
    </div>
    </AuthenContext.Provider>)
  :(<AuthenContext.Provider value={{AuthoState, setState}}>
    <Navbar />
    <Login />
  </AuthenContext.Provider> 
  );
}

export default App;
