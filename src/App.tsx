import Pomodoro from './pages/Pomodoro'
import TodoList from './pages/TodoList'

const App = () => {
  return (
    <>
      <Pomodoro />
      <TodoList />
      <span className="author">
        by <a href="https://jahongirhacking.netlify.app/">Jahongir Hayitov</a>
      </span>
    </>
  )
}

export default App