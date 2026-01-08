import { useState } from "react";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import CricketEvent, { CricketScore } from "../../types/CricketEvent";
import "../LiveEventBoxes/LiveEventBox.css";
import TeamLogo from "../TeamLogo";

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
        onScoreUpdate(newScore);
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
                <div className="team-info">
                    <TeamLogo src={event.teams[0].logoUrl} name={event.teams[0].name} size={28} />
                    <h3 className="team-name-compact fjalla">{event.teams[0].name}</h3>
                </div>
                <div className="mini-score-grid">
                    <div className="input-with-label-mini">
                        <span className="mini-label">RUNS</span>
                        <input type="number" className="styledInput" value={score.teamA_runs} onChange={(e) => updateLocalScore("teamA_runs", Number(e.target.value))} />
                    </div>
                    <div className="input-with-label-mini">
                        <span className="mini-label">WKT</span>
                        <input type="number" className="styledInput" value={score.teamA_wickets} onChange={(e) => updateLocalScore("teamA_wickets", Number(e.target.value))} />
                    </div>
                    <div className="input-with-label-mini">
                        <span className="mini-label">OVR</span>
                        <input type="number" className="styledInput" step="0.1" value={score.teamA_overs} onChange={(e) => updateLocalScore("teamA_overs", Number(e.target.value))} />
                    </div>
                </div>
            </div>

            <div className="cricket-team-row-compact" style={{ marginTop: '10px' }}>
                <div className="team-info">
                    <TeamLogo src={event.teams[1].logoUrl} name={event.teams[1].name} size={28} />
                    <h3 className="team-name-compact fjalla">{event.teams[1].name}</h3>
                </div>
                <div className="mini-score-grid">
                    <div className="input-with-label-mini">
                        <span className="mini-label">RUNS</span>
                        <input type="number" className="styledInput" value={score.teamB_runs} onChange={(e) => updateLocalScore("teamB_runs", Number(e.target.value))} />
                    </div>
                    <div className="input-with-label-mini">
                        <span className="mini-label">WKT</span>
                        <input type="number" className="styledInput" value={score.teamB_wickets} onChange={(e) => updateLocalScore("teamB_wickets", Number(e.target.value))} />
                    </div>
                    <div className="input-with-label-mini">
                        <span className="mini-label">OVR</span>
                        <input type="number" className="styledInput" step="0.1" value={score.teamB_overs} onChange={(e) => updateLocalScore("teamB_overs", Number(e.target.value))} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditableCricketEventBox;
