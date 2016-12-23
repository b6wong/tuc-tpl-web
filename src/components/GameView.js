import React from 'react';
import { observer, inject } from 'mobx-react';
import {Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
//import * as actions from '../actions/index';
import SelectSub from './SelectSub';


@inject('gameStore') @observer
class GameView extends React.Component {

  handleTapPlayer(playerId) {
    console.log("tapped on playerid: " + playerId);
  }

  handleTapEvent(event) {
    console.log(event);
  }

  render() {
    
    const { gameStore } = this.props;

    const gameEvents = gameStore.getEventsList().slice(-5);

    return (
      <Grid fluid={true}>
        
        <ShowEventsLog isEditPlayerMode={gameStore.isEditPlayerMode} gameEvents={gameEvents} />

        <ShowEventButtons isEditPlayerMode={gameStore.isEditPlayerMode} handleTapEvent={this.handleTapEvent} />

        <ShowSelectSubs isEditPlayerMode={gameStore.isEditPlayerMode} />

        <ShowTrackingPlayers 
          isEditPlayerMode={gameStore.isEditPlayerMode} 
          trackingList={gameStore.getTrackingList()}
          handleTapPlayer={this.handleTapPlayer}
          />

      </Grid>
    )
  }
}

/* Event Log Container */

function ShowEventsLog(props) {
  const {gameEvents, isEditPlayerMode} = props;
  if (isEditPlayerMode) {
    return (
      <div></div>
    );
  }
  return (
    <Row>
      <Col xs={12} md={6} mdOffset={3}>
        <div className="eventsLog">
          {
            gameEvents.map(event =>
              <EventBox event={event} key={event.sequence} />
            )
          }
        </div>
      </Col>
    </Row>
  );
}

function EventBox(props) {

  const {event} = props;

  const glyphClass = (event.player.gender === "Male" ? "event-male" : "event-female");

  return (
    <div className="eventBox">
      <Glyphicon className={glyphClass} glyph="user" />{event.player.nickname}<br />{event.eventType}
    </div>
  );
}

/* Event Buttons */

function ShowEventButtons(props) {
  const {isEditPlayerMode, handleTapEvent} = props;
  if (isEditPlayerMode) {
    return (
      <div></div>
    );
  }
  return(
    <Row>
      <Col xs={2} md={1} mdOffset={3} className="eventButtonContainer">
          <Button onClick={() => handleTapEvent('Goal')} block bsSize="small" bsStyle={null} className="btn-event">Goal</Button>
      </Col>
      <Col xs={2} md={1} className="eventButtonContainer">
          <Button block bsSize="small" bsStyle={null} className="btn-event">Drop</Button>
      </Col>    
      <Col xs={2} md={1} className="eventButtonContainer">
          <Button block bsSize="small" bsStyle={null} className="btn-event">TA</Button>
      </Col>    
      <Col xs={2} md={1} className="eventButtonContainer">
          <Button block bsSize="small" bsStyle={null} className="btn-event">D</Button>
      </Col>    
      <Col xs={2} md={1} className="eventButtonContainer">
          <Button block bsSize="small" bsStyle={null} className="btn-event">Undo</Button>
      </Col>    
    </Row>
  );
}

/* Select Subs */

function ShowSelectSubs(props) {
  const {isEditPlayerMode} = props;
  if (!isEditPlayerMode) {
    return (
      <div></div>
    );
  }
  return (
    <Row>
      <Col xs={12} md={6} mdOffset={3} className="text-center">
        <SelectSub />
      </Col>
    </Row>
  );
}

/* Tracking Players */

function ShowTrackingPlayers(props) {
  const {isEditPlayerMode, handleTapPlayer, trackingList } = props;

  return (
    <Row>
      <Col xs={12} md={6} mdOffset={3}>
        <div className="masonry2">
          {
            trackingList.map(player =>
              <div key={player.id} className="item">
                <PlayerButton 
                  player={player}
                  onTapPlayer={handleTapPlayer}
                  isEditPlayerMode={isEditPlayerMode}
                  />
              </div>
            )
          }
        </div>
      </Col>
      
    </Row>
  );
}

function PlayerButton(props) {

  const {player, onTapPlayer, isEditPlayerMode} = props;

  const disabled = ((player.id==='38135' || player.id==='38869') ? true : false);
  const buttonClass = (isEditPlayerMode ? 
                        "btn-edit btn-text":
                        (player.gender === "Male" ? "btn-male btn-text" : "btn-female btn-text"));

  return (
  
    <Button 
      bsStyle={null}
      className={buttonClass}
      bsSize="small" 
      block
      disabled={disabled}
      onClick={() => onTapPlayer(player.id)}
    >
        {player.nickname}
    </Button>

  );
}

export default GameView;

/*
<Col xs={4} md={2}>
            <div className="masonry1">
              <div className="item">
                <Button block bsSize="small" bsStyle={null} className="btn-event">Goal</Button>
              </div>
              <div className="item">
                <Button block bsSize="small" bsStyle={null} className="btn-event">Drop</Button>
              </div>
              <div className="item">
                <Button block bsSize="small" bsStyle={null} className="btn-event">TA</Button>
              </div>
              <div className="item">
                <Button block bsSize="small" bsStyle={null} className="btn-event">D</Button>
              </div>
              <div className="item">
                <Button block bsSize="small" bsStyle={null} className="btn-event">Undo</Button>
              </div>
              <div className="item">
                <Button block bsSize="small" bsStyle={null} className="btn-event">+</Button>
              </div>
              <div className="item">
                <Button block bsSize="small" bsStyle={null} className="btn-event">-</Button>
              </div>
            </div>
          </Col>
          */