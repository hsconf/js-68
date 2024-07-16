import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { RootState, AppDispatch } from '../../Tools/store';
import { toggleTaskStatus, deleteTask } from '../../Tools/DataSlice';

const Cards = () => {
    const dispatch = useDispatch<AppDispatch>();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    return (
        <>
            {tasks.map((task) => (
                <Card key={task.id} className="p-0 mb-2">
                    <p className={`ml-2 ${task.completed ? 'line-through' : ''}`}>
                        {task.title}
                    </p>
                    <div className="flex align-items-center">

                        <Checkbox
                            checked={task.completed}
                            onChange={() => dispatch(toggleTaskStatus(task))}
                        />
                        <Button
                            className="p-button-danger ms-5"
                            onClick={() => dispatch(deleteTask(task.id))}
                        >Delete</Button>
                    </div>
                </Card>
            ))}
        </>
    );
};

export default Cards;
