import React, { useState } from 'react'
import { AppConstant } from '../const/index.js'

export default function Contact() {
	const [status, setStatus] = useState('Submit')

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("Sending...");
		const { name, email, message } = e.target.elements;
		let details = {
			name: name.value,
			email: email.value,
			message: message.value,
		};

		let response = await fetch(`${AppConstant.API_URL}/contact`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(details),
		});
		setStatus("Submit");
		let result = await response.json();
		alert(result.status);
	}

	return (
		<>
			<div className="contact1">
				<div className="container-contact1">
					<div className="contact1-pic js-tilt" data-tilt>
						<img src="images/img-01.png" alt="IMG" />
					</div>
					<form className="contact1-form validate-form" onSubmit={handleSubmit}>
						<span className="contact1-form-title">
							Your Contact
						</span>
						<div className="wrap-input1 validate-input" data-validate="Name is required">
							<input className="input1" type="text" name="name" placeholder="Name" />
							<span className="shadow-input1"></span>
						</div>
						<div className="wrap-input1 validate-input" data-validate="Valid email is required: ex@abc.xyz">
							<input className="input1" type="text" name="email" placeholder="Email" />
							<span className="shadow-input1"></span>
						</div>
						<div className="wrap-input1 validate-input" data-validate="Message is required">
							<textarea className="input1" name="message" placeholder="Message"></textarea>
							<span className="shadow-input1"></span>
						</div>
						<div className="container-contact1-form-btn">
							<button className="contact1-form-btn" type="submit">
								<span>
									{status}
									<i className="fa fa-long-arrow-right" aria-hidden="true"></i>
								</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
