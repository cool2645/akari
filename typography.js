import Typography from 'typography'
import altonTheme from 'typography-theme-alton'

const typography = new Typography(altonTheme)

typography.baseFontSize = '16px'

export const { scale, rhythm, options } = typography
export default typography
