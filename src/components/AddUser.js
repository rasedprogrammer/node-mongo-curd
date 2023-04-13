import React, { useState } from "react";

const AddUser = () => {
	const [user, setUser] = useState({});
	const handleAddUser = (event) => {
		event.preventDefault();
		console.log(user);
		fetch("http://localhost:5000/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.acknowledged) {
					alert("User added successfully");
					event.target.reset();
				}
				console.log(data);
			})
			.catch((err) => console.log(err));
	};

	const handleInputBlur = (event) => {
		const value = event.target.value;
		const field = event.target.name;
		const newUser = { ...user };
		newUser[field] = value;
		setUser(newUser);
		console.log(value, field);
	};

	return (
		<div>
			<h3>Please add a new user</h3>
			<form onSubmit={handleAddUser}>
				<input
					onBlur={handleInputBlur}
					type="text"
					name="name"
					placeholder="Name"
				/>
				<br />
				<input
					onBlur={handleInputBlur}
					type="text"
					name="address"
					placeholder="Address"
				/>
				<br />
				<input
					onBlur={handleInputBlur}
					type="email"
					name="email"
					placeholder="Email"
				/>
				<br />
				<button type="submit">Add User</button>
			</form>
		</div>
	);
};

export default AddUser;
