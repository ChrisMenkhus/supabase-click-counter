import { Button, Header } from '@components/atoms'
import { supabase } from '@utils/supabaseClient'
import debounce from 'lodash/debounce'
import type { NextPage } from 'next'
import { useCallback, useEffect, useMemo, useState } from 'react'

type Clicks = {
  amount: number
}[]

export async function getStaticProps() {
  const clicks = await getCurrentClicks()

  return {
    props: { ...clicks },
  }
}

const getCurrentClicks = async () => {
  const { data: clicks } = await supabase
    .from<Clicks>('Clicks')
    .select('amount')

  return { clicks }
}

const incrementClicks = async (value: number) => {
  let amountOfClicks = 0

  const { data: clicks, error } = await supabase
    .from<{ id: number; amount: number }>('Clicks')
    .update({ amount: value })
    .eq('id', 1)

  if (clicks) amountOfClicks = clicks[0].amount

  console.log('incriment to: ', amountOfClicks)
}

type PageProps = {
  clicks: Clicks
}

const Page: NextPage<PageProps> = ({ ...props }) => {
  const [clicks, setClicks] = useState<number>(props.clicks[0].amount)

  const debouncedIncrimentClicks = useMemo(
    () => debounce((clicks) => incrementClicks(clicks + 1), 1000),
    []
  )

  useEffect(() => {
    return () => {
      debouncedIncrimentClicks.cancel()
    }
  }, [debouncedIncrimentClicks])

  const handleClick = () => {
    console.log('Clicked')
    setClicks(clicks + 1)
    debouncedIncrimentClicks(clicks)
  }

  return (
    <>
      <Header {...pageSeo} />
      <section>
        <h1 className="text-5xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-teal-300">
          Supabase Click Counter
        </h1>
        <article className="grid gap-4 place-items-center py-16 m-auto max-w-sm text-white bg-gray-900 rounded shadow-lg">
          <p>number of clicks: {clicks}</p>
          <Button onClick={() => handleClick()}>Click Me</Button>
        </article>
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
