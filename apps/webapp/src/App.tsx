import { useState } from 'react'
import { css } from '../styled-system/css'
import { Button } from './components/ui/button'
import { Spinner } from './components/ui/spinner'
import { flex } from '../styled-system/patterns'

function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => {
      setCount((c) => c + 1)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className={css({ p: '2rem', maxW: '1280px', m: 'auto', textAlign: 'center' })}>
      <h1 className={css({ fontSize: '3.2em', lineHeight: '1.1', mb: '8' })}>
        Park UI + Panda CSS Demo
      </h1>
      
      <div className={flex({ direction: 'column', gap: '6', alignItems: 'center' })}>
        <div className={css({ fontSize: '2xl', fontWeight: 'bold' })}>
          Count: {count}
        </div>
        
        <div className={flex({ gap: '4' })}>
          <Button 
            colorPalette="amber" 
            size="lg" 
            onClick={handleClick} 
            loading={loading}
          >
            Increment
          </Button>
          
          <Button colorPalette="slate" variant="outline" size="lg">
            Secondary
          </Button>
        </div>
        
        <div className={flex({ gap: '4', mt: '8' })}>
          <div className={flex({ direction: 'column', gap: '2', alignItems: 'center' })}>
            <Spinner size="xs" />
            <span>xs</span>
          </div>
          <div className={flex({ direction: 'column', gap: '2', alignItems: 'center' })}>
            <Spinner size="sm" />
            <span>sm</span>
          </div>
          <div className={flex({ direction: 'column', gap: '2', alignItems: 'center' })}>
            <Spinner size="md" />
            <span>md</span>
          </div>
          <div className={flex({ direction: 'column', gap: '2', alignItems: 'center' })}>
            <Spinner size="lg" />
            <span>lg</span>
          </div>
          <div className={flex({ direction: 'column', gap: '2', alignItems: 'center' })}>
            <Spinner size="xl" />
            <span>xl</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
