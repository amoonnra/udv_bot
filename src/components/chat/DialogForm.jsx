import { PrimaryButton } from '../buttons';
import ImageUploader from './ImageUploader';
import React, { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import CircumIcon from '@klarr-agency/circum-icons-react';

const DialogForm = ({ onChange, onSubmit, inputRef, onSendImg }) => {
	const emojiPicker = React.useRef(null);
	const [show, setShow] = useState(false);

	const closeEmojiPicker = () =>
		emojiPicker.current.classList.remove('active');
	const toggleEmojiPicker = () =>
		emojiPicker.current.classList.toggle('active');

	const keyHandler = (e) => {
		if (e.keyCode === 13 && !e.shiftKey) {
			closeEmojiPicker();
			return onSubmit(e);
		}
		if (e.key === 'Escape') {
			closeEmojiPicker();
		}
	};
	const handleEmoji = ({ native }) => {
		inputRef.current.value += native;
		return onChange({ target: inputRef.current });
	};

	return (
		<>
			<form
				className="dialog__new-msg-form"
				onKeyDown={(e) => keyHandler(e)}
				onSubmit={(e) => {
					closeEmojiPicker();
					return onSubmit(e);
				}}
			>
				<textarea
					autoFocus
					name="new-msg-form_input"
					id="new-msg-form_input"
					rows="2"
					cols="30"
					onChange={onChange}
					ref={inputRef}
				></textarea>

				<button
					className="button button_attachments"
					type="button"
					onClick={toggleEmojiPicker}
				>
					<CircumIcon name="face_smile" color="#ccc" />
				</button>
				<button
					className="button button_attachments"
					type="button"
					onClick={() => setShow(true)}
				>
					<CircumIcon name="image_on" color="#ccc" />
				</button>

				<PrimaryButton text="Отправить" type="submit" />

				<div className="emoji-block" ref={emojiPicker}>
					<Picker
						data={data}
						onEmojiSelect={handleEmoji}
						locale="ru"
					/>
				</div>
			</form>
			<ImageUploader
				onClose={() => setShow(false)}
				show={show}
				onSend={onSendImg}
			/>
		</>
	);
};

export default DialogForm;
