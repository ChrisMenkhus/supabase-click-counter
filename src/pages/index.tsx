import { Header } from '@components/atoms'
import LikesGame from '@features/LikesGame/LikesGame'
import type { NextPage } from 'next'

type PageProps = {}

const Page: NextPage<PageProps> = ({ ...props }) => {
  return (
    <>
      <Header {...pageSeo} />
      <section>
        <h1 className="text-5xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-teal-300">
          Supabase Click Counter
        </h1>
        <LikesGame />
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
