import { keyframes } from 'styled-components'

type Directions = 'left' | 'right' | 'down' | 'up'

export const pulse = (intensiveness: number) => keyframes`
	0%, 100% {
    transform: scale(1);	
	}
	50% {
    transform: scale(${intensiveness});
  }	
`

export const fadeIn = () => keyframes`
	0% {
    opacity: 0;
	}
	100% {
    opacity: 1;
  }	
`

export const grow = (from: number, fade = true) => keyframes`
	0% {
		transform: scale(${from});
		${fade && 'opacity: 0;'}
	}
	100% {
		transform: scale(1);
		${fade && 'opacity: 1;'}
  }	
`

export const slideIn = (from: Directions, amount: string, fade = true) => {
	const trans =
		(from === 'left' || from === 'right' ? 'translateX' : 'translateY') +
		'(' +
		(from === 'left' || from === 'up' ? '-' : '') +
		amount +
		')'

	return keyframes`
		from {
			${fade && 'opacity: 0;'}
			transform: ${trans};
		}
		to {
			${fade && 'opacity: 1;'}
			transform: translate3d(0, 0, 0);	
		}	
	`
}
