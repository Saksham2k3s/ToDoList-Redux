import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos : JSON.parse(localStorage.getItem('ToDoList'))
}
export const todoSlice = createSlice({
  name : 'ToDoList',
  initialState : initialState,
  reducers : {
    addToDo : (state, action) => {
        //Add todo
        const newToDo = {
            text : action.payload.text,
            id : action.payload.id,
            isCompleted : action.payload.isCompleted
        }

        state.todos.push(newToDo); 
        localStorage.setItem('ToDoList', JSON.stringify(state.todos)); 
        
         

         
    },
    deleteToDo : (state, action) => {
         const id = action.payload;
         state.todos = state.todos.filter((todo, index) => index !== id);
         localStorage.setItem('ToDoList', JSON.stringify(state.todos));
    },
    completedToDo : (state, action) => {
         const id = action.payload;
         state.todos[id].isCompleted = !state.todos[id].isCompleted;
         localStorage.setItem('ToDoList', JSON.stringify(state.todos));

    },

    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      state.todos[id].text = text;
      localStorage.setItem('ToDoList', JSON.stringify(state.todos));
    },

    resetTodo: (state, action) => {
      state.todos = []; 
      localStorage.setItem('ToDoList', JSON.stringify([])); 
    }
  }  
});

export const {addToDo, deleteToDo, completedToDo, updateTodo, resetTodo} = todoSlice.actions;
export default  todoSlice.reducer;