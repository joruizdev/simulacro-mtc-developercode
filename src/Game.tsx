// import { IconButton, Stack } from '@mui/material'
import { Button, Card, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'

import { useQuestionsStore } from './store/questions'

import { type Question as QuestionType } from './types'

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  // usuario no ha seleccionado nada todavía
  if (userSelectedAnswer == null) return 'transparent'
  // si ya selecciono pero la solución es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
  // si esta es la solución correcta
  if (index === correctAnswer) return 'green'
  // si esta es la selección del usuario pero no es correcta
  if (index === userSelectedAnswer) return 'red'
  // si no es ninguna de las anteriores
  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4, maxWidth: '100%' }}>

      <Typography variant='h6'>
        {info.question}
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px'}}>
        <img src={info.img} />
      </div>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              id={answer}
              sx={{
                backgroundColor: getBackgroundColor(info, index)
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'start' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const reset = useQuestionsStore(state => state.reset)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>

        {currentQuestion + 1} / {questions.length}

      </Stack>
      <Question info={questionInfo} />
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>
          ¡Empezar de nuevo!
        </Button>
      </div>
      {/* <Footer /> */}
    </>
  )
}
