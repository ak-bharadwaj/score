import React, { useState, useEffect } from 'react';
import Event from '../types/Event';
import API from '../Utilities/ApiEndpoints';
import { socket } from '../Utilities/Socket';
import TeamLogo from './TeamLogo';
import './VoteWidget.css';

interface VoteWidgetProps {
    event: Event;
}

const VoteWidget = ({ event }: VoteWidgetProps) => {
    const [votes, setVotes] = useState(event.votes || { teamA: 0, teamB: 0 });
    const [myVote, setMyVote] = useState<'A' | 'B' | null>(() => {
        if (!event._id) return null;
        try {
            return localStorage.getItem(`voted_${event._id}`) as 'A' | 'B' | null;
        } catch { return null; }
    });

    useEffect(() => {
        setVotes(event.votes || { teamA: 0, teamB: 0 });
        // Sync myVote from localStorage when event changes
        if (event._id) {
            const saved = localStorage.getItem(`voted_${event._id}`) as 'A' | 'B' | null;
            setMyVote(saved);
        }
    }, [event._id, event.votes]);

    useEffect(() => {
        if (!event._id) return;

        socket.emit("subscribe", event._id);

        const handler = (data: string) => {
            try {
                setVotes(JSON.parse(data));
            } catch (e) {
                console.error("Failed to parse vote update", e);
            }
        };
        socket.on(`voteUpdate/${event._id}`, handler);

        return () => {
            socket.emit("unsubscribe", event._id);
            socket.off(`voteUpdate/${event._id}`, handler);
        }
    }, [event._id]);

    const handleVote = async (team: 'A' | 'B') => {
        if (!event._id) return;

        if (myVote === team) {
            // Unvote
            setMyVote(null);
            localStorage.removeItem(`voted_${event._id}`);
            await API.Vote(event._id, team, 'remove');
        } else {
            // Vote (switch or new)
            if (myVote) {
                // Switching: remove old first asynchronously
                API.Vote(event._id, myVote, 'remove');
            }
            setMyVote(team);
            localStorage.setItem(`voted_${event._id}`, team);
            await API.Vote(event._id, team, 'add');
        }
    }

    const total = (votes.teamA || 0) + (votes.teamB || 0);
    const percentA = total === 0 ? 50 : ((votes.teamA || 0) / total) * 100;

    return (
        <div className="vote-widget-container">
            {/* Mobile: Tap to vote */}
            <div className="vote-mobile-row">
                <button
                    className={`vote-btn left ${myVote === 'A' ? 'active' : ''}`}
                    onClick={() => handleVote('A')}
                >
                    <div className="vote-logo-wrap">
                        <TeamLogo src={event.teams?.[0]?.logoUrl} name={event.teams?.[0]?.name || "Team A"} size={32} />
                        {myVote === 'A' && <div className="vote-check">✔</div>}
                    </div>
                    <span className="vote-label-mob">VOTE</span>
                </button>

                <div className="vote-center-text">
                    <span className="vc-label">WINNER?</span>
                    <span className="vc-count">{total} Votes</span>
                </div>

                <button
                    className={`vote-btn right ${myVote === 'B' ? 'active' : ''}`}
                    onClick={() => handleVote('B')}
                >
                    <div className="vote-logo-wrap">
                        <TeamLogo src={event.teams?.[1]?.logoUrl} name={event.teams?.[1]?.name || "Team B"} size={32} />
                        {myVote === 'B' && <div className="vote-check">✔</div>}
                    </div>
                    <span className="vote-label-mob">VOTE</span>
                </button>
            </div>

            {/* Desktop/Result Bar */}
            <div className="vote-bar-row">
                <div className="vote-bar-track">
                    <div
                        className="vote-bar-fill"
                        style={{ width: `${percentA}%` }}
                    ></div>
                    <div className="vote-bar-text left">{Math.round(percentA)}%</div>
                    <div className="vote-bar-text right">{Math.round(100 - percentA)}%</div>
                </div>
            </div>
        </div>
    );
};

export default VoteWidget;
