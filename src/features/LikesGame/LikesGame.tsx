/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from './components/Button/Button'
import GameCard from './components/GameCard/GameCard'

import { HeartIcon, PlayIcon, ReplyIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import CountUp from 'react-countup'

type LikesGameProps = {
  initialValues: { topScore: number; totalLikes: number }
  updateTotalLikesOnDatabase: (value: number) => Promise<number | undefined>
  updateTopScoreOnDatabase: (value: number) => Promise<number | undefined>
}

const LikesGame = ({
  initialValues,
  updateTotalLikesOnDatabase,
  updateTopScoreOnDatabase,
}: LikesGameProps) => {
  const [gameState, setGameState] = useState<'start' | 'play' | 'win' | 'lose'>(
    'start'
  )

  const [topScore, setTopScore] = useState<number>(initialValues.topScore)

  const [totalLikes, setTotalLikes] = useState<number>(initialValues.totalLikes)

  const [currentScore, setCurrentScore] = useState<number>(0)

  const [percentageOfTopScore, setPercentageOfTopScore] = useState(0)

  const DURATION_OF_GAME = 5

  const [timeLeft, setTimeLeft] = useState(DURATION_OF_GAME)

  const [isTimerActive, setIsTimerActive] = useState(false)

  const [isRetryButtonDisabled, setIsRetryButtonDisabled] = useState(false)

  const resetTimeLeft = () => {
    setTimeLeft(DURATION_OF_GAME)
  }

  const resetCurrentScore = () => {
    setCurrentScore(0)
  }

  const handleCurrentScore = () => {
    if (gameState === 'play') {
      setCurrentScore(currentScore + 1)
      handleTopScore()
    }
  }

  const handleTotalLikes = () => {
    updateTotalLikesOnDatabase(totalLikes + currentScore)
    setTotalLikes(totalLikes + currentScore)
  }

  const handleTopScore = () => {
    if (currentScore > topScore) {
      updateTopScoreOnDatabase(currentScore)
      setTopScore(currentScore)
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
  const restartGame = () => {
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
        handleTopScore()
      } else {
        setGameState('lose')
      }
      handleTotalLikes()
      setIsRetryButtonDisabled(true)
      setTimeout(() => {
        setIsRetryButtonDisabled(false)
      }, 1500)
    }
  }, [gameState, currentScore, topScore])

  useEffect(() => {
    let interval: NodeJS.Timer | undefined
    if (isTimerActive) {
      if (timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((timeLeft) => timeLeft - 1)
        }, 1000)
      } else {
        setIsTimerActive(false)
        endGame()
      }
    } else if (interval) {
      clearInterval(interval)
      resetTimeLeft()
    }
    return () => interval && clearInterval(interval)
  }, [isTimerActive, timeLeft])

  useEffect(() => {
    if (gameState === 'play') {
      if (topScore > 0 && currentScore <= topScore) {
        setPercentageOfTopScore((currentScore / topScore) * 100)
      }
    }
  }, [currentScore, topScore, percentageOfTopScore, gameState])

  switch (gameState) {
    case 'start':
      return (
        <GameCard>
          <h1>Play the likes game</h1>
          <div>
            <h2 className="text-xl">Beat the top score</h2>
            <h3 className="text-5xl">{topScore}</h3>
          </div>
          <small className="text-base">
            <span className="inline-block mr-2 text-sm text-rose-500">❤</span>
            <CountUp end={totalLikes} duration={3} className="pr-1" />
            likes
          </small>
          <Button
            variant="secondary"
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
              <h5 className="text-5xl">
                {timeLeft}
                <span className="block text-sm leading-none">seconds</span>
              </h5>
            </div>
          </div>
          <div className="overflow-hidden relative w-full max-w-full h-4 text-base font-bold rounded-full">
            <div className="absolute w-full h-full bg-gray-200"></div>
            <div
              className="absolute w-full h-full bg-green-400 transition-all"
              style={{ width: percentageOfTopScore + '%' }}
            ></div>
          </div>

          <Button
            icon={HeartIcon}
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              handleCurrentScore()
            }}
          >
            Click
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
            <h3 className="text-5xl">{topScore}</h3>
          </div>
          <small className="text-base">
            <span className="inline-block mr-2 text-sm text-rose-500">❤</span>
            <CountUp
              start={totalLikes - currentScore}
              end={totalLikes}
              duration={3}
              className="pr-1"
            />
            likes
          </small>
          <div className="flex flex-row gap-4">
            <Button
              variant="secondary"
              size="sm"
              icon={ReplyIcon}
              onClick={() => {
                restartGame()
              }}
              disabled={isRetryButtonDisabled}
            >
              Retry
            </Button>
          </div>
        </GameCard>
      )
      break
    case 'lose':
      return (
        <GameCard>
          <h1>Almost, try again?</h1>
          <div className="flex flex-row w-full">
            <div className="w-full">
              <h2 className="text-xl">Your score:</h2>
              <div>
                <h3 className="inline-block text-5xl">{currentScore}</h3>
                <small className="inline-block text-sm">/ {topScore}</small>
              </div>
            </div>
          </div>
          <small className="text-base">
            <span className="inline-block mr-2 text-sm text-rose-500">❤</span>
            <CountUp
              start={totalLikes - currentScore}
              end={totalLikes}
              duration={3}
              className="pr-1"
            />
            likes
          </small>
          <Button
            variant="secondary"
            size="sm"
            icon={ReplyIcon}
            onClick={() => {
              restartGame()
            }}
            disabled={isRetryButtonDisabled}
          >
            Retry
          </Button>
        </GameCard>
      )
      break
  }
}

export default LikesGame
