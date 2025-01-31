var connection = require('./db');

function getQuestions(ids, result) {
    const sql = 'SELECT Questions.QuestionID, Questions.Question, Tags.Tag FROM Questions ' +
        'INNER JOIN TagsOfQues ON TagsOfQues.QuestionID = Questions.QuestionID ' +
        'INNER JOIN Tags ON TagsOfQues.TagID = Tags.TagID WHERE TagsOfQues.TagID IN (?)';
    connection.query(sql, [ids], function (err, questions) {
        result(err, questions);
    });
}

function addQuestionToDB(question, result) {
    const sql = 'INSERT INTO Questions (Question) VALUES (?)';
    connection.query(sql, [question], function (err, res) {
        result(err, res);
    });
}

function addTagsOfQuestionsToDB(questionID, tagID, result) {
    const sql = 'INSERT INTO TagsOfQues (QuestionID, TagID) VALUES (?, ?)';
    connection.query(sql, [questionID, tagID], function (err, res) {
        result(err);
    });
}

function findQuestion(questionID, result) {
    const sql = 'SELECT Questions.Question, Tags.Tag FROM Questions ' +
        'INNER JOIN TagsOfQues ON TagsOfQues.QuestionID = Questions.QuestionID ' +
        'INNER JOIN Tags ON TagsOfQues.TagID = Tags.TagID WHERE Questions.QuestionID = ?';
    connection.query(sql, questionID, function (err, question) {
        result(err, question);
    });
}

module.exports = { getQuestions, addQuestionToDB, addTagsOfQuestionsToDB, findQuestion };
