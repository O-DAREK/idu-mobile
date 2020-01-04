import { muiTheme } from 'styles/theme'

type Theme = ReturnType<typeof muiTheme>
declare module 'styled-components' {
	interface DefaultTheme extends Theme {}
}
