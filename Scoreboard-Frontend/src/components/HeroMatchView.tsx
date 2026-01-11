import React from 'react';
import Event from '../types/Event';
import EventCatagories, { getEventGender } from '../types/EventCategories';
import TeamLogo from './TeamLogo';
import './HeroMatchView.css'; // We will create this
import VoteWidget from './VoteWidget';

interface HeroMatchViewProps {
    event: Event;
}

const HeroMatchView: React.FC<HeroMatchViewProps> = ({ event }) => {
    const gender = getEventGender(event);

    const getGameType = () => {
        const text = (event.subtitle + ' ' + event.title).toUpperCase();
        if (text.includes('FINAL')) {
            if (text.includes('SEMI')) return 'SEMI FINAL';
            if (text.includes('QUARTER')) return 'QUARTER FINAL';
            return 'GRAND FINAL';
        }
        if (text.includes('LEAGUE')) return 'LEAGUE';
        if (text.includes('POOL')) return 'POOL MATCH';
        return event.subtitle || 'MATCH';
    };

    const gameType = getGameType();

    // Helper to extract score safely based on event type
    const renderScore = () => {
        if (!event || !event.score) return <div className="hero-score-value massive fjalla">- : -</div>;
        if (!event.isStarted && !event.isCompleted) return <div className="hero-score-value massive fjalla">- : -</div>;

        const s = event.score as any;

        // CRICKET Specialized Layout
        if (event.event === EventCatagories.CRICKET || 'teamA_runs' in s) {
            return (
                <div className="hero-dedicated-score cricket">
                    <div className="hero-score-group">
                        <div className="hero-score-main">
                            <span className="hero-runs">{s.teamA_runs ?? 0}</span>
                            <span className="hero-slash">/</span>
                            <span className="hero-wickets">{s.teamA_wickets ?? 0}</span>
                        </div>
                        <div className="hero-score-sub">({s.teamA_overs ?? 0} ov)</div>
                    </div>
                    <div className="hero-score-divider-vertical"></div>
                    <div className="hero-score-group">
                        <div className="hero-score-main">
                            <span className="hero-runs">{s.teamB_runs ?? 0}</span>
                            <span className="hero-slash">/</span>
                            <span className="hero-wickets">{s.teamB_wickets ?? 0}</span>
                        </div>
                        <div className="hero-score-sub">({s.teamB_overs ?? 0} ov)</div>
                    </div>
                </div>
            );
        }

        // DEFAULT / FOOTBALL Layout
        return (
            <div className="hero-dedicated-score generic">
                <div className="hero-score-value massive fjalla">{s.teamA_points ?? 0}</div>
                <div className="hero-score-separator-line"></div>
                <div className="hero-score-value massive fjalla">{s.teamB_points ?? 0}</div>
            </div>
        );
    };

    const isLive = event.isStarted && !event.isCompleted;

    return (
        <div className={`hero-match-card ${gender} ${isLive ? 'live-glow' : ''}`}>
            <div className="hero-header">
                {/* Repurposed header for Game Type only */}
                <div className="hero-sport-badge-container">
                    <div className={`hero-gametype-tag ${gameType.includes('FINAL') ? 'is-final' : ''}`}>
                        {gameType}
                    </div>
                </div>
                {isLive && <div className="hero-live-indicator">
                    <span className="live-dot"></span>
                    LIVE
                </div>}
            </div>

            <div className="hero-main-content vertical-stack">
                <div className="hero-sport-display-big">
                    {(event.event || "").split('_')[0].toUpperCase()}
                    {gender !== "unknown" && <span className="hero-gender-small">{gender === "men" ? "MEN" : "WOMEN"}</span>}
                </div>
                <div className="hero-match-title">{event.title}</div>

                {/* TOP ROW: LOGOS AND NAMES */}
                <div className="hero-teams-top-row">
                    <div className="hero-team-block team-a">
                        <TeamLogo src={event.teams[0]?.logoUrl} name={event.teams[0]?.name || ""} size={110} className="hero-big-logo" />
                        <div className="hero-team-name-big fjalla">{event.teams[0]?.name || 'TBA'}</div>
                    </div>

                    <div className="hero-vs-divider-big fjalla">VS</div>

                    <div className="hero-team-block team-b">
                        <TeamLogo src={event.teams[1]?.logoUrl} name={event.teams[1]?.name || ""} size={110} className="hero-big-logo" />
                        <div className="hero-team-name-big fjalla">{event.teams[1]?.name || 'TBA'}</div>
                    </div>
                </div>

                {/* BOTTOM ROW: FITTED SCORES */}
                <div className="hero-scores-bottom-row">
                    {renderScore()}
                </div>

                {isLive && <VoteWidget event={event} />}
            </div>

            <div className="hero-event-details">
                {event.isCompleted && (
                    <div className={`hero-winner-tag ${gameType.includes('FINAL') ? 'is-final' : ''}`}>
                        WINNER:
                        <span style={{ margin: '0 8px', display: 'flex', alignItems: 'center' }}>
                            <TeamLogo src={event.winner?.team?.logoUrl} name={event.winner?.team?.name || ""} size={24} />
                        </span>
                        <span className="winner-name">{event.winner?.team?.name || 'TBA'}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroMatchView;
