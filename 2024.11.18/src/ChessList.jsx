import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const ChesstList = () => {
    const [chesses, setChesses] = useState([]);
    const [isPending, setPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setPending(true);
        axios.get("https://chess.sulla.hu/chess")
            .then(response => {
                setChesses(response.data);
                setError(null);
            })
            .catch(err => {
                console.error("Hiba az adatok lekérésekor:", err);
                setError("Nem sikerült az adatokat betölteni. Kérjük, próbálja újra később.");
            })
            .finally(() => setPending(false));
    }, []);

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isPending ? (
                <div className="d-flex flex-column align-items-center">
                    <div className="spinner-border" role="status"></div>
                    <p>Adatok betöltése...</p>
                </div>
            ) : error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : (
                <div>
                    <h2>Sakkozók listája</h2>
                    <div className="d-flex flex-wrap justify-content-center">
                        {chesses.map((chess, index) => (
                            <div
                                className="card col-sm-3 m-1 p-2 d-flex flex-column align-items-center"
                                key={index}
                            >
                                <Link to={`/chess/${chess.id}`}>
                                    <img
                                        src={chess.image_url || "https://via.placeholder.com/400x800"}
                                        alt={chess.name || "Ismeretlen sakkozó"}
                                        className="img-fluid mb-2"
                                        style={{ width: "200px", height: "auto" }}
                                    />
                                </Link>
                                <p className="text-dark">
                                    <strong>Név:</strong> {chess.name || "N/A"}
                                </p>
                                <p className="text-dark">
                                    <strong>Születési év:</strong> {chess.birth_date || "N/A"}
                                </p>
                                <p className="text-dark">
                                    <strong>Világbajnokságok:</strong> {chess.world_ch_won || 0}
                                </p>
                                {chess.profile_url ? (
                                    <Link
                                        to={chess.profile_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-link"
                                    >
                                        Profil link
                                    </Link>
                                ) : (
                                    <p className="text-muted">Profil nem elérhető</p>
                                )}
                                
                                <div className="d-flex justify-content-around w-100 mt-2">
                                    <Link to={`/chessdel/${chess.id}`}>
                                        <i className="bi bi-trash-fill fs-4 text-danger" title="Törlés"></i>
                                    </Link>
                                    <Link to={`/chessmod/${chess.id}`}>
                                        <i className="bi bi-pencil-square fs-4 text-primary" title="Módosítás"></i>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
