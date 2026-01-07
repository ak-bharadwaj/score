/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminController } from './../controllers/AdminController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ChessController } from './../controllers/ChessController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CricketController } from './../controllers/CricketController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EventController } from './../controllers/EventController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FootballController } from './../controllers/FootballController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ScheduleController } from './../controllers/ScheduleController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SquashMenController } from './../controllers/SquashMenController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SquashWomenController } from './../controllers/SquashWomenController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TeamControllers } from './../controllers/TeamController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TennisMenController } from './../controllers/TennisMenController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TennisWomenController } from './../controllers/TennisWomenController';
import type { RequestHandler, Router } from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserRole": {
        "dataType": "refEnum",
        "enums": ["Admin","ScoreEditor"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "username": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "role": {"ref":"UserRole","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeleteUserRequest": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccessTokenTypes": {
        "dataType": "refEnum",
        "enums": ["Basic","Bearer"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUserWithUsernameAndPasswordRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "username": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "role": {"ref":"UserRole","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HistoryItem_any_": {
        "dataType": "refObject",
        "properties": {
            "eventID": {"dataType":"string","required":true},
            "userName": {"dataType":"string","required":true},
            "prevScore": {"dataType":"any","required":true},
            "currentScore": {"dataType":"any","required":true},
            "timestamp": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginWithUsernameAndPasswordRequest": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Token": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccessTokenRequest": {
        "dataType": "refObject",
        "properties": {
            "refreshToken": {"ref":"Token","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LogoutRequest": {
        "dataType": "refObject",
        "properties": {
            "refreshToken": {"ref":"Token","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ChessScoreUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "teamA_points": {"dataType":"double","required":true},
            "teamB_points": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CricketScoreUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "teamA_runs": {"dataType":"double","required":true},
            "teamA_overs": {"dataType":"double","required":true},
            "teamA_wickets": {"dataType":"double","required":true},
            "teamB_runs": {"dataType":"double","required":true},
            "teamB_overs": {"dataType":"double","required":true},
            "teamB_wickets": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EventCatagories": {
        "dataType": "refEnum",
        "enums": ["Cricket","Football","Squash_men","Chess","Squash_women","Tennis_women","Tennis_men","Athletics","Basketball","Volleyball","Table Tennis","Badminton","Handball","Ball Badminton","Kabaddi","Throwball","Rugby"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FootballScore": {
        "dataType": "refObject",
        "properties": {
            "teamA_points": {"dataType":"double","required":true},
            "teamB_points": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Participant": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "team": {"dataType":"string","required":true},
            "distance": {"dataType":"double"},
            "time": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Winner": {
        "dataType": "refObject",
        "properties": {
            "team": {"dataType":"string"},
            "participants": {"dataType":"array","array":{"dataType":"refObject","ref":"Participant"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FootballEvent": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"string"},
            "subtitle": {"dataType":"string"},
            "title": {"dataType":"string","required":true},
            "event": {"ref":"EventCatagories","required":true},
            "isStarted": {"dataType":"boolean"},
            "startTime": {"dataType":"double","required":true},
            "endTime": {"dataType":"double","required":true},
            "score": {"ref":"FootballScore"},
            "isCompleted": {"dataType":"boolean"},
            "teams": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "participants": {"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Participant"}}},
            "winner": {"ref":"Winner"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ChessScore": {
        "dataType": "refObject",
        "properties": {
            "teamA_points": {"dataType":"double","required":true},
            "teamB_points": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ChessEvent": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"string"},
            "subtitle": {"dataType":"string"},
            "title": {"dataType":"string","required":true},
            "event": {"ref":"EventCatagories","required":true},
            "isStarted": {"dataType":"boolean"},
            "startTime": {"dataType":"double","required":true},
            "endTime": {"dataType":"double","required":true},
            "score": {"ref":"ChessScore"},
            "isCompleted": {"dataType":"boolean"},
            "teams": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "participants": {"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Participant"}}},
            "winner": {"ref":"Winner"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CricketScore": {
        "dataType": "refObject",
        "properties": {
            "teamA_runs": {"dataType":"double","required":true},
            "teamA_overs": {"dataType":"double","required":true},
            "teamA_wickets": {"dataType":"double","required":true},
            "teamB_runs": {"dataType":"double","required":true},
            "teamB_overs": {"dataType":"double","required":true},
            "teamB_wickets": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CricketEvent": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"string"},
            "subtitle": {"dataType":"string"},
            "title": {"dataType":"string","required":true},
            "event": {"ref":"EventCatagories","required":true},
            "isStarted": {"dataType":"boolean"},
            "startTime": {"dataType":"double","required":true},
            "endTime": {"dataType":"double","required":true},
            "score": {"ref":"CricketScore"},
            "isCompleted": {"dataType":"boolean"},
            "teams": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "participants": {"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Participant"}}},
            "winner": {"ref":"Winner"},
            "eventLink": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SquashMenScore": {
        "dataType": "refObject",
        "properties": {
            "teamA_points": {"dataType":"double","required":true},
            "teamB_points": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SquashMenEvent": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"string"},
            "subtitle": {"dataType":"string"},
            "title": {"dataType":"string","required":true},
            "event": {"ref":"EventCatagories","required":true},
            "isStarted": {"dataType":"boolean"},
            "startTime": {"dataType":"double","required":true},
            "endTime": {"dataType":"double","required":true},
            "score": {"ref":"SquashMenScore"},
            "isCompleted": {"dataType":"boolean"},
            "teams": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "participants": {"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Participant"}}},
            "winner": {"ref":"Winner"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SquashWomenScore": {
        "dataType": "refObject",
        "properties": {
            "teamA_points": {"dataType":"double","required":true},
            "teamB_points": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SquashWomenEvent": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"string"},
            "subtitle": {"dataType":"string"},
            "title": {"dataType":"string","required":true},
            "event": {"ref":"EventCatagories","required":true},
            "isStarted": {"dataType":"boolean"},
            "startTime": {"dataType":"double","required":true},
            "endTime": {"dataType":"double","required":true},
            "score": {"ref":"SquashWomenScore"},
            "isCompleted": {"dataType":"boolean"},
            "teams": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "participants": {"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Participant"}}},
            "winner": {"ref":"Winner"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MatchTypes": {
        "dataType": "refEnum",
        "enums": ["Doubles","Singles"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TennisMenScore": {
        "dataType": "refObject",
        "properties": {
            "teamA_points": {"dataType":"double","required":true},
            "teamB_points": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TennisMenEvent": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"string"},
            "subtitle": {"dataType":"string"},
            "title": {"dataType":"string","required":true},
            "event": {"ref":"EventCatagories","required":true},
            "isStarted": {"dataType":"boolean"},
            "startTime": {"dataType":"double","required":true},
            "endTime": {"dataType":"double","required":true},
            "score": {"ref":"TennisMenScore"},
            "isCompleted": {"dataType":"boolean"},
            "teams": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "participants": {"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Participant"}}},
            "winner": {"ref":"Winner"},
            "matchType": {"ref":"MatchTypes","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TennisWomenScore": {
        "dataType": "refObject",
        "properties": {
            "teamA_points": {"dataType":"double","required":true},
            "teamB_points": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TennisWomenEvent": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"string"},
            "subtitle": {"dataType":"string"},
            "title": {"dataType":"string","required":true},
            "event": {"ref":"EventCatagories","required":true},
            "isStarted": {"dataType":"boolean"},
            "startTime": {"dataType":"double","required":true},
            "endTime": {"dataType":"double","required":true},
            "score": {"ref":"TennisWomenScore"},
            "isCompleted": {"dataType":"boolean"},
            "teams": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "participants": {"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Participant"}}},
            "winner": {"ref":"Winner"},
            "matchType": {"ref":"MatchTypes","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AthleticsEventTypes": {
        "dataType": "refEnum",
        "enums": ["5000m (M)","1500m (M)","1500m (W)","800m (M)","800m (W)","400m (M)","400m (W)","200m (M)","200m (W)","100m (M)","100m (W)","4x100m (M)","4x100m (W)","4x400m (M)","4x400m (W)","110m Hurdles (M)","400m Hurdles (M)","Hammer Throw (M)","Discus Throw (M)","Discus Throw (W)","Pole Vault (M)","Shot Put (M)","Shot Put (W)","Triple Jump (M)","Javelin Throw (M)","Javelin Throw (W)","High Jump (M)","High Jump (W)","Long Jump (M)","Long Jump (W)"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AthleticsEventScore": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AthleticsEvent": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"string"},
            "subtitle": {"dataType":"string"},
            "title": {"dataType":"string","required":true},
            "event": {"ref":"EventCatagories","required":true},
            "isStarted": {"dataType":"boolean"},
            "startTime": {"dataType":"double","required":true},
            "endTime": {"dataType":"double","required":true},
            "score": {"ref":"AthleticsEventScore"},
            "isCompleted": {"dataType":"boolean"},
            "teams": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "participants": {"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Participant"}}},
            "winner": {"ref":"Winner"},
            "athleticsEventType": {"ref":"AthleticsEventTypes","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AllEvents": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"FootballEvent"},{"ref":"ChessEvent"},{"ref":"CricketEvent"},{"ref":"SquashMenEvent"},{"ref":"SquashWomenEvent"},{"ref":"TennisMenEvent"},{"ref":"TennisWomenEvent"},{"ref":"AthleticsEvent"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AllScores": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"FootballScore"},{"ref":"ChessScore"},{"ref":"CricketScore"},{"ref":"SquashMenScore"},{"ref":"SquashWomenScore"},{"ref":"TennisMenScore"},{"ref":"TennisWomenScore"},{"ref":"AthleticsEventScore"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FootballScoreUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "teamA_score": {"dataType":"double","required":true},
            "teamB_score": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FlattenMaps_T_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Document_any.any.any_": {
        "dataType": "refAlias",
        "type": {"ref":"FlattenMaps_T_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Required_any_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateExistingEventsRequest": {
        "dataType": "refObject",
        "properties": {
            "events": {"dataType":"array","array":{"dataType":"refAlias","ref":"AllEvents"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SquashMenScoreUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "teamA_points": {"dataType":"double","required":true},
            "teamB_points": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SquashWomenScoreUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "teamA_points": {"dataType":"double","required":true},
            "teamB_points": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Team": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"string"},
            "name": {"dataType":"string","required":true},
            "medals": {"dataType":"nestedObjectLiteral","nestedProperties":{"bronze":{"dataType":"double","required":true},"silver":{"dataType":"double","required":true},"gold":{"dataType":"double","required":true}},"required":true},
            "points": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateTeamRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TennisMenScoreUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "teamA_points": {"dataType":"double","required":true},
            "teamB_points": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TennisWomenScoreUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "teamA_points": {"dataType":"double","required":true},
            "teamB_points": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/api/admin/users',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getUsers)),

            function AdminController_getUsers(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.getUsers.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/admin/user',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.deleteUser)),

            function AdminController_deleteUser(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"ref":"DeleteUserRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.deleteUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/createUserWithUsernameAndPassword',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.createUserWithUsernameAndPassword)),

            function AdminController_createUserWithUsernameAndPassword(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"ref":"CreateUserWithUsernameAndPasswordRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.createUserWithUsernameAndPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/logs',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getScoreChangeLogs)),

            function AdminController_getScoreChangeLogs(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AdminController();


              const promise = controller.getScoreChangeLogs.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/loginWithUsernameAndPassword',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.loginWithUsernameAndPassword)),

            function AuthController_loginWithUsernameAndPassword(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"ref":"LoginWithUsernameAndPasswordRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.loginWithUsernameAndPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/accessToken',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.accessToken)),

            function AuthController_accessToken(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"ref":"AccessTokenRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.accessToken.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/auth/logout',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.logout)),

            function AuthController_logout(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"ref":"LogoutRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.logout.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/events/chess/:id',
            ...(fetchMiddlewares<RequestHandler>(ChessController)),
            ...(fetchMiddlewares<RequestHandler>(ChessController.prototype.updateScore)),

            function ChessController_updateScore(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    score: {"in":"body","name":"score","required":true,"ref":"ChessScoreUpdateRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ChessController();


              const promise = controller.updateScore.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/events/cricket/:id',
            ...(fetchMiddlewares<RequestHandler>(CricketController)),
            ...(fetchMiddlewares<RequestHandler>(CricketController.prototype.updateScore)),

            function CricketController_updateScore(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    score: {"in":"body","name":"score","required":true,"ref":"CricketScoreUpdateRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CricketController();


              const promise = controller.updateScore.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/events/toggleLive/:id',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.toggleLive)),

            function EventController_toggleLive(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EventController();


              const promise = controller.toggleLive.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/events',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.getAllEvents)),

            function EventController_getAllEvents(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EventController();


              const promise = controller.getAllEvents.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/events/:id',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.getEventById)),

            function EventController_getEventById(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EventController();


              const promise = controller.getEventById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/events/updateScore/:id',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.updateScore)),

            function EventController_updateScore(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    score: {"in":"body","name":"score","required":true,"ref":"AllScores"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EventController();


              const promise = controller.updateScore.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/events/:id/winner',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.setWinner)),

            function EventController_setWinner(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    winner: {"in":"body","name":"winner","required":true,"ref":"Winner"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EventController();


              const promise = controller.setWinner.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/events/football/:id',
            ...(fetchMiddlewares<RequestHandler>(FootballController)),
            ...(fetchMiddlewares<RequestHandler>(FootballController.prototype.updateScore)),

            function FootballController_updateScore(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    score: {"in":"body","name":"score","required":true,"ref":"FootballScoreUpdateRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FootballController();


              const promise = controller.updateScore.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/schedule',
            ...(fetchMiddlewares<RequestHandler>(ScheduleController)),
            ...(fetchMiddlewares<RequestHandler>(ScheduleController.prototype.getNotCompletedEvents)),

            function ScheduleController_getNotCompletedEvents(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ScheduleController();


              const promise = controller.getNotCompletedEvents.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/admin/schedule',
            ...(fetchMiddlewares<RequestHandler>(ScheduleController)),
            ...(fetchMiddlewares<RequestHandler>(ScheduleController.prototype.updateExistingEvents)),

            function ScheduleController_updateExistingEvents(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"ref":"UpdateExistingEventsRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ScheduleController();


              const promise = controller.updateExistingEvents.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/events/squashmen/:id',
            ...(fetchMiddlewares<RequestHandler>(SquashMenController)),
            ...(fetchMiddlewares<RequestHandler>(SquashMenController.prototype.updateScore)),

            function SquashMenController_updateScore(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    score: {"in":"body","name":"score","required":true,"ref":"SquashMenScoreUpdateRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SquashMenController();


              const promise = controller.updateScore.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/events/squashwomen/:id',
            ...(fetchMiddlewares<RequestHandler>(SquashWomenController)),
            ...(fetchMiddlewares<RequestHandler>(SquashWomenController.prototype.updateScore)),

            function SquashWomenController_updateScore(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    score: {"in":"body","name":"score","required":true,"ref":"SquashWomenScoreUpdateRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SquashWomenController();


              const promise = controller.updateScore.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/teams',
            ...(fetchMiddlewares<RequestHandler>(TeamControllers)),
            ...(fetchMiddlewares<RequestHandler>(TeamControllers.prototype.getAllTeams)),

            function TeamControllers_getAllTeams(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TeamControllers();


              const promise = controller.getAllTeams.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/teams/:name',
            ...(fetchMiddlewares<RequestHandler>(TeamControllers)),
            ...(fetchMiddlewares<RequestHandler>(TeamControllers.prototype.getTeamByName)),

            function TeamControllers_getTeamByName(request: any, response: any, next: any) {
            const args = {
                    name: {"in":"path","name":"name","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TeamControllers();


              const promise = controller.getTeamByName.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/teams',
            ...(fetchMiddlewares<RequestHandler>(TeamControllers)),
            ...(fetchMiddlewares<RequestHandler>(TeamControllers.prototype.addTeam)),

            function TeamControllers_addTeam(request: any, response: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"ref":"CreateTeamRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TeamControllers();


              const promise = controller.addTeam.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/admin/teams/:id',
            ...(fetchMiddlewares<RequestHandler>(TeamControllers)),
            ...(fetchMiddlewares<RequestHandler>(TeamControllers.prototype.deleteTeam)),

            function TeamControllers_deleteTeam(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TeamControllers();


              const promise = controller.deleteTeam.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/admin/teams/:name/:medal',
            ...(fetchMiddlewares<RequestHandler>(TeamControllers)),
            ...(fetchMiddlewares<RequestHandler>(TeamControllers.prototype.addMedal)),

            function TeamControllers_addMedal(request: any, response: any, next: any) {
            const args = {
                    medal: {"in":"path","name":"medal","required":true,"dataType":"string"},
                    name: {"in":"path","name":"name","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TeamControllers();


              const promise = controller.addMedal.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/events/tennismen/:id',
            ...(fetchMiddlewares<RequestHandler>(TennisMenController)),
            ...(fetchMiddlewares<RequestHandler>(TennisMenController.prototype.updateScore)),

            function TennisMenController_updateScore(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    score: {"in":"body","name":"score","required":true,"ref":"TennisMenScoreUpdateRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TennisMenController();


              const promise = controller.updateScore.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/events/tenniswomen/:id',
            ...(fetchMiddlewares<RequestHandler>(TennisWomenController)),
            ...(fetchMiddlewares<RequestHandler>(TennisWomenController.prototype.updateScore)),

            function TennisWomenController_updateScore(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    score: {"in":"body","name":"score","required":true,"ref":"TennisWomenScoreUpdateRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new TennisWomenController();


              const promise = controller.updateScore.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
