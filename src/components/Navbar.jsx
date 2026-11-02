import { Link } from "react-router-dom";
function Navbar() {
	return (
		<>
			<div className="border-b border-b-[#EBE8DF] h-15 sticky top-0 flex justify-center">
				<div className="max-w-7xl bg-amber-700 flex items-center">

					<Link><div></div><span>EventSphere</span>CURATED CONCLAVES</Link>
					<Link>Explore</Link>
					<Link>Schedule</Link>
					<Link>Saved</Link>
                    <Link>Profile</Link>
					<label htmlFor=""></label>
					<input type="text" />
					
					<Link>Host Event</Link>
					<Link>Comming Soon</Link>
				</div>
			</div>
		</>
	);
}

export default Navbar;
