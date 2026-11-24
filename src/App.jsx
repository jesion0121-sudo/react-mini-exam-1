
import './App.css'
import AddMenu from './components/AddMenu'
import Header from './components/Header'
import MenuCard from './components/MenuCard'
import { initialMenus } from './data'
import { useState, useEffect } from 'react'
import { flagMap } from './flags'

const findFlag = (name) => {
  const text = name.trim()
  const found = flagMap.find((f) => text.includes(f.name))
  return found ? found.flag : '🧳'
}

function loadMenus() {
  const saved = localStorage.getItem('travel-votes')
  return saved ? JSON.parse(saved).map((m)=>({...m, emoji:m.emoji === '🧳' ? findFlag(m.name): m.emoji})) : initialMenus

}


function App() {

  const [menus, setMenus] = useState(loadMenus)


  const total = menus.reduce((sum, m) => sum + m.votes, 0)
  const topVotes = Math.max(...menus.map((m) => m.votes))

  useEffect(() => {
    document.title = `${total}표 투표중`
  }, [total])

  useEffect(() => {
    localStorage.setItem('travel-votes', JSON.stringify(menus))
  })

  const vote = (id) => {
    setMenus(menus.map((m) => (m.id === id ? { ...m, votes: m.votes + 1 } : m)))
  }


  const addMenu = (name) => {
    setMenus([...menus, {
      id: Date.now(),
      emoji: findFlag(name),
      name: name,
      votes: 0
    }])
  }

  const reset = () => setMenus(menus.map((m) => ({ ...m, votes: 0 })))
  const resetAll = () => setMenus(initialMenus)

  return (
    <div className='app'>
      <Header title={'✈️여행 가고 싶은 나라에 투표하세요!'} total={total} />
      <AddMenu onAdd={addMenu} />
      <ul className="menus">
        {menus.map((m) => (
          <MenuCard
            key={m.id}
            {...m}
            isTop={topVotes > 0 && m.votes == topVotes}
            onVote={() => vote(m.id)}
          />
        ))}
      </ul>
      <footer className='footer'>
        <button type='button' className='reset vote' onClick={reset}>투표 초기화</button>
        <button type='button' className='reset all' onClick={resetAll}>전부 초기화</button>
      </footer>
    </div>
  )
}

export default App
