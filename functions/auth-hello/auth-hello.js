exports.handler = async (event, context) => {
  if (context.clientContext) {
    const { user } = context.clientContext
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: "auth-hello: " + Math.round(Math.random() * 10),
        user,
      }),
    }
  } else {
    console.log(`
    Note that netlify-lambda only locally emulates Netlify Functions, 
    while netlify-identity-widget interacts with a real Netlify Identity instance. 
    This means that netlify-lambda doesn't support Netlify Functions + Netlify Identity integration.
    `)
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg:
          "auth-hello - no authentication detected. Note that netlify-lambda doesnt locally emulate Netlify Identity.",
      }),
    }
  }
}
