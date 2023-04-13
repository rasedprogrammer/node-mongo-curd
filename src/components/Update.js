import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Update = () => {
	const storageUser = useLoaderData();
	const [user, setUser] = useState(storageUser);
	const handleUpdateUser = (event) => {
		event.preventDefault();
		console.log(user);
		fetch(`http://localhost:5000/users/${storageUser._id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					alert("User Update successfully");
					console.log(data);
				}
			})
			.catch((err) => console.log(err));
	};

	const handleInputChange = (event) => {
		const value = event.target.value;
		const field = event.target.name;
		const newUser = { ...user };
		newUser[field] = value;
		setUser(newUser);
		console.log(value, field);
	};
	return (
		<div>
			<h2>This is an update page</h2>
			<h4>Name: {storageUser.name}</h4>
			<form onSubmit={handleUpdateUser}>
				<input
					onChange={handleInputChange}
					defaultValue={storageUser.name}
					type="text"
					name="name"
					placeholder="Name"
				/>
				<br />
				<input
					onChange={handleInputChange}
					defaultValue={storageUser.address}
					type="text"
					name="address"
					placeholder="Address"
				/>
				<br />
				<input
					onChange={handleInputChange}
					defaultValue={storageUser.email}
					type="email"
					name="email"
					placeholder="Email"
				/>
				<br />
				<button type="submit">Update User</button>
			</form>
		</div>
	);
};

export default Update;
