import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const ChessSingle = () => {
    const { chessId } = useParams();
    const [chess, setChess] = useState({});
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://chess.sulla.hu/chess/${chessId}`);
                setChess(response.data);
            } catch (error) {
                console.error("Hiba az adatok lekérésekor:", error);
            } finally {
                setPending(false);
            }
        };
        fetchData();
    }, [chessId]);

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isPending ? (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Betöltés...</span>
                </div>
            ) : (
                <div>
                    <h2>Sakkozó: {chess.name || "N/A"}</h2>
                    {chess.name ? (
                        <div className="card col-sm-3 d-inline-block m-1 p-2">
                            <p className="text-dark">Sakkozó neve: {chess.name}</p>
                            <p className="text-dark">Születési éve: {chess.birth_date || "N/A"}</p>
                            <p className="text-dark">Megnyert világbajnokságok: {chess.world_ch_won || 0}</p>
                            <div>
                                <Link
                                    to={chess.profile_url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-block mb-3"
                                >
                                    Profil link
                                </Link>
                                <img
                                    src={chess.image_url || "https://via.placeholder.com/400x800"}
                                    alt={chess.name || "Placeholder"}
                                    className="img-fluid"
                                    style={{ width: "200px", cursor: "pointer" }}
                                />
                            </div>
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <Link to="/">
                                    <i className="bi bi-backspace-fill fs-2"></i>
                                </Link>
                                <Link to="/">
                                    <i className="bi bi-pencil-square fs-2"></i>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <p>Nincs elérhető adat erről a sakkozóról.</p>
                    )}
                </div>
            )}
        </div>
    );
};
