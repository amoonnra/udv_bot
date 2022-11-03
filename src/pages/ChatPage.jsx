import { DialogItem, DialogForm } from '../components/chat';
import { getRoomInfoById, addMsgToRoom } from '../services/localStorage';
import { getCurrendUserId, getCurrendRoomId } from '../services/sessionStorage';
import { scrollDown, clearInput } from '../utils';
import React, { useEffect, useState } from 'react';

const ChatPage = () => {
	const currentUserId = getCurrendUserId();
	const currentRoomId = getCurrendRoomId();
	let roomInfo = getRoomInfoById(currentRoomId);

	const [roomHistory, setRoomHistory] = useState([]);
	const [msg, setMsg] = useState({});

	const allUsersQtty = Array.from(
		new Set(roomHistory.map((r) => r.userId))
	).length;

	const dialogRef = React.useRef(null);
	const inputRef = React.useRef(null);

	useEffect(() => {
		return () => scrollDown(dialogRef);
	}, [roomHistory]);

	useEffect(() => {
		setRoomHistory(roomInfo.history);
		function storageEventHandler(event) {
			if (event.key === 'rooms') {
				roomInfo = getRoomInfoById(currentRoomId);
				roomInfo && setRoomHistory(roomInfo.history);
			}
		}
		window.addEventListener('storage', storageEventHandler);
		return () => {
			window.removeEventListener('storage', storageEventHandler);
		};
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!msg) return;

		try {
			const savedMsg = addMsgToRoom(currentRoomId, {
				userId: currentUserId,
				text: msg.text,
				img: msg.img,
			});

			setRoomHistory((prevState) => [...prevState, savedMsg]);
			clearInput(inputRef);
			setMsg();
		} catch (e) {
			console.error(e.message);
		}
	};

	const handleChange = ({ target }) => {
		setMsg((prevState) => ({ ...prevState, text: target.value }));
	};
	const handleSendImg = (imgObj) => {
		setMsg((prevState) => ({ ...prevState, img: imgObj }));
	};

	return (
		<div className="chat">
			<main className="dialog">
				<div className="room-info">
					Комната: #{roomInfo.code} / Всего участников: {allUsersQtty}
					.
				</div>
				<div className="dialog__window" ref={dialogRef}>
					{roomHistory.map((n) => (
						<DialogItem
							{...n}
							isMyMessage={n.userId === currentUserId}
							key={n.id}
						/>
					))}
				</div>
				<div>
					{msg?.img && (
						<div className="uploaded-img-alert">
							Загружена картинка : {msg.img.file.name}
						</div>
					)}
					<DialogForm
						onSubmit={handleSubmit}
						onChange={handleChange}
						inputRef={inputRef}
						onSendImg={handleSendImg}
					/>
				</div>
			</main>
		</div>
	);
};

export default ChatPage;
