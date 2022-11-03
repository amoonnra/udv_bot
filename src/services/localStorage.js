function createUser(userName, roomId) {
	const users = readUsers() || [];
	const existsUser = users.find((u) => u.username === userName);
	if (existsUser) {
		return existsUser.id;
	}
	const userId = Date.now();
	users.push({ username: userName, id: userId });
	localStorage.removeItem('users');
	localStorage.setItem('users', JSON.stringify(users));
	return userId;
}

function readUsers() {
	return JSON.parse(localStorage.getItem('users'));
}

function getUserInfoById(id) {
	const users = readUsers();
	try {
		return users.find((u) => u.id.toString() === id);
	} catch (e) {
		console.error(e);
	}
}

function createRoom(roomCode) {
	const rooms = readRooms() || [];
	const existsRoom = rooms.find((r) => r.code === roomCode);
	if (existsRoom) {
		return existsRoom.id;
	}
	const roomId = Date.now();
	rooms.push({
		name: 'не названный',
		code: roomCode,
		id: roomId,
		history: [],
	});
	localStorage.removeItem('rooms');
	localStorage.setItem('rooms', JSON.stringify(rooms));
	return roomId;
}

function readRooms() {
	return JSON.parse(localStorage.getItem('rooms'));
}

function getRoomInfoById(id) {
	const rooms = readRooms();
	if (!rooms) return;
	try {
		return rooms.find((r) => r.id.toString() === id);
	} catch (e) {
		console.error(e);
	}
}

function addMsgToRoom(roomId, { userId, text, img }) {
	let rooms = readRooms();
	const currentRoomInfo = getRoomInfoById(roomId);
	const newNote = {
		userId,
		userName: getUserInfoById(userId).username,
		text,
		img,
		id: Date.now(),
		time: new Date().toLocaleString(),
	};
	currentRoomInfo.history.push(newNote);
	rooms = rooms.filter((r) => r.id.toString() !== roomId);
	rooms.push(currentRoomInfo);
	try {
		localStorage.removeItem('rooms');
		localStorage.setItem('rooms', JSON.stringify(rooms));

		return newNote;
	} catch (e) {
		console.error(e);
	}
}

export {
	createUser,
	getUserInfoById,
	createRoom,
	getRoomInfoById,
	addMsgToRoom,
};
