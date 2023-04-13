import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
	const users = useLoaderData();
	const [displayUser, setDisplayUser] = useState(users);
	const handleDeleteUser = (user) => {
		const agree = window.confirm(
			`Are you sure you want to delete ${user.name}`
		);
		// console.log(agree);
		if (agree) {
			// console.log("Deleting user with id " + user._id);
			fetch(`http://localhost:5000/users/${user._id}`, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.deletedCount > 0) {
						alert("User deleted successfully");
						const remainingUsers = displayUser.filter(
							(usr) => usr._id !== user._id
						);
						setDisplayUser(remainingUsers);
					}
				});
		}
	};
	return (
		<div>
			<h2>User: {displayUser.length}</h2>
			{displayUser.map((user) => (
				<p key={user._id}>
					{user.name} {user.email}{" "}
					<Link to={`/update/${user._id}`}>
						<button>Update</button>
					</Link>
					<button onClick={() => handleDeleteUser(user)}>X</button>{" "}
				</p>
			))}
		</div>
	);
};

export default Home;
