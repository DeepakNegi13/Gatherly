import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<h1>home</h1>} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
