import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom'; 

export const ChessDel = () => {
    const params = useParams();
    const id = params.chessId;
    const navigate = useNavigate();
    const [chess, setChess] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://chess.sulla.hu/chess/${id}`);
                const chess = await res.json();
                setChess(chess);
            } catch (error) {
                console.error("Hiba: ", error);
            }
        })();
    }, [id]);

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await fetch(`https://chess.sulla.hu/chess/${id}`, {
                method: "DELETE",
            });
            navigate("/");
        } catch (error) {
            console.error("Törlés hiba: ", error);
        }
    };

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            <div className="card col-sm-3 d-inline-block m-1 p-2">
                <p className="text-dark">Sakkozó neve: {chess.name}</p>
                <p className="text-dark">Születési éve: {chess.birth_date}</p>
                <p className="text-dark">Megnyert világbajnokság: {chess.world_ch_won}</p>
                <div>
                    <Link to={chess.profile_url || "#"} className="d-block mb-3">Profil link</Link>
                    <img
                        src={chess.image_url || "https://via.placeholder.com/400x800"}
                        alt={chess.name || "Placeholder"}
                        className="img-fluid"
                        style={{ width: "200px", cursor: "pointer" }}
                    />
                </div>
                <form onSubmit={handleDelete}>
                    <button type="submit" className="bi bi-trash3 fs-3"></button>
                </form>
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <Link to="/"><i className="bi bi-backspace-fill fs-2"></i></Link>
                </div>
            </div>
        </div>
    );
};
