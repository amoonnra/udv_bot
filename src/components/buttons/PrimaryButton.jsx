import React from 'react';

const PrimaryButton = ({ text, type }) => {
	return (
		<button className="button button_primary" type={type}>
			{text}
		</button>
	);
};

export default PrimaryButton;
