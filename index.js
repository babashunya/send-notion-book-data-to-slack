if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { Client } = require('@notionhq/client');
const _ = require('underscore');
const { IncomingWebhook } = require("@slack/webhook");

const notion = new Client({ auth: process.env.NOTION_AUTH_TOKEN });
const webhook = new IncomingWebhook(process.env.RSS_NOTIFICATION_WEBHOOK_URL);

const sendSlack = async (str) => {
  await webhook.send({
    text: str,
    unfurl_links: true
  });
};

const getFromNotionAPI = async () => {
  const databaseId = '69dbbf602a104dd5933bad4b6ad3c46b';
  let str = '';
  for (let count = 1; count <= 5; count++) {
    const star = '☆'
    let review = '';
    for(let i = 0; i < count; i++) {
      review = `${review}${star}`;
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'レビュー',
            select: { equals: review },
          },
          {
            or: [
              {
                property: 'status',
                select: { does_not_equal: 'not yet' },
              },
              {
                property: 'status',
                select: { does_not_equal: 'stop' },
              },
              {
                property: 'status',
                select: { does_not_equal: 'waiting amazon unlimited' },
              },
              {
                property: 'status',
                select: { does_not_equal: 'prioritized' },
              },
              {
                property: 'status',
                select: { does_not_equal: 'in progress' },
              },
            ],
          },
        ],
      },
      sorts: [
        {
          property: 'レビュー',
          direction: 'descending',
        },
      ]
    })
    const results = response.results;
    const length = results.length;
    
    str = `${str}${review}\n`;
    if(length > 0) {
      const url = _.sample(results, 1)[0].url;
      str = `${str}${url}\n`;
      str = `${str}合計：${length}冊`;
      if (length >= 100) {
        str = `${str}以上`;
      }
      str = `${str}\n\n`;
    } else {
      str = `${str}データ無し\n\n`;
    }
  }

  await sendSlack(str);
};


const main = async () => {
  await getFromNotionAPI();
};

main();
