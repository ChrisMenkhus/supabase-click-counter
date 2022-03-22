import GameCard from './components/GameCard/GameCard'

import { Button } from '@components/atoms'
import { HeartIcon, PlayIcon, ReplyIcon } from '@heroicons/react/outline'
import { useCallback, useEffect, useState } from 'react'

const LikesGame = () => {
  const [gameState, setGameState] = useState<'start' | 'play' | 'win' | 'lose'>(
    'start'
  )

  const [topScore, setTopScore] = useState<number>(20)

  const [currentScore, setCurrentScore] = useState<number>(0)

  const [percentageOfTopScore, setPercentageOfTopScore] = useState(0)

  const DURATION_OF_GAME = 5

  const [timeLeft, setTimeLeft] = useState(DURATION_OF_GAME)

  const [totalLikes, setTotalLikes] = useState<number>(0)

  const [isTimerActive, setIsTimerActive] = useState(false)

  const resetTimeLeft = () => {
    setTimeLeft(DURATION_OF_GAME)
  }

  const resetCurrentScore = () => {
    setCurrentScore(0)
  }

  const handleCurrentScore = () => {
    if (gameState === 'play') {
      setCurrentScore(currentScore + 1)
      if (currentScore > topScore) {
        setTopScore(currentScore)
      }
    }
  }

  const startGame = () => {
    if (gameState !== 'play') {
      setGameState('play')
      resetCurrentScore()
      resetTimeLeft()
      setIsTimerActive(true)
    }
  }

  const endGame = useCallback(() => {
    if (gameState === 'play') {
      if (currentScore > topScore) {
        setGameState('win')
        setTopScore(currentScore)
      } else {
        setGameState('lose')
      }
    }
  }, [gameState, currentScore, topScore])

  const restartGame = () => {
    if (gameState !== 'play') {
      setGameState('play')
      resetCurrentScore()
      resetTimeLeft()
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timer | undefined
    if (isTimerActive) {
      interval = setInterval(() => {
        if (timeLeft > 0) setTimeLeft((timeLeft) => timeLeft - 1)
        else {
          setIsTimerActive(false)
          endGame()
        }
      }, 1000)
    } else if (!isTimerActive && interval) {
      clearInterval(interval)
    }
    return () => interval && clearInterval(interval)
  }, [isTimerActive, timeLeft, endGame])

  // useEffect(() => {
  //   if (gameState === 'play') {
  //     if (topScore > 1 && currentScore <= topScore) {
  //       setPercentageOfTopScore((currentScore / topScore) * 100)
  //     }
  //   }
  // }, [currentScore, topScore, percentageOfTopScore, gameState])

  switch (gameState) {
    case 'start':
      return (
        <GameCard>
          <h1>Play the likes game</h1>
          <div>
            <h2 className="text-xl">Beat the top score</h2>
            <h3 className="text-5xl">30</h3>
          </div>
          <small className="text-base">
            <span className="inline-block mr-2 text-sm text-rose-500">❤</span>
            {totalLikes} likes
          </small>
          <Button
            size="sm"
            icon={PlayIcon}
            onClick={() => {
              startGame()
            }}
          >
            Play
          </Button>
        </GameCard>
      )
      break
    case 'play':
      return (
        <GameCard>
          <h1>Start clicking</h1>
          <div className="flex flex-row w-full">
            <div className="w-full">
              <h2 className="text-xl">Your score:</h2>
              <div>
                <h3 className="inline-block text-5xl">{currentScore}</h3>
                <small className="inline-block text-sm">/ {topScore}</small>
              </div>
            </div>
            <div className="w-full">
              <h4 className="text-xl">Time left:</h4>
              <h5 className="text-5xl">{timeLeft}</h5>
            </div>
          </div>
          <div className="overflow-hidden relative w-full max-w-full h-8 text-base font-bold rounded-full">
            <div className="absolute w-full h-full bg-gray-200"></div>
            <div
              className="absolute w-full h-full bg-green-400 transition-all"
              style={{ width: percentageOfTopScore + '%' }}
            ></div>
          </div>

          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              handleCurrentScore()
            }}
          >
            Click ❤
          </Button>
        </GameCard>
      )
      break
    case 'win':
      return (
        <GameCard>
          <h1>New top score!</h1>
          <div>
            <h2 className="text-xl">Your score:</h2>
            <h3 className="text-5xl">30</h3>
          </div>
          <small className="text-base">
            <span className="inline-block mr-2 text-sm text-rose-500">❤</span>
            {totalLikes} likes
          </small>
          <Button
            size="sm"
            icon={ReplyIcon}
            onClick={() => {
              restartGame()
            }}
          >
            Retry
          </Button>
        </GameCard>
      )
      break
    case 'lose':
      return (
        <GameCard>
          <h1>Almost, try again?</h1>
          <div>
            <h2 className="text-xl">Your score:</h2>
            <h3 className="text-5xl">30</h3>
          </div>
          <small className="text-base">
            <span className="inline-block mr-2 text-sm text-rose-500">❤</span>
            {totalLikes} likes
          </small>
          <Button
            size="sm"
            icon={ReplyIcon}
            onClick={() => {
              restartGame()
            }}
          >
            Retry
          </Button>
        </GameCard>
      )
      break
  }
}

export default LikesGame
