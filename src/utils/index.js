const scrollDown = (ref) => {
	ref.current.scrollTop = ref.current.scrollHeight;
};

const clearInput = (ref) => {
	ref.current.value = '';
	ref.current.focus();
};

export { scrollDown, clearInput };
