import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import Homepage from "./pages/Homepage"
const App = () => {
	return (
		<div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-orange-100 selection:text-[#E65100]">
			<Navbar />
			<div className="flex-1">
				<Routes>
					<Route path="/" element={<Homepage/>} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
};

export default App;
