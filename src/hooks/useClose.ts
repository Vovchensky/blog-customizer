import { useEffect, RefObject } from 'react';

type UseCloseProps = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: RefObject<HTMLElement>;
};

export const useClose = ({ isOpen, onClose, rootRef }: UseCloseProps) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClick);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose, rootRef]);
};
