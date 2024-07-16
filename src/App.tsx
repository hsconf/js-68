import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import BottomInputBar from './components/BottomInputBar/BottomInputBar';
import Cards from './components/Card/Card';
import { fetchTasks } from './Tools/DataSlice';

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <>
            <header className="container py-3">
                <p className="fs-4 fw-bold">TODO LIST</p>
            </header>
            <main className="container">
                <div className="_top">
                    <Cards />
                </div>
                <div className="_bottom">
                    <BottomInputBar />
                </div>
            </main>
        </>
    );
};

export default App;
