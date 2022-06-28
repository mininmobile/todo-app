import { Link } from "react-router-dom";

/**
 * returns a simple 404 page
 */
const InvalidPage: React.FC = () => {
	return (
		<>
			<h1>Invalid Page</h1>
			<p>You have traversed to an invalid page. <Link className="link" to="/">Go home</Link></p>
		</>
	)
}

export default InvalidPage;
