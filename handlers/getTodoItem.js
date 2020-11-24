const AWS = require('aws-sdk')

const client = new AWS.DynamoDB.DocumentClient()
module.exports.run = async event => {
  const params = {
    TableName: "todos",
    Key: {
      id: event.pathParameters.id
    }
  }
  try {
    const result = await client.get(params).promise()
    if (result.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      }
    }
  }
  catch (e) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Todo item Not found" }),
    }

  }
}