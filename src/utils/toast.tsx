import { action, observable } from 'mobx'
import { observer } from 'mobx-react-lite'
import React from 'react'
import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(-100px);
	}
	to {
		opacity: 1;
		transform: translate3d(0, 0, 0);	
	}	
`

const Container = styled.div`
	position: fixed;
	top: 12px;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	z-index: 9998;
`

const Toast = styled.div`
	margin: 0 auto;
	box-shadow: 0 0 20px rgba(15, 15, 15, 0.1);
	border-radius: 90px;
	padding: 8px 24px;
	font-family: inherit;
	font-weight: 300;
	opacity: 0;
	z-index: 9999;
	background-color: white;
	animation: ${slideIn} 0.5s forwards, ${slideIn} 0.5s 2s forwards reverse;
`

export type ToastType = 'info' | 'warning' | 'error' | 'success'

const state = observable({ text: '', type: 'info', key: 0 } as {
	text: string
	type: ToastType
	key: number
})

const setState = action((message: string, type: ToastType) => {
	state.text = message
	state.type = type
	state.key = +new Date()
})

export const toast: { [key in ToastType]: (message: string) => void } = {
	info: (message: string) => setState(message, 'info'),
	warning: (message: string) => setState(message, 'warning'),
	error: (message: string) => setState(message, 'error'),
	success: (message: string) => setState(message, 'success')
}

export const ToastContainer: React.FC = observer(() =>
	state.text ? (
		<Container>
			<Toast key={state.key}>
				{state.type === 'info' && 'ℹ'}
				{state.type === 'warning' && '⚠'}
				{state.type === 'error' && '✖'}
				{state.type === 'success' && '✔'} {state.text}
			</Toast>
		</Container>
	) : null
)
