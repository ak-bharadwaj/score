import React, { useMemo } from 'react';
import Event from '../types/Event';
import { Team } from '../types/Team';
import './PointsTable.css'; // We will create this

interface PointsTableProps {
    events: Event[];
    teams: Team[];
}

interface TeamStats {
    team: Team;
    played: number;
    won: number;
    lost: number;
    draw: number;
    points: number;
}

const PointsTable: React.FC<PointsTableProps> = ({ events, teams }) => {

    const stats = useMemo(() => {
        const statsMap = new Map<string, TeamStats>();

        // Initialize stats for all known teams
        teams.forEach(t => {
            statsMap.set(t._id!, {
                team: t,
                played: 0,
                won: 0,
                lost: 0,
                draw: 0,
                points: 0
            });
        });

        // Process completed events
        events.forEach(event => {
            if (!event.isCompleted || !event.isStarted) return;

            // Check if it's a team sport (has 2 teams usually)
            if (event.teams && event.teams.length === 2) {
                const teamA = event.teams[0];
                const teamB = event.teams[1];

                const statsA = statsMap.get(teamA._id!) || { team: teamA, played: 0, won: 0, lost: 0, draw: 0, points: 0 };
                const statsB = statsMap.get(teamB._id!) || { team: teamB, played: 0, won: 0, lost: 0, draw: 0, points: 0 };

                statsA.played++;
                statsB.played++;

                if (event.winner) {
                    if (event.winner.team._id === teamA._id) {
                        statsA.won++;
                        statsA.points += 3; // Assuming 3 points for win
                        statsB.lost++;
                    } else if (event.winner.team._id === teamB._id) {
                        statsB.won++;
                        statsB.points += 3;
                        statsA.lost++;
                    }
                } else {
                    // Draw
                    statsA.draw++;
                    statsA.points += 1; // Assuming 1 point for draw
                    statsB.draw++;
                    statsB.points += 1;
                }

                statsMap.set(teamA._id!, statsA);
                statsMap.set(teamB._id!, statsB);
            }
        });

        // Convert to array and sort
        return Array.from(statsMap.values()).sort((a, b) => b.points - a.points);
    }, [events, teams]);

    const maxPoints = useMemo(() => {
        if (stats.length === 0) return 10;
        return Math.max(...stats.map(s => s.points)) || 10;
    }, [stats]);

    return (
        <div className="points-table-container">
            <h3 className="section-header">STANDINGS</h3>
            <div className="points-table">
                <div className="points-header">
                    <span className="col-rank">#</span>
                    <span className="col-team">TEAM</span>
                    <span className="col-stat">P</span>
                    <span className="col-stat">W</span>
                    <span className="col-stat">L</span>
                    <span className="col-stat">D</span>
                    <span className="col-pts">PTS</span>
                </div>
                {stats.map((stat, index) => (
                    <div className="points-row-wrapper" key={stat.team._id}>
                        <div
                            className="points-bar"
                            style={{
                                width: `${(stat.points / maxPoints) * 100}%`,
                                transitionDelay: `${index * 0.05}s`
                            }}
                        ></div>
                        <div className="points-row" style={{ animationDelay: `${index * 0.1}s` }}>
                            <span className="col-rank">{index + 1}</span>
                            <span className="col-team">{stat.team.name}</span>
                            <span className="col-stat">{stat.played}</span>
                            <span className="col-stat win">{stat.won}</span>
                            <span className="col-stat loss">{stat.lost}</span>
                            <span className="col-stat">{stat.draw}</span>
                            <span className="col-pts">{stat.points}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PointsTable;
