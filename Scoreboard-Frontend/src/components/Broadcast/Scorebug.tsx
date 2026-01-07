import React from 'react';
import Event from '../../types/Event';
import CricketEvent from '../../types/CricketEvent';
import './Scorebug.css';

interface ScorebugProps {
    event: Event | null;
    variant?: 'desktop' | 'mobile';
    inHeader?: boolean;
}

const Scorebug: React.FC<ScorebugProps> = ({ event, variant = 'desktop', inHeader = false }) => {
    if (!event) return null;

    const isCricket = event.event.toLowerCase().includes('cricket');

    // Extract data
    const teamA = event.teams[0];
    const teamB = event.teams[1];

    // Score Logic
    let scoreA = '0';
    let scoreB = '0';
    let detailsA = '';
    let detailsB = '';

    if (isCricket) {
        const s = event.score as any;
        if (s && 'teamA_runs' in s) {
            scoreA = `${s.teamA_runs ?? 0}/${s.teamA_wickets ?? 0}`;
            scoreB = `${s.teamB_runs ?? 0}/${s.teamB_wickets ?? 0}`;
            detailsA = `(${s.teamA_overs ?? 0} ov)`;
            detailsB = `(${s.teamB_overs ?? 0} ov)`;
        }
    } else {
        const s = event.score as any;
        if (s && 'teamA_points' in s) {
            scoreA = s.teamA_points ?? 0;
            scoreB = s.teamB_points ?? 0;
        }
    }

    const getPhase = () => {
        const text = (event.subtitle + ' ' + event.title).toUpperCase();
        if (text.includes('FINAL')) {
            if (text.includes('SEMI')) return 'SEMI FINAL';
            if (text.includes('QUARTER')) return 'QUARTER FINAL';
            return 'GRAND FINAL';
        }
        return '';
    };

    const phase = getPhase();

    return (
        <div className={`scorebug-container ${variant} ${inHeader ? 'in-header' : ''}`}>
            <div className="scorebug-content">
                {/* Event Label (e.g. "LIVE | FINALS") */}
                <div className="sb-label">
                    <span className="sb-live-dot">●</span>
                    {event.event.toUpperCase()}
                    {phase && <span className={`sb-phase-tag ${phase.includes('GRAND') ? 'gold' : ''}`}>{phase}</span>}
                </div>

                {/* Team A */}
                <div className="sb-team team-left">
                    <span className="sb-team-name">{teamA?.name || 'TBA'}</span>
                    {teamA?.logoUrl && <img src={teamA.logoUrl} alt="" className="sb-logo" />}
                </div>

                {/* Scores */}
                <div className="sb-score-box">
                    <div className="sb-score-row">
                        <span className={`sb-score ${scoreA > scoreB ? 'leading' : ''}`}>{scoreA}</span>
                        {detailsA && <span className="sb-details">{detailsA}</span>}
                    </div>
                    <div className="sb-divider">-</div>
                    <div className="sb-score-row">
                        {detailsB && <span className="sb-details">{detailsB}</span>}
                        <span className={`sb-score ${scoreB > scoreA ? 'leading' : ''}`}>{scoreB}</span>
                    </div>
                </div>

                {/* Team B */}
                <div className="sb-team team-right">
                    {teamB?.logoUrl && <img src={teamB.logoUrl} alt="" className="sb-logo" />}
                    <span className="sb-team-name">{teamB?.name || 'TBA'}</span>
                </div>

                {/* Time/Status */}
                <div className="sb-timer">
                    {event.isCompleted ? 'FT' : 'LIVE'}
                </div>
            </div>

            {/* Bottom bar for match title */}
            <div className="sb-footer-bar">
                <div className="sb-match-title">{event.title}</div>
            </div>
        </div>
    );
};

export default Scorebug;
