import { defineStore, acceptHMRUpdate } from "pinia"
import { ref } from "vue"

const myUserTodo = defineStore("usertodo", () => {
  //state
  const usertodo = ref([])

  //actions
  const addTodos = (newUsers) => {
    newUsers.forEach((newUser) => addTodo(newUser.id, newUser.favorite))
  }

  const addTodo = (id, fav) => {
    usertodo.value.push({
      id: id,
      favorite: fav,
    })
  }

  // update ให้ ค่า favorite
  const updateTodo = (id, favorite) => {
    usertodo.value = usertodo.value.map((todo) => {
      return todo.id === id ? { ...todo, favorite: favorite } : todo
    })
  }

  const removeTodo = (removeId) => {
    usertodo.value.splice(
      usertodo.value.findIndex((todo) => todo.id === removeId),
      1
    )
  }
  //views
  const getTodos = () => {
    return usertodo.value
  }

  return { addTodo, addTodos, updateTodo, removeTodo, getTodos }
})

export { myUserTodo }

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(myUserTodo, import.meta.hot))
}
