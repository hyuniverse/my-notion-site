import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// 공식 SDK 클라이언트 (데이터베이스 목록 쿼리용)
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 비공식 클라이언트 (상세 페이지의 복잡한 블록 데이터 가져오기용)
export const notionRender = new NotionAPI();

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

/**
 * 노션 데이터베이스에서 글 목록을 가져오는 함수
 */
export async function getPosts(): Promise<BlogPost[]> {
  const databaseId = process.env.NOTION_DATABASE_ID;
  
  if (!databaseId) {
    console.log('[v0] NOTION_DATABASE_ID is not set, returning mock data');
    return getMockPosts();
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page) => {
      const pageObj = page as PageObjectResponse;
      const properties = pageObj.properties;

      // Extract title
      let title = 'Untitled';
      if ('Title' in properties && properties.Title.type === 'title') {
        title = properties.Title.title.map((t) => t.plain_text).join('') || 'Untitled';
      } else if ('Name' in properties && properties.Name.type === 'title') {
        title = properties.Name.title.map((t) => t.plain_text).join('') || 'Untitled';
      }

      // Extract date
      let date = new Date().toISOString().split('T')[0];
      if ('Date' in properties && properties.Date.type === 'date' && properties.Date.date) {
        date = properties.Date.date.start;
      }

      // Extract description
      let description: string | undefined;
      if ('Description' in properties && properties.Description.type === 'rich_text') {
        description = properties.Description.rich_text.map((t) => t.plain_text).join('');
      }

      // Extract tags
      let tags: string[] | undefined;
      if ('Tags' in properties && properties.Tags.type === 'multi_select') {
        tags = properties.Tags.multi_select.map((t) => t.name);
      }

      return {
        id: pageObj.id,
        title,
        date,
        description,
        tags,
      };
    });
  } catch (error) {
    console.error('[v0] Error fetching posts from Notion:', error);
    return getMockPosts();
  }
}

/**
 * Mock data for when Notion is not configured
 */
function getMockPosts(): BlogPost[] {
  return [
    {
      id: 'mock-1',
      title: 'Building Interactive Web Experiences',
      date: '2025-01-30',
      description: 'Exploring modern techniques for creating engaging user interfaces.',
      tags: ['React', 'Animation'],
    },
    {
      id: 'mock-2',
      title: 'The Art of Clean Code',
      date: '2025-01-25',
      description: 'Principles and practices for writing maintainable code.',
      tags: ['TypeScript', 'Best Practices'],
    },
    {
      id: 'mock-3',
      title: 'Next.js App Router Deep Dive',
      date: '2025-01-20',
      description: 'Understanding server components and the new routing paradigm.',
      tags: ['Next.js'],
    },
  ];
}

/**
 * 특정 페이지의 상세 내용을 가져오는 함수
 */
export async function getPostPage(pageId: string) {
  return await notionRender.getPage(pageId);
}

/**
 * 특정 페이지의 메타 정보를 가져오는 함수
 */
export async function getPostMeta(pageId: string): Promise<BlogPost | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId }) as PageObjectResponse;
    const properties = page.properties;

    let title = 'Untitled';
    if ('Title' in properties && properties.Title.type === 'title') {
      title = properties.Title.title.map((t) => t.plain_text).join('') || 'Untitled';
    } else if ('Name' in properties && properties.Name.type === 'title') {
      title = properties.Name.title.map((t) => t.plain_text).join('') || 'Untitled';
    }

    let date = new Date().toISOString().split('T')[0];
    if ('Date' in properties && properties.Date.type === 'date' && properties.Date.date) {
      date = properties.Date.date.start;
    }

    let description: string | undefined;
    if ('Description' in properties && properties.Description.type === 'rich_text') {
      description = properties.Description.rich_text.map((t) => t.plain_text).join('');
    }

    let tags: string[] | undefined;
    if ('Tags' in properties && properties.Tags.type === 'multi_select') {
      tags = properties.Tags.multi_select.map((t) => t.name);
    }

    return { id: page.id, title, date, description, tags };
  } catch (error) {
    console.error('[v0] Error fetching post meta:', error);
    return null;
  }
}
