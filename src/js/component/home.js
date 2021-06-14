import React from "react";
import { useEffect, useRef, useState } from "react";

//create your first component
export function Home() {
	const [seleccionada, setSeleccionada] = useState("");
	const [songs, setSongs] = useState([]);
	const [botonPlay, setBotonPlay] = useState("Play");
	let songPlayer = useRef("");

	//getectch y useEffect
	let getFetch = () => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(result => {
				return result.json();
			})
			.then(data => {
				setSongs(data);
			})
			.catch(error => {
				console.error(error);
			});
	};

	useEffect(() => {
		getFetch();
	});

	const clicCancion = event => {
		let index = event.target.id;
		setSeleccionada(parseInt(index));
		console.log(parseInt(index));
		setBotonPlay("Pause");
		songPlayer.current.src = `https://assets.breatheco.de/apis/sound/${
			songs[parseInt(index)].url
		}`;
		console.log(songPlayer.current.src);
	};

	const stopCancion = event => {
		songPlayer.current.src = ``;
		setBotonPlay("Play");
	};

	const adelantarCancion = event => {
		songPlayer.current.src = `https://assets.breatheco.de/apis/sound/${
			songs[seleccionada + 1].url
		}`;
	};

	const atrasarCancion = event => {
		songPlayer.current.src = `https://assets.breatheco.de/apis/sound/${
			songs[seleccionada - 1].url
		}`;
	};

	const listCanciones = songs.map((cancion, index) => {
		return (
			<div
				key={index}
				id={index}
				refi={`div${cancion.id}`}
				onClick={clicCancion}
				className={`col-md-12 d-flex align-items-center border border-danger my-2 
				${
					songPlayer.current.src ==
					`https://assets.breatheco.de/apis/sound/${
						songs[parseInt(cancion.id)].url
					}`
						? "bg-warning"
						: ""
				}`}>
				Canción N° {cancion.id}{" "}
				{songs[cancion.id + 1].name.toUpperCase()}
			</div>
		);
	});

	return (
		<div className="bg-secondary">
			<div className="text-center header bg-dark py-3">
				<h1 className="display-4">Musica para tus oidos</h1>
			</div>
			<div className="body">
				<div className="container">
					<div className="row lista">{listCanciones}</div>
				</div>
			</div>
			<div className="col-md-12">
				<div className="row d-flex justify-content-center footer bg-dark">
					<button
						type="button"
						className="btn btn-primary mx-2"
						onClick={atrasarCancion}>
						Atras
					</button>
					<button
						type="button"
						className="btn btn-primary mx-2"
						onClick={stopCancion}>
						{botonPlay}
					</button>
					<button
						type="button"
						className="btn btn-primary mx-2"
						onClick={adelantarCancion}>
						Adelante
					</button>
				</div>
			</div>
			<audio src="" ref={songPlayer} autoPlay />
		</div>
	);
}
