import { NavLinkProps } from 'react-router-dom'

export type MenuItemDefinition = Readonly<{
  title: string//if we were to use translations, then here instead of string would be a function - ReturnType<TFunction> - from i18next
  to: NavLinkProps['to']
}>

export const menuItemsList: ReadonlyArray<MenuItemDefinition> = [
  {
    title: 'All genres',
    to: '#'
  },
  {
    title: 'Alternative',
    to: '#'
  },
  {
    title: 'Ballads/Romantic',
    to: '#'
  },
  {
    title: 'Blues',
    to: '#'
  },
  {
    title: 'Chanson Francaise',
    to: '#'
  },
  {
    title: 'More...',
    to: '#'
  }
]