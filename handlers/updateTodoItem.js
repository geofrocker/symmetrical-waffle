const AWS = require('aws-sdk')
const { v4: uuidv4 } = require("uuid")

const client = new AWS.DynamoDB.DocumentClient()

module.exports.run = async event => {
  const data = JSON.parse(event.body)
  const params = {
    TableName: "todos",
    Key: {
      id: event.pathParameters.id
    },
    ExpressionAttributeValues: {
      ':completed': data.completed
    },
    UpdateExpression: 'SET completed=:completed',
    ReturnValues: 'UPDATED_NEW'
  }

  try {
    await client.update(params).promise()
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Item updated", data }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occured", error: e }),
    };
  }
};
