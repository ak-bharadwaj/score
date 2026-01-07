import { useContext, useState } from "react";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import CricketEvent, { CricketScore } from "../../types/CricketEvent";
import "../LiveEventBoxes/LiveEventBox.css";

const EditableCricketEventBox = ({
    event,
    onScoreUpdate,
}: {
    event: CricketEvent;
    onScoreUpdate: (score: CricketScore) => void;
}) => {
    const [score, setScore] = useState<CricketScore>(event.score);

    const updateLocalScore = (field: keyof CricketScore, value: number) => {
        const newScore = { ...score, [field]: value };
        setScore(newScore);
    };

    const saveScore = () => {
        onScoreUpdate(score);
    };

    return (
        <div className="liveEventBox cricket">
            <span className="eventCategory">
                <SportsCricketIcon />
                Cricket
            </span>
            <div className="event-header-compact">
                <h3 className="fjalla">{event.title}</h3>
                <p>{event.subtitle}</p>
            </div>

            <div className="cricket-team-row-compact">
                <h3 className="fjalla">{event.teams[0].name}</h3>
                <div className="mini-score-grid">
                    <div className="input-with-label-mini">
                        <span className="mini-label">RUNS</span>
                        <input type="number" className="styledInput" style={{ width: "60px" }} value={score.teamA_runs} onChange={(e) => updateLocalScore("teamA_runs", Number(e.target.value))} />
                    </div>
                    <div className="input-with-label-mini">
                        <span className="mini-label">WKT</span>
                        <input type="number" className="styledInput" style={{ width: "50px" }} value={score.teamA_wickets} onChange={(e) => updateLocalScore("teamA_wickets", Number(e.target.value))} />
                    </div>
                    <div className="input-with-label-mini">
                        <span className="mini-label">OVR</span>
                        <input type="number" className="styledInput" style={{ width: "55px" }} step="0.1" value={score.teamA_overs} onChange={(e) => updateLocalScore("teamA_overs", Number(e.target.value))} />
                    </div>
                </div>
            </div>

            <div className="cricket-team-row-compact">
                <h3 className="fjalla">{event.teams[1].name}</h3>
                <div className="mini-score-grid">
                    <div className="input-with-label-mini">
                        <span className="mini-label">RUNS</span>
                        <input type="number" className="styledInput" style={{ width: "60px" }} value={score.teamB_runs} onChange={(e) => updateLocalScore("teamB_runs", Number(e.target.value))} />
                    </div>
                    <div className="input-with-label-mini">
                        <span className="mini-label">WKT</span>
                        <input type="number" className="styledInput" style={{ width: "50px" }} value={score.teamB_wickets} onChange={(e) => updateLocalScore("teamB_wickets", Number(e.target.value))} />
                    </div>
                    <div className="input-with-label-mini">
                        <span className="mini-label">OVR</span>
                        <input type="number" className="styledInput" style={{ width: "55px" }} step="0.1" value={score.teamB_overs} onChange={(e) => updateLocalScore("teamB_overs", Number(e.target.value))} />
                    </div>
                </div>
            </div>

            <button className="styledButton" onClick={saveScore} style={{ width: '100%', marginTop: '10px', height: '40px', fontSize: '1rem', background: '#04aa6d', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '800', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(4, 170, 109, 0.2)' }}>UPDATE SCOREBOARD</button>
        </div>
    );
};

export default EditableCricketEventBox;
