import './App.css';
import Products from './components/Products'; 
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Header from './components/Navbar';
import styled from 'styled-components';
import { Suspense } from 'react';

//frc
function App() {
  return (
    <>
    
    <AppFrame className="App">
      <BrowserRouter basename='/'>
      <Header></Header>
      <Suspense fallback={<p>...Loading page please wait</p>}>
        <Switch>
          <Route path="/"
                exact
                render={(props)=><Home {...props}/>}>
           </Route>
           <Route path="/products"
                exact
                render={(props)=><Products {...props}/>}>
           </Route>
           <Route path="/product/:name"
                exact
                render={(props)=><ProductDetails {...props}/>}>
           </Route>
           <Route 
                exact
                render={()=><p>Page not found</p>}>
           </Route>
        </Switch>
        </Suspense>
      </BrowserRouter>
    </AppFrame>
    </>
  );
}

export default App;

const AppFrame = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;
