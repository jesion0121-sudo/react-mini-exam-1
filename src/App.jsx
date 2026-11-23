import './App.css'
import AddMenu from './components/AddMenu'
import Header from './components/Header'
import MenuCard from './components/MenuCard'
import { initialMenus } from './data'

function App() {

  console.log(initialMenus);

  return (
    <div className='app'>
    <Header title={'🍱 오늘 점심 뭐 먹지?'}/>
    <AddMenu />
    <MenuCard />
    <footer>
      <button>초기화</button>
    </footer>
    </div>
  )
}

export default App
