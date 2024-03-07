import { Container, Stack, Typography, useTheme } from '@mui/material'
import useMediaQuery from "@mui/material/useMediaQuery"
import './App.css'
import { Game } from './Game'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'

function App () {
  const questions = useQuestionsStore(state => state.questions)
  const theme = useTheme()

  const medium = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <main>
      <Container>

        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant={medium ? 'h2' : 'h5'} component='h1'>
            Simulacro MTC
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
        {/* {questions.length > 0 && unanswered === 0 && <Results />} */}

      </Container>
    </main>
  )
}

export default App
