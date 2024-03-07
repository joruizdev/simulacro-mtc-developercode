import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useQuestionsStore } from './store/questions'

export const Start = () => {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)
  const [numberQuestion, setNumberQuestion] = useState(10)

  const handleClick = () => {
    fetchQuestions(numberQuestion)
  }

  return (
    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: 20}}>
      <TextField id="outlined-basic" label="Cantidad de preguntas" variant="outlined" onChange={e => setNumberQuestion(Number(e.target.value))} />
      <Button onClick={handleClick} variant='contained'>
        ¡Empezar el juego!
      </Button>
    </div>
  )
}
