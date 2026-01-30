import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client'; // react-notion-x용 (상세 페이지용)

// 1. 공식 SDK 클라이언트 (데이터베이스 목록 쿼리용)
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 2. 비공식 클라이언트 (상세 페이지의 복잡한 블록 데이터 가져오기용)
// react-notion-x를 쓸 때 훨씬 빠르고 레이아웃 유지가 잘 됩니다.
export const notionRender = new NotionAPI();

/**
 * 노션 데이터베이스에서 글 목록을 가져오는 함수
 */
export async function getPosts() {
  const dataSourceId = process.env.NOTION_DATABASE_ID!;
  
  // @notionhq/client에서는 dataSources.query를 사용
  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: 'Status', // 노션 DB에 'Status' 컬럼이 있다고 가정
      select: {
        equals: 'Published', // 'Published' 상태인 것만 가져오기
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending', // 최신순 정렬
      },
    ],
  });
  return response.results;
}

/**
 * 특정 페이지의 상세 내용을 가져오는 함수
 */
export async function getPostPage(pageId: string) {
  return await notionRender.getPage(pageId);
}