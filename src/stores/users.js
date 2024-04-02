import { defineStore, acceptHMRUpdate } from "pinia"
import { ref } from "vue"

const myUserTodo = defineStore("usertodo", () => {
  //state
  const usertodo = ref([])

  //actions
  const addTodos = (newUsers) => {
    newUsers.forEach((newUser) =>
      addTodo(
        newUser.id,
        newUser.name,
        newUser.location,
        newUser.job,
        newUser.email,
        newUser.password,
        newUser.phone,
        newUser.bio,
        newUser.favorite
      )
    )
  }

  const addTodo = (
    id,
    name,
    location,
    job,
    email,
    password,
    phone,
    bio,
    fav
  ) => {
    usertodo.value.push({
      id: id,
      name: name,
      location: location,
      job: job,
      email: email,
      password: password,
      phone: phone,
      bio: bio,
      favorite: fav,
    })
  }

  // update ให้ ค่า favorite
  const updateTodo = (id, favorite) => {
    usertodo.value = usertodo.value.map((todo) => {
      return todo.id === id ? { ...todo, favorite: favorite } : todo
    })
  }

  const updateTodoUser = (id, edit) => {
    usertodo.value = usertodo.value.map((todo) => {
      return todo.id === id ? { ...edit } : todo
    })
  }

  //views
  const getTodos = () => {
    return usertodo.value
  }

  return { addTodo, addTodos, updateTodo, getTodos, updateTodoUser }
})

export { myUserTodo }

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(myUserTodo, import.meta.hot))
}
