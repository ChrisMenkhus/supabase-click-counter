import { Header } from '@components/atoms'
import LikesGame from '@features/LikesGame/LikesGame'
import { supabase } from '@utils/supabaseClient'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { json } from 'stream/consumers'

type PageProps = {
  likesGame: LikesGame[]
}

type LikesGame = {
  topScore: number
  totalLikes: number
  id: number
}

export async function getServerSideProps() {
  const { data: likesGame } = await supabase
    .from<LikesGame[]>('LikesGame')
    .select()

  return {
    props: { likesGame }, // will be passed to the page component as props
  }
}

const Page: NextPage<PageProps> = ({ likesGame }) => {
  const [likesGameData, setLikesGameData] = useState<LikesGame>({
    id: -1,
    topScore: 0,
    totalLikes: 0,
  })

  useEffect(() => {
    setLikesGameData(likesGame[0])
    console.log('likesGameData:', likesGameData)
    console.log('likesGameProps:', likesGame[0])
    console.log('likesGame / TopScore: ', likesGame[0].topScore)
  }, [likesGame, likesGameData])

  return (
    <>
      <Header {...pageSeo} />
      <section>
        <h1 className="text-5xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-teal-300">
          Supabase Click Counter
        </h1>
        <pre>
          <code>{JSON.stringify(likesGameData)}</code>
        </pre>
        <h2>top score: </h2>
        <LikesGame initialValues={{ topScore: 10, totalLikes: 1000 }} />
      </section>
    </>
  )
}

const pageSeo = {
  title: 'Spacecase Next Template',
  description:
    'Spacecase NextJs Template built for starting up projects quickly.',
}

Page.displayName = 'HomePage'
export default Page
