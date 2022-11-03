function setCurrendUserId(userId) {
	sessionStorage.setItem('currentUserId', userId);
}

function setCurrendRoomId(roomId) {
	sessionStorage.setItem('currentRoomId', roomId);
}
function getCurrendUserId() {
	return sessionStorage.getItem('currentUserId');
}

function getCurrendRoomId() {
	return sessionStorage.getItem('currentRoomId');
}

export {
	setCurrendUserId,
	setCurrendRoomId,
	getCurrendUserId,
	getCurrendRoomId,
};
