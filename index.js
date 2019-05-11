exports.handler = async ({ params: { text } }) => {
  const commands = {
    // Usage: `/slashcommand hello` will call the `hello` function here
    hello() {
      // See https://api.slack.com/docs/outmoded-messaging for message details
      return {
        text: 'Hello to you too'
      };
    }
  };

  // see if this command actually exists
  // and error if necessary
  if (typeof commands[text] !== 'function') {
    return {
      response_type: 'ephemeral',
      text: `Error: "${text}" was not in the list of commands. We support the following commands:`,
      attachments: Object.keys(commands).map((text) => ({ color: 'warning', text }))
    };
  }

  // call the function and return the message
  return commands[text]();
};
