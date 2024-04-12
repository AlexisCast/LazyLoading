import { Await, defer, json, useLoaderData } from "react-router-dom";
import PostItem from "../components/PostItem";

function PostPage() {
	const { post } = useLoaderData();

	return (
		<Await resolve={post}>
			{(loaded_post) => <PostItem post={loaded_post} />}
		</Await>
	);
}

async function loadPost(post_id) {
	const response = await fetch(
		"https://jsonplaceholder.typicode.com/posts/" + post_id
	);

	if (response.ok) {
		const response_data = await response.json();
		return response_data;
	} else {
		throw json("Could not fetch post.", { status: 500 });
	}
}

function loader({ params }) {
	const post_id = params.id;

	return defer({
		post: loadPost(post_id),
	});
}

export { loader };
export default PostPage;
