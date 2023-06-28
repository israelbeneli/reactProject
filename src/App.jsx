
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { About } from './components/About';
import { LoginForm } from './components/Login';
import { NavBar } from './components/NavBar';
import { SignUp } from './components/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LogOut } from './components/LogOut';
import { MyCards } from './components/MyCard';
import { AddCardForm } from './components/AddCardForm';
import { useAuth } from './context/auth.context';
import CardsDelete from './components/cardsDelete';
import CardsEdit from './components/cardsEdit';
import Home from './components/Home';
import { CardView } from './components/cardView';
function App() {
  const {user} = useAuth();
return(  
    <div  className="container">
       <ToastContainer />
          <div className="app d-flex flex-column min-vh-100" >
            <NavBar></NavBar>
            <main className="flex-fill container">
              <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/About" element={<About></About>}></Route>
                <Route path="/My-cards" element={<MyCards></MyCards>}></Route>
                <Route path="/Sing-in" element={<LoginForm></LoginForm>}></Route>
                <Route path='/Sing-up' element={<SignUp></SignUp>}></Route>
                <Route path='/logout' element={<LogOut></LogOut>}></Route>
                <Route path='/AddCardForm' element={<AddCardForm></AddCardForm>}></Route>     
                <Route path="my-cards/delete/:id"element={<>
                    {user?.biz && 
                        <CardsDelete />
                    }            
                  </> }/>
                <Route path="my-cards/edit/:id" element={<>
                    {user?.biz && 
                      <CardsEdit />
                    }
                  </>}/>
                  <Route path="my-cards/view/:id" element={<>
                    {user?.biz && 
                      <CardView />
                    }
                  </>}/>
          
              </Routes>
            </main>
          <footer>hey</footer>
          </div>
      </div>
  );
}

export default App;
