import { useState } from "react"
import { board } from "./helpers/data"
import Keyboard from "./components/keyboard"
import Row from "./components/row"

function App() {
  const randomWord = "TIGHT"

  const [boardState, setBoardState] = useState<{ status: string, value: string }[][]>(board)
  const [attempts, setAttempts] = useState<number>(0)
  const [letterAttempt, setLetterAttempt] = useState<number>(0)
  const [answer, setAnswer] = useState<string[]>([])

  const handleAnswer = (letter: string) => {
    const newBoard = [...boardState]
    const valueCell = newBoard[attempts][letterAttempt].value

    if (valueCell === "" && answer.length < 5) {
      answer.push(letter)
      newBoard[attempts][letterAttempt].value = letter
      setLetterAttempt((prevLetterAttempt) => prevLetterAttempt + 1)
    }

    setBoardState(newBoard)
  }

  const handleCorrect = () => {
    const newBoardState = [...boardState];

    if (answer.length !== 5) {
      return;
    }

    for (let i = 0; i < answer.length; ++i) {
      if (randomWord.includes(answer[i]) && !(randomWord[i] === answer[i])) {
        newBoardState[attempts][i].status = "found";
      } else if (randomWord[i] === answer[i]) {
        newBoardState[attempts][i].status = "correct";
      } else {
        newBoardState[attempts][i].status = "incorrect";
      }
    }

    const notEqual = answer.join("") !== randomWord;

    if (notEqual && attempts < board.length - 1) {
      setLetterAttempt(0);
      setAttempts((prevAttempts) => prevAttempts + 1);
    }

    setBoardState(newBoardState);
    setAnswer([]);
  };


  const handleDelete = () => {
    if (answer.length === 0) {
      return
    }

    const newBoardState = [...boardState]
    const updatedAnswer = [...answer]
    updatedAnswer.pop()
    newBoardState[attempts][letterAttempt - 1].value = ""

    setBoardState(newBoardState)
    setAnswer(updatedAnswer)
    setLetterAttempt((prevLetterAttempt) => prevLetterAttempt - 1)
  }

  return (
    <main>
      <h1>Wordle</h1>
      <Row boardState={boardState} />
      <Keyboard handleAnswer={handleAnswer} handleDelete={handleDelete} handleCorrect={handleCorrect} />
    </main>
  )
}

export default App