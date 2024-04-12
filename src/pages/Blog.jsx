import { Await, defer, json, useLoaderData } from "react-router-dom";

import PostList from "../components/PostList";

function BlogPage() {
	const { posts } = useLoaderData();

	return (
		<Await resolve={posts}>
			{(loadedPosts) => <PostList posts={loadedPosts} />}
		</Await>
	);
}

export default BlogPage;

async function loadPosts() {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts");

	if (!response.ok) {
		throw json("Could not fetch posts.", { status: 500 });
	} else {
		const resData = await response.json();
		return resData;
	}
}

export function loader() {
	return defer({
		posts: loadPosts(),
	});
}
