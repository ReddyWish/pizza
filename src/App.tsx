import './scss/app.scss'
import * as React from "react";
import Header from "./components/header";
import Home from "./pages/home";
import {Routes, Route} from "react-router-dom";

const FullPizza = React.lazy(() => import("./pages/fullPizza"))
const NotFound = React.lazy(() => import("./pages/notFound"))
const Cart = React.lazy(() => import("./pages/cart"))


function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/cart'
                           element={<React.Suspense fallback={<div>Loading...</div>}>
                               <Cart/>
                           </React.Suspense>}/>
                    <Route path='/pizza/:id' element={<React.Suspense fallback={<div>Loading...</div>}>
                        <FullPizza/>
                    </React.Suspense>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
