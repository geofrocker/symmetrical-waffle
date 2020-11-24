const AWS = require('aws-sdk')

const client = new AWS.DynamoDB.DocumentClient()
module.exports.run = async event => {
  const params = {
    TableName: "todos",
  }
  try {
    const result = await client.scan(params).promise()
    return {
      statusCode: 200,
      body: JSON.stringify({ data: result.Items }),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occured", error: e }),
    }
  }
};


