import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Editor from './pages/Editor';
import MyTales from './pages/MyTales';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                    <Header />
                    <main className="grow flex flex-col">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path="/editor" element={<Editor />} />
                            <Route path='/my-tales' element={<MyTales />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;