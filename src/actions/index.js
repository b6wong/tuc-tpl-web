import { resetSession, setTrackStatsMode, setViewResultsMode, setMaintainMode, setProvidedInstructions } from './session';
import { fetchGames, fetchTeams } from './league';
import { setGameTeam, resetGameStats, resetGameStore, fetchGameTeamEvents, toggleEditPlayerMode, moveSubToTrack, tapPlayerButton, setEventType, toggleScoreboard, undoEvent, submitEvents } from './game';
import { exitStatsMode, setStatsWeek } from './stats';

export {
    // Session
    resetSession,
    setTrackStatsMode, 
    setViewResultsMode,
    setMaintainMode,
    setProvidedInstructions,

    // League
    // setting the leagueid should be here -- but we are hard coding for now
    fetchGames,
    fetchTeams,

    // Game
    setGameTeam,
    resetGameStats,
    resetGameStore,
    fetchGameTeamEvents,
    toggleEditPlayerMode,
    moveSubToTrack,
    tapPlayerButton,
    setEventType,
    toggleScoreboard,
    undoEvent,
    submitEvents,

    // Stats
    exitStatsMode,
    setStatsWeek
};
