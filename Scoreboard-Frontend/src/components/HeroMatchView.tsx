import React from 'react';
import Event from '../types/Event';
import EventCatagories from '../types/EventCategories';
import './HeroMatchView.css'; // We will create this

interface HeroMatchViewProps {
    event: Event;
}

const HeroMatchView: React.FC<HeroMatchViewProps> = ({ event }) => {
    // Helper to determine gender from event name
    const getGender = () => {
        const e = event.event.toLowerCase();
        if (e.includes('women')) return 'WOMENS';
        if (e.includes('_men') || e.includes(' men')) return 'MENS';
        return '';
    };

    // Helper to determine game type (League/Final)
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

    const gender = getGender();
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
        <div className={`hero-match-card ${isLive ? 'live-glow' : ''}`}>
            <div className="hero-header">
                <div className="hero-sport-badge-container">
                    <div className="hero-sport-badge">
                        {gender && <span className="hero-gender-tag">{gender}</span>}
                        <span className="hero-sport">{event.event.split('_')[0]}</span>
                    </div>
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
                {/* TOP ROW: LOGOS AND NAMES */}
                <div className="hero-teams-top-row">
                    <div className="hero-team-block team-a">
                        <div className="hero-logo-wrapper big">
                            {event.teams[0]?.logoUrl ? (
                                <img src={event.teams[0].logoUrl} alt={event.teams[0].name} className="hero-big-logo" />
                            ) : (
                                <div className="hero-logo-placeholder">{event.teams[0]?.name?.[0] || '?'}</div>
                            )}
                        </div>
                        <div className="hero-team-name-big fjalla">{event.teams[0]?.name || 'TBA'}</div>
                    </div>

                    <div className="hero-vs-divider-big fjalla">VS</div>

                    <div className="hero-team-block team-b">
                        <div className="hero-logo-wrapper big">
                            {event.teams[1]?.logoUrl ? (
                                <img src={event.teams[1].logoUrl} alt={event.teams[1].name} className="hero-big-logo" />
                            ) : (
                                <div className="hero-logo-placeholder">{event.teams[1]?.name?.[0] || '?'}</div>
                            )}
                        </div>
                        <div className="hero-team-name-big fjalla">{event.teams[1]?.name || 'TBA'}</div>
                    </div>
                </div>

                {/* BOTTOM ROW: FITTED SCORES */}
                <div className="hero-scores-bottom-row">
                    {renderScore()}
                </div>
            </div>

            <div className="hero-event-details">
                <div className="hero-match-title">{event.title}</div>
                {event.isCompleted && (
                    <div className={`hero-winner-tag ${gameType.includes('FINAL') ? 'is-final' : ''}`}>
                        WINNER: <span className="winner-name">{event.winner?.team?.name || 'TBA'}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroMatchView;
