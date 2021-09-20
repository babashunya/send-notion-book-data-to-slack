if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_AUTH_TOKEN });

const getFromNotionAPI = async () => {
  const databaseId = '69dbbf602a104dd5933bad4b6ad3c46b';
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'レビュー',
          select: { equals: '☆☆☆' },
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
    ],
    page_size: 2
  })
  console.log(response);
  // console.log(response.properties.Name);

  // ランダムで1件取得。return
  // とりあえずランダムで全権取得、ランダムで数字割り当て、送信する
};


const main = async () => {
  await getFromNotionAPI();
};

main();
