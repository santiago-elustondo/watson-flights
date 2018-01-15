import co from 'co'
import clone from 'clone'

const initialState = {
  history: [],
  nextNode: undefined
}

export function conversationStateReducer(state = initialState, action) {
  switch(action.type) {

    case '__CONV_HANDLED_MSG__':
      return {
        nextNode: action.nextNode,
        history: state.history.concat([
          {
            node: action.nodeName,
            supportingNodes: action.supportingNodes,
            backtrack: action.backtrack
          }
        ])
      }

    default:
      return state;

  }
}

function msgHandledAction({ nodeName, supportingNodes, nextNode, backtrack }){
  return {
    type: '__CONV_HANDLED_MSG__',
    ...{ nodeName, supportingNodes, nextNode, backtrack }
  }
}

export function conversationGraph({ start, nodes, fragments }){

  const parsedMsgBaseType = {
    entities: [],
    intents: [],
    input: {
      text: undefined
    }
  }

  const backtrackInstructionsBaseType = {
    fragment: x => x, // shouldnt be a function here. see other file for more
  }

  const applyBaseType = (object, baseType) => Object.assign({}, baseType, object)

  // this is the conversation graph object creator
  return ({ dispatch, getState }) => {

    const convState = () => getState()._conv_

    return {

      handleMsg(parsedMsg) {

        parsedMsg = applyBaseType(parsedMsg, parsedMsgBaseType)

        const getPromiseNode = (name) => {
          const node = nodes.find(n => n.name == name)
          if (!node) console.log(`node "${name}" not found`)
          return co.wrap(node)
        }

        const getWrappedFragment = (name) => {
          const fragment = fragments.find(f => f.name == name)
          if (!fragment) console.log(`fragment "${name}" not found`)
          return params => fragment({
            params,
            getState,
            getFragment: getWrappedFragment
          })
        }

        const supportingNodes = []
        const getAndRecordNode = (name) => {
          supportingNodes.push(name)
          return getPromiseNode(name)
        }

        const supportingFragments = []
        const getAndRecordFragment = (name) => {
          supportingFragments.push(name)
          return getWrappedFragment(name)
        }

        const nodeName = convState().nextNode || start || 'Start'
        const node = getPromiseNode(nodeName)

        const getArgs = (overrides = {}) => Object.assign({
          msg: parsedMsg,
          flags: [],
          getState,
          dispatch,
          emptyMsg: () => applyBaseType({}, parsedMsgBaseType),
          getNode: getAndRecordNode,
          getFragment: getAndRecordFragment,
        }, overrides)

        return node({ getArgs, ...getArgs() })
          .then(({ nextNode, backtrack }) => {

            dispatch(
              msgHandledAction({
                nodeName,
                supportingNodes,
                nextNode,
                backtrack: applyBaseType(backtrack, backtrackInstructionsBaseType)
              })
            )

          })

      }

    }

  }

}


// helpers -----

function _o(object, ...extensions){
  return Object.assign({}, object, ...extensions)
}
