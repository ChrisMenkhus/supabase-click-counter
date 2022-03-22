import DarkModeToggleButton from './DarkModeToggleButton'

import { MenuIcon, XIcon } from '@heroicons/react/outline'
import makeStyles from '@utils/makeStyles'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes, useContext } from 'react'
import { AppContext } from 'src/stores/context/AppContext'

type NavWrapperProps = HTMLAttributes<HTMLElement>

export const NavWrapper = ({ ...props }: NavWrapperProps) => {
  const context = useContext(AppContext)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  let isDark = Boolean(theme === 'dark')

  const mobileNavMenuToggled = Boolean(context?.store.showMobileNavMenu)

  const toggleMobileNavMenu = () => {
    context?.actions.setShowMobileNavMenu(!mobileNavMenuToggled)
  }

  return (
    <nav
      className={makeStyles([
        'fixed top-0 z-50 bg-white w-full sm:shadow-md text-black bg-transparent sm:bg-white dark:sm:bg-trueGray dark:text-white',
        mobileNavMenuToggled && 'bg-light dark:bg-trueGray',
      ])}
    >
      <div className="flex flex-wrap py-2 px-4 mx-auto max-w-screen-lg md:flex-nowrap md:py-4">
        <div className="flex flex-row items-center w-full h-auto md:w-auto">
          <Link href="/" passHref>
            <a className="hidden relative w-auto h-auto sm:flex">
              Spacecase Next Template
            </a>
          </Link>
          <button
            className="relative p-1 mt-4 ml-auto w-10 h-10 bg-white dark:bg-trueGray rounded-full shadow-lg sm:mt-auto md:hidden"
            onClick={toggleMobileNavMenu}
            aria-label="Toggle Navigation Menu"
          >
            {mobileNavMenuToggled ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
        <div
          className={makeStyles([
            'flex flex-col w-auto text-center m-auto md:mr-0 md:flex-row',
            !mobileNavMenuToggled && 'hidden md:flex',
          ])}
        >
          {props.children}
          <div className="grid relative place-items-center m-auto mt-8 md:mt-auto md:mr-0 md:ml-8">
            <DarkModeToggleButton toggleTheme={toggleTheme} isDark={isDark} />
          </div>
        </div>
      </div>
    </nav>
  )
}

NavWrapper.displayName = 'NavWrapperComponent'
export default NavWrapper
