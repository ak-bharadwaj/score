import Event from '../types/Event';
import CricketEvent from '../types/CricketEvent';

export interface Milestone {
    type: 'cricket_50' | 'cricket_100' | 'football_goal' | 'generic_win';
    message: string;
    subMessage?: string;
    eventID: string;
}

// Keep track of previous scores to detect changes
const scoreHistory: Map<string, any> = new Map();

export const detectMilestones = (event: Event): Milestone | null => {
    const id = event._id || 'unknown';
    const prevScore = scoreHistory.get(id);
    const currentScore = event.score as any;

    if (!currentScore) return null;

    // Update history
    scoreHistory.set(id, JSON.parse(JSON.stringify(currentScore)));

    if (!prevScore) return null; // First load, no milestones

    const eventName = event.event ? event.event.toLowerCase() : '';
    const isCricket = eventName.includes('cricket');
    const isFootball = eventName.includes('football') || eventName.includes('futsal');

    if (isCricket) {
        const runsA = currentScore.teamA_runs || 0;
        const prevRunsA = prevScore.teamA_runs || 0;

        if (Math.floor(runsA / 50) > Math.floor(prevRunsA / 50)) {
            return {
                type: 'cricket_50',
                message: `${event.teams[0].name} Reach ${Math.floor(runsA / 50) * 50}!`,
                subMessage: `Score: ${runsA}/${currentScore.teamA_wickets}`,
                eventID: id
            };
        }

        const runsB = currentScore.teamB_runs || 0;
        const prevRunsB = prevScore.teamB_runs || 0;
        if (Math.floor(runsB / 50) > Math.floor(prevRunsB / 50)) {
            return {
                type: 'cricket_50',
                message: `${event.teams[1].name} Reach ${Math.floor(runsB / 50) * 50}!`,
                subMessage: `Score: ${runsB}/${currentScore.teamB_wickets}`,
                eventID: id
            };
        }
    }

    if (isFootball) {
        const goalsA = currentScore.teamA_points || 0;
        const prevGoalsA = prevScore.teamA_points || 0;
        if (goalsA > prevGoalsA) {
            return {
                type: 'football_goal',
                message: 'GOAL!',
                subMessage: `${event.teams[0].name} scores!`,
                eventID: id
            };
        }

        const goalsB = currentScore.teamB_points || 0;
        const prevGoalsB = prevScore.teamB_points || 0;
        if (goalsB > prevGoalsB) {
            return {
                type: 'football_goal',
                message: 'GOAL!',
                subMessage: `${event.teams[1].name} scores!`,
                eventID: id
            };
        }
    }

    return null;
};
