import React from 'react';
import {Routes, Route, redirect} from 'react-router-dom';
import {useState, useContext, createContext} from 'react';
import ShowArticle from './ArticleAction/ShowArticle.tsx';
import CreateArticle from './ArticleAction/CreateArticle.tsx';
import Login from './Login&SignUp/Login.tsx';
import SignUp from './Login&SignUp/SignUp.tsx';
import Navbar from './Navbar.tsx';
import Home from './Home.tsx';
import EditComment from './ArticleAction/EditComment.tsx';
import Profile from './Profile.tsx';
import EditArticle from './ArticleAction/EditArticle.tsx';
export type AuthoType = {
  AuthoState: boolean
  setState: React.Dispatch<React.SetStateAction<boolean>>
  email_id: number
  setEmailId: React.Dispatch<React.SetStateAction<number>>
}

export const AuthenContext = createContext<AuthoType>({AuthoState:true, setState:()=>{}, email_id:0, setEmailId:()=>{}});
// export const useAuthenContext = () => useContext(AuthenContext);

function Logout(){
  const {AuthoState, setState} = useContext(AuthenContext);
  function HandleLogout(){
    setState(false);
    console.log("autho state after logging out: ", AuthoState);
  }
  return (
    <div className='container'>
      <br></br>
      <h2 className='text-danger'>Do you really want to log out?</h2> <br />
      <button className='bg-warning btn text-danger' onClick={HandleLogout}>Log out</button>
    </div>
  );
}

function App() {
  const [AuthoState, setState] = useState<boolean>(false);
  const [email_id, setEmailId] = useState<number>(0);
  console.log(AuthoState);
  return AuthoState 
  ?(<AuthenContext.Provider value={{AuthoState, setState, email_id, setEmailId}}>
    <div className='container-lg bg-light text-center align-items-center'>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/create' element={<CreateArticle /> } />
        <Route path='/show/:userID' element={<ShowArticle />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/edit_article/:articleID' element={<EditArticle />}/>
        <Route path='/edit_comment/:commentID' element={<EditComment />}/>
      </Routes>
      
    </div>
    </AuthenContext.Provider>)
  :(<AuthenContext.Provider value={{AuthoState, setState, email_id, setEmailId}}>
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  </AuthenContext.Provider> 
  );
}

export default App;
