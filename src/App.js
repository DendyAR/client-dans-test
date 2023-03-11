import React from 'react';
import { BrowserRouter , Router , Routes , Route } from 'react-router-dom';
import JobDetailsPage from './components/JobDetailsPage';
import JobLsitPage from './components/JobLsitPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';

const App = () => {
    return (
        <BrowserRouter>
                <Navbar />
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/Job-list' element={<JobLsitPage />} />
                <Route path='/Job-details/:id' element={<JobDetailsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
