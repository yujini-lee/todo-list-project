export default function todoReducer(task, action) {

  switch (action.type) {
    case "ADD":
      return task.concat(action.value);
    
    case 'DELETE' : 
      return task.filter((x) => x.text !== action.todolist);
    
    case 'UPDATE':
      return task.map((todo) => todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo);
    
    case 'EDIT':
      return task.map((todo) => (todo.id === action.id ? { ...todo, text:action.text } : todo));
    
    default:{
        throw Error('에러');
      }
  }
}
