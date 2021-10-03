# send-notion-book-data-to-slack

Send my read book data to my slack channel using Notion API.

## Overview

- Create funciton in AWS lambda (using Node.js, Notion API and incoming webhook)
https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/nodejs-handler.html
- Run lambda function everyday using AWS cloudwach events
https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/events/RunLambdaSchedule.html

## Reference

Notion API

https://developers.notion.com/

チュートリアル: CloudWatch Events を使用して AWS Lambda 関数をスケジュールする
https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/events/RunLambdaSchedule.html