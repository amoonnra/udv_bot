import React, { useCallback, useState } from 'react';
import { PrimaryButton } from './buttons';
import TextField from './TextField';
import { createRoom, createUser } from '../services/localStorage';
import { setCurrendRoomId, setCurrendUserId } from '../services/sessionStorage';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
	const [data, setData] = useState({});
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const roomId = createRoom(data.room);
			setCurrendRoomId(roomId);

			const userId = createUser(data.username, roomId);
			setCurrendUserId(userId);

			navigate('/chat');
		} catch (e) {
			console.error(e.message);
		}
	};

	const handleChange = useCallback((target) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	}, []);

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<TextField
				name="username"
				type="text"
				placeholder="Имя пользователя"
				infoText="* Если такого пользователя не существует, он создаться автоматически"
				labelText="Введите свой никнейм:"
				onChange={(data) => handleChange(data)}
			/>
			<TextField
				name="room"
				type="text"
				placeholder="Код комнаты"
				infoText="* Если ее не существует, то она создаться автоматически"
				labelText="Введите комнату чата:"
				onChange={(data) => handleChange(data)}
			/>
			<PrimaryButton text="Войти" />
		</form>
	);
};

export default AuthForm;
