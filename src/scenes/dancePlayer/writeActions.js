// import ActiveDancerPlayerSence from './ActiveDancerPlayerSence'

const doActions = () => {

  var actionsList = []
  // var game;
  const writeActions = function() {
    let actionName = arguments[0];
    for (const string of arguments[1]) {
      actionName = actionName + " " + string
    }
    actionsList.push(actionName)

  }

  const jump = function(){writeActions("jump", arguments)}
  const swing =  function(){writeActions("swing", arguments)};
  const cartwheel =  function(){writeActions("cartwheel", arguments)};
  const stomp =  function(){writeActions("stomp", arguments)};
  const wiggle =  function(){writeActions("wiggle", arguments)};
  const shrink =  function(){writeActions("shrink", arguments)};
  const slide =  function(){writeActions("slide", arguments)};
  const turn = function(){writeActions("turn", arguments)};

  const getActionsList = function(){return actionsList }
  const restartList = function(){actionsList = []}



  return {
  jump,
  swing,
  cartwheel,
  stomp,
  wiggle,
  shrink,
  slide,
  turn,
  getActionsList,
  restartList,
  };

}
module.exports = doActions();
