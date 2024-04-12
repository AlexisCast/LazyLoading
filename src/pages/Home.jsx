import { Link } from "react-router-dom";

function HomePage() {
	return (
		<div>
			<h1>The Home Page</h1>
			<Link to="/post">Post</Link>
		</div>
	);
}

export default HomePage;
