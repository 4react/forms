import { action } from '@storybook/addon-actions'

/**
 * This method is a shorthand for creating an event handler.
 * When the event is fired, an entry is logged in the "Action" Storybook tab.
 * @param {string} actionName The name of the associated event.
 */
const on = (actionName) => (...params) => action(actionName)(...params)

export default on
