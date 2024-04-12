import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import BlogPage, { loader as postsLoader } from "./pages/Blog";
import HomePage from "./pages/Home";
// import PostPage, { loader as postLoader } from "./pages/Post";
import RootLayout from "./pages/Root";

// const BlogPage = lazy(() => import("./pages/Blog"));
// const PostPage = lazy(() => import("./pages/Post"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "posts",
				children: [
					{
						index: true,
						async lazy() {
							const { loader: blogLoader, default: BlogPage } =
								await import("./pages/Blog");
							return {
								loader: blogLoader,
								Component: () => (
									<Suspense
										fallback={<p>Loading blog page...</p>}
									>
										<BlogPage />
									</Suspense>
								),
							};
						},
					},
					// {
					// 	index: true,
					// 	element: (
					// 		<Suspense fallback={<p>Loading ....</p>}>
					// 			<BlogPage />
					// 		</Suspense>
					// 	),
					// 	loader: (meta) =>
					// 		import("./pages/Blog").then((module) => {
					//       console.log("meta",module)
					// 			return module.loader(meta);
					// 		}),
					// },
					{
						path: ":id",
						async lazy() {
							const { loader: postLoader, default: PostPage } =
								await import("./pages/Post");
							return {
								loader: (meta) => postLoader(meta),
								Component: () => (
									<Suspense
										fallback={<p>Loading blog page...</p>}
									>
										<PostPage />
									</Suspense>
								),
							};
						},
					},
					// {
					// 	path: ":id",
					// 	element: (
					// 		<Suspense fallback={<p>Loading...</p>}>
					// 			<PostPage />
					// 		</Suspense>
					// 	),
					// 	loader: (meta) =>
					// 		import("./pages/Post").then((module) =>
					// 			module.loader(meta)
					// 		),
					// },
				],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
