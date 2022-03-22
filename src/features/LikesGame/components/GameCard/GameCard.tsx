import makeStyles from '@utils/makeStyles'
import { HTMLAttributes } from 'react'

type GameCardProps = HTMLAttributes<HTMLDivElement>

const GameCard = ({ ...props }: GameCardProps) => {
  return (
    <article
      {...props}
      className={makeStyles([
        'bg-white text-black text-center text-3xl rounded shadow-lg w-96 grid place-items-center gap-2 m-auto p-4',
        props.className || '',
      ])}
    >
      {props.children}
    </article>
  )
}

export default GameCard
