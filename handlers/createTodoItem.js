const AWS = require('aws-sdk')
const { v4: uuidv4 } = require("uuid")

const client = new AWS.DynamoDB.DocumentClient()

module.exports.run = async event => {
  const data = JSON.parse(event.body)
  const params = {
    TableName: "todos",
    Item: {
      id: uuidv4(),
      title: data.title,
      completed: false
    }
  }

  try {
    await client.put(params).promise()
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occured", error: e }),
    };
  }
};
