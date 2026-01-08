import React, { useEffect, useState } from 'react';
import Event from '../types/Event';
import TeamLogo from './TeamLogo';
import './WinnerTreeOverlay.css';

interface Props {
    event: Event | null;
    onComplete: () => void;
}

const WinnerTreeOverlay: React.FC<Props> = ({ event, onComplete }) => {
    const [visible, setVisible] = useState(false);
    const [stage, setStage] = useState(0); // 0: init, 1: matchup, 2: lines, 3: winner

    useEffect(() => {
        if (event) {
            setVisible(true);
            setStage(1); // Start matchup

            // Sequence of animations
            const t1 = setTimeout(() => setStage(2), 1500); // Show lines
            const t2 = setTimeout(() => setStage(3), 2500); // Show winner

            const tExit = setTimeout(() => {
                setVisible(false);
                setStage(0);
                setTimeout(onComplete, 500);
            }, 8000);

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(tExit);
            };
        }
    }, [event, onComplete]);

    if (!event || !event.isCompleted || !event.teams || event.teams.length < 2) return null;
    if (!visible) return null;

    const winner = event.winner?.team;
    const teamA = event.teams[0];
    const teamB = event.teams[1];

    // Robust winner detection: handle both object and ID string
    const winnerId = typeof winner === 'string' ? winner : winner?._id;
    const isTeamAWinner = teamA._id === winnerId;

    const winnerObj = isTeamAWinner ? teamA : teamB;
    const loserObj = isTeamAWinner ? teamB : teamA;

    return (
        <div className={`winner-tree-overlay ${visible ? 'fade-in' : 'fade-out'}`}>
            <div className="tree-container">
                <h2 className="tree-title">MATCH RESULT</h2>

                <div className="bracket-structure">
                    {/* Matchup Level */}
                    <div className="bracket-level matchup">
                        <div className={`team-node loser ${stage >= 1 ? 'slide-in-left' : 'hidden'}`}>
                            <TeamLogo src={loserObj.logoUrl} name={loserObj.name} size={60} />
                            <span className="team-name">{loserObj.name}</span>
                        </div>

                        <div className="vs-connector">VS</div>

                        <div className={`team-node winner-candidate ${stage >= 1 ? 'slide-in-right' : 'hidden'}`}>
                            <TeamLogo src={winnerObj.logoUrl} name={winnerObj.name} size={60} />
                            <span className="team-name">{winnerObj.name}</span>
                        </div>
                    </div>

                    {/* Connector Lines */}
                    <svg className={`bracket-lines ${stage >= 2 ? 'draw-lines' : 'invisible'}`} width="400" height="100">
                        <path
                            d="M 100 0 L 100 50 L 300 50 L 300 0"
                            fill="transparent"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="3"
                        />
                        <line
                            x1="200" y1="50" x2="200" y2="100"
                            stroke="rgba(255,255,255,0.2)" strokeWidth="3"
                        />
                    </svg>

                    {/* Winner Level */}
                    <div className="bracket-level champion">
                        <div className={`team-node champion-node ${stage >= 3 ? 'pop-in' : 'hidden'}`}>
                            <div className="crown-icon">👑</div>
                            <TeamLogo src={winnerObj.logoUrl} name={winnerObj.name} size={100} />
                            <span className="team-name highlight">{winnerObj.name}</span>
                            <div className="win-badge">WINNER</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WinnerTreeOverlay;
