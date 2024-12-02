import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const ChessMod = () => {
    const params = useParams();
    const id = params.chessId;
    const navigate = useNavigate();
    const [chess, setChess] = useState({
        name: "",
        birth_date: "",
        world_ch_won: "",
        profile_url: "",
        image_url: "",
    });

    useEffect(() => {
        const fetchChess = async () => {
            try {
                const response = await axios.get(`https://chess.sulla.hu/chess/${id}`);
                setChess(response.data);
            } catch (error) {
                console.error("Hiba a fetch-elésben:", error);
            }
        };
        fetchChess();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setChess((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`https://chess.sulla.hu/chess/${id}`, chess);
            navigate("/");
        } catch (error) {
            console.error("Hiba a sakk adatok frissítésében:", error);
        }
    };

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Sakkozó neve:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={chess.name}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Születési éve:</label>
                    <div className="col-sm-9">
                        <input
                            type="number"
                            name="birth_date"
                            className="form-control"
                            value={chess.birth_date}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Nyert világbajnokságai:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="world_ch_won"
                            className="form-control"
                            value={chess.world_ch_won}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Profil URL-je:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="profile_url"
                            className="form-control"
                            value={chess.profile_url}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="image_url"
                            className="form-control"
                            value={chess.image_url}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-success">
                    Küldés
                </button>
            </form>
        </div>
    );
};
