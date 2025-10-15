import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	type ArticleStateType,
	type OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const sidebarRef = useRef<HTMLElement>(null);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const handleOutsideClick = (event: React.MouseEvent) => {
		if (
			sidebarRef.current &&
			!sidebarRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(formState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			{isOpen && (
				<div className={styles.overlay} onClick={handleOutsideClick} />
			)}
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option: OptionType) =>
							setFormState({ ...formState, fontFamilyOption: option })
						}
					/>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option: OptionType) =>
							setFormState({ ...formState, fontSizeOption: option })
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option: OptionType) =>
							setFormState({ ...formState, fontColor: option })
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option: OptionType) =>
							setFormState({ ...formState, backgroundColor: option })
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option: OptionType) =>
							setFormState({ ...formState, contentWidth: option })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
