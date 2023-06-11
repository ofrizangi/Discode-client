import React, { useState } from 'react';

import info_file from './../../images/for-loop.txt'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


function InfoHover() {
	const [data, setData] = useState('');

	async function loadData(){
		var response = await fetch(info_file)
		response = await response.text()
		setData(response)
	}

	// const handleClickOutside = (event) => {
	// 	if (popoverRef.current && !popoverRef.current.contains(event.target)) {
	// 	  setIsPopoverVisible(false);
	// 	}
	//   };

	// useEffect(() => {
	// 	document.addEventListener("click", handleClickOutside);
	// 	return () => {
	// 	  document.removeEventListener("click", handleClickOutside);
	// 	};
	//   }, []);


	const popoverStyle = {
		whiteSpace: 'pre-wrap',
		fontFamily: 'monospace',
		fontSize: '14px',
		width: 'fit-content',
    	maxWidth: '50%',
		paddingLeft : '1%'
	  };
	

	const popover = (
		<Popover id="popover-content" style={popoverStyle}>
		  <div dangerouslySetInnerHTML={{ __html: data }}></div>
		</Popover>
	  );
	
	  return (
		<OverlayTrigger
		trigger={["click", "focus"]}
		placement="bottom"
		overlay={popover} delay={{ show: 0, hide: 0 }}
		>
		<i className="bi bi-info-circle info-icon" onClick={loadData}></i>
		</OverlayTrigger>
	  );
}

export default InfoHover;