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
    await client.delete(params).promise()
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Delete TodItem succeeded" }),
    }
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Unable to delete item.", error: err }),
    }
  }
};


