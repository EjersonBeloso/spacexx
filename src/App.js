import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [infos, setInfos] = useState([]);

	const fetchData = async () => {
		const res = await axios
			.get("https://api.spacexdata.com/v4/launches/")
			.then((result) => {
				console.log(result.data);
				setInfos(result.data);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className="max-w-[1200px] bg-slate-200 mx-auto mt-[50px]">
			<form>
				<input
					type="text"
					name="search"
					id="search"
					className="p-3 m-4 w-[80%]"
					placeholder="Enter keywords"
				/>
				<button className="bg-blue-300 p-3">Search</button>
			</form>

			<div>
				{infos.map((info) => (
					<div key={info.id} className="flex bg-white m-4 gap-2">
						<div className="m-8">
							<img
								src={info.links.patch.small}
								alt="patch-img"
								className="w-[100px]"
							/>
						</div>
						<div className=" m-8">
							<div>
								<h2 className="font-bold">
									Flight number: {info.flight_number} || Mission Name:
									{info.name} || {info.date_utc}
								</h2>
							</div>
							<div className="flex text-gray-500 flex-col">
								<h3 className="text-gray-700">Details:</h3>
								<p>{info.details}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
export default App;
