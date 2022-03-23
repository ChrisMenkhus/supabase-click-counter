import { Header } from '@components/atoms'
import LikesGame from '@features/LikesGame/LikesGame'
import { supabase } from '@utils/supabaseClient'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { json } from 'stream/consumers'

type PageProps = {
  data: LikesGame
}

type LikesGame = {
  topScore: number
  totalLikes: number
  id: number
}

export async function getServerSideProps() {
  const data = await getData()

  return {
    props: { data },
  }
}

async function getData() {
  const { data, error } = await supabase
    .from<LikesGame>('LikesGame')
    .select('topScore, totalLikes, id')
    .eq('id', 1)
    .single()
  return data
}

const updateTotalLikesOnDatabase = async (value: number) => {
  const { data, error } = await supabase
    .from<LikesGame>('LikesGame')
    .update({ totalLikes: value })
    .eq('id', 1)
    .single()

  return data?.totalLikes
}

const updateTopScoreOnDatabase = async (value: number) => {
  const { data, error } = await supabase
    .from<LikesGame>('LikesGame')
    .update({ topScore: value })
    .eq('id', 1)
    .single()

  return data?.topScore
}

const Page: NextPage<PageProps> = ({ ...props }) => {
  const [topScore, setTopScore] = useState(props.data.topScore)
  const [totalLikes, setTotalLikes] = useState(props.data.totalLikes)

  return (
    <>
      <Header {...pageSeo} />
      <section>
        <h1 className="mb-16 text-5xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-teal-300">
          Supabase Click Counter
        </h1>

        <LikesGame
          initialValues={{
            topScore: topScore,
            totalLikes: totalLikes,
          }}
          updateTotalLikesOnDatabase={updateTotalLikesOnDatabase}
          updateTopScoreOnDatabase={updateTopScoreOnDatabase}
        />
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
