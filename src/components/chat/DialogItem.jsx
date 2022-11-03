const Dialogitem = ({ time, text, img, userName, isMyMessage }) => {
	return (
		<div className="dialog__message-wrapper">
			<div
				className={
					'dialog__message' + (isMyMessage ? ' left' : ' right')
				}
			>
				<div className="message__info">
					<strong className="message__user">{userName}</strong>
					<span className="message__time">{time}</span>
				</div>
				<div className={'message__text'}>{text}</div>
				{img ? <img alt={img.file.name} src={img.base64} /> : ''}
			</div>
		</div>
	);
};

export default Dialogitem;
