import WorldData from "./WorldData";

export default function WorldLayout() {

    const cities = ["wien", "ottawa", "athens", "madrid", "berlin", "tokyo", "cairo", "sydney", "chicago", "milan", "paris", "kiev", "moscow"];

    return (
        <div className="card text-center text-white bg-dark bg-opacity-25 bg-gradient border-0 rounded-5 shadow" style={{ minHeight: 470 }}>
            <div className="row"> <p className="col fs-5 mt-2">Current weather on Earth</p> </div>
            {cities.sort(() => Math.random() - 0.5).slice(0, 5).map((city) => (<WorldData city={city} key={city} />))}
        </div>
    );
}
