import ImageUploading from 'react-images-uploading';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CircumIcon from '@klarr-agency/circum-icons-react';

const ImageUploader = ({ onClose, show, addImg, onSend, onSubmit }) => {
	const [image, setImage] = useState();

	const onChangeImg = (imageList, addUpdateIndex) => {
		setImage(imageList[0]);
		console.log(image);
	};
	const closeOnEscapeKeyDown = (e) => {
		if ((e.charCode || e.keyCode) === 27) {
			setImage('');
			onClose();
		}
	};
	useEffect(() => {
		window.addEventListener('keydown', closeOnEscapeKeyDown);
		return () => {
			window.removeEventListener('keydown', closeOnEscapeKeyDown);
		};
	}, []);

	if (!show) return null;

	return createPortal(
		<div>
			<ImageUploading onChange={onChangeImg} dataURLKey="base64">
				{({ imageList, onImageUpload, isDragging, dragProps }) => (
					<div className="upload__image-wrapper">
						{image ? (
							<div>
								<img src={image.base64} alt="" />
								<div>{image.file.name}</div>
								<div className="upload_buttons">
									<button
										className="button button_attachments"
										onClick={() => {
											onSend(image);
											setImage('');
											onClose();
										}}
									>
										Добавить
									</button>
									<button
										className="button button_attachments"
										onClick={() => setImage('')}
									>
										Удалить
									</button>
								</div>
							</div>
						) : (
							<div
								className="upload__image"
								style={isDragging ? { zoom: '1.1' } : undefined}
								onClick={onImageUpload}
								{...dragProps}
							>
								<CircumIcon name="save_down_2" color="#fff" />
							</div>
						)}

						<button
							className="button button_close"
							onClick={() => {
								setImage('');
								onClose();
							}}
						>
							<CircumIcon name="square_remove" color="#fff" />
						</button>
					</div>
				)}
			</ImageUploading>
		</div>,

		document.getElementById('root')
	);
};

export default ImageUploader;
