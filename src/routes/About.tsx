/**
 * returns a simple about page
 */
const About: React.FC = () => {
	return (
		<>
			<h1>About</h1>
			<p>This is an example todo app.<br />Technologies used:</p>
			<ul>
				<li>React</li>
				<li>React Router</li>
				<li>Redux</li>
				<li>Redux Toolkit</li>
				<li>Typescript</li>
			</ul>
			<h2>Documentation</h2>
			<p>Visit the <a className="link" target="_blank" rel="noreferrer" href="https://github.com/mininmobile/todo-app">GitHub repository</a>.</p>
		</>
	)
}

export default About;
