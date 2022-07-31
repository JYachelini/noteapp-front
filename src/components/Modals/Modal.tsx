import React from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
	onBackdropClick: (e:any) => void
	children: any
}

const Modal: React.FC<ModalProps> = ({ onBackdropClick, children }) => {
	return ReactDOM.createPortal(
		<div id='bg-modal' onClick={onBackdropClick} className='fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] h-full w-full flex justify-center items-center'>
			<div onClick={(e) => e.stopPropagation()} className='flex justify-center items-center border border-slate-700 bg-white rounded-md'>
				{children}
			</div>
		</div>,
		document.getElementById('modal-root')!
	)
}

export default Modal
