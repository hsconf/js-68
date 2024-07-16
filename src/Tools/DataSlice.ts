import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface TasksState {
    tasks: Task[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    status: 'idle',
    error: null,
};

export const fetchTasks = createAsyncThunk<Task[], void>(
    'tasks/fetchTasks',
    async () => {
        const response = await axiosApi.get('/tasks.json');
        const data = response.data;
        return Object.keys(data).map(id => ({ id, ...data[id] }));
    }
);

export const addTask = createAsyncThunk<Task, string>(
    'tasks/addTask',
    async (title: string) => {
        const response = await axiosApi.post('/tasks.json', { title, completed: false });
        return { id: response.data.name, title, completed: false };
    }
);

export const toggleTaskStatus = createAsyncThunk<Task, Task>(
    'tasks/toggleTaskStatus',
    async (task: Task) => {
        const response = await axiosApi.patch(`/tasks/${task.id}.json`, { completed: !task.completed });
        return { ...task, completed: response.data.completed };
    }
);

export const deleteTask = createAsyncThunk<string, string>(
    'tasks/deleteTask',
    async (id: string) => {
        await axiosApi.delete(`/tasks/${id}.json`);
        return id;
    }
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch tasks';
            })
            .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.tasks.push(action.payload);
            })
            .addCase(toggleTaskStatus.fulfilled, (state, action: PayloadAction<Task>) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            });
    },
});

export default tasksSlice.reducer;
