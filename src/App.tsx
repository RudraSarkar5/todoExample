import { useState } from "react"
import "./App.css"

let globalKey : number = 0;

function App() {

  interface ItodoType {
    id : number;
    content : string;
  }
  

  const [todos,setTodos] = useState<ItodoType[]>([]);
  
  const [todoValue,setTodoValue] = useState<string>("");
  const [allowEdit,setAllowEdit] = useState<boolean>(false);
  const [editValue,setEditValue] = useState<string>("");
  const [selectedTodo,setSelectedTodo] = useState<number|null>(null);


  const addTodo = ():void=>{

    const todoItem : ItodoType = {
        id : globalKey + 1,
        content : todoValue
        

    }
    globalKey = globalKey + 1;

    setTodos((pre)=>[...pre,todoItem])
    setTodoValue("");
    
  }

  const handleEdit = (todoItem:ItodoType):void =>{
    setAllowEdit(!allowEdit);
    
    
    setSelectedTodo(todoItem.id);
    setEditValue(todoItem.content);
    
  }

  const updateTodo = (todoId:number):void =>{
    todos.find((todo)=>{
      if(todo.id == todoId){
        todo.content = editValue;
      }
    })
    setAllowEdit(!allowEdit)
  }

  const deleteTodo = (todoId:number):void=>{
    const updatedTodo = todos.filter((todo)=>todo.id != todoId);
    console.log(updatedTodo);
    
    setTodos(updatedTodo);
  }

  return (
    <>
      <div>
        <input value={todoValue} onChange={(e)=>setTodoValue(e.target.value)} type="text" />
        <button onClick={addTodo}>add</button>
      </div>
      <ul >
        {todos.length>0 && todos.map((todo)=>
          (
            <div className="todo-box"  key={todo.id}>
              {allowEdit&&selectedTodo==todo.id?<input type="text" value={editValue} onChange={(e)=>setEditValue(e.target.value)}  />:<li>{todo.content}</li>}
                
                {allowEdit&&selectedTodo==todo.id?<button onClick={()=>updateTodo(todo.id)}>update</button>:<button onClick={()=>handleEdit(todo)}>edit</button>}
                
                <button onClick={()=>deleteTodo(todo.id)}>delete</button>
            </div>
          )
        )}
      </ul>
    </>
  )
}

export default App
