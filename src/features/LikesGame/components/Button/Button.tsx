import makeStyles from '@utils/makeStyles'
import { forwardRef } from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  icon?: React.ElementType
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = 'button', variant = 'primary', icon, ...props }, ref) => {
    const Icon = icon
    return (
      <button
        ref={ref}
        type={type}
        className={makeStyles([styles.container, variants[variant], sizes.sm])}
        style={props.style}
        {...props}
      >
        <span className={styles.text}>{props.children}</span>
        {Icon && <Icon className={styles.icon} />}
      </button>
    )
  }
)

const styles = {
  container:
    'flex justify-center items-center rounded border text-black bg-white dark:text-white dark:bg-black hover:scale-105 transition-all border-0',
  text: 'mx-1',
  icon: 'h-4 w-4 mx-1 my-auto',
}

const variants = {
  primary:
    'bg-gradient-to-r text-white dark:text-white shadow-xl shadow-fuchsia-800/20 from-fuchsia-500 to-teal-300',
  secondary:
    'bg-teal-400 dark:bg-teal-400 text-white dark:text-white shadow-xl disabled:bg-gray-400 disabled:dark:bg-gray-400',
}

const sizes = {
  sm: 'py-1 px-4 text-sm',
}

Button.displayName = 'ButtonComponent'
