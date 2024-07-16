import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { addTask } from '../../Tools/DataSlice';

const BottomInputBar = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            dispatch(addTask(title));
            setTitle('');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="p-inputgroup flex-1">
                    <InputText
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter todo"
                    />
                    <Button type="submit" className="p-button-warning">Send</Button>
                </div>
            </form>
        </div>
    );
};

export default BottomInputBar;
