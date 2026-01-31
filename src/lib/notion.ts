import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

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

export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  tags: string[];
  date: string;
}

/**
 * 노션 데이터베이스에서 프로젝트 목록을 가져오는 함수
 */
export async function getProjects(): Promise<Project[]> {
  const projectsDatabaseId = process.env.NOTION_PROJECTS_DATABASE_ID;
  
  console.log('[DEBUG] ========== PROJECTS FUNCTION CALLED ==========');
  console.log('[DEBUG] Projects Database ID:', projectsDatabaseId);
  
  if (!projectsDatabaseId) {
    console.log('[v0] NOTION_PROJECTS_DATABASE_ID is not set, returning mock data');
    return getMockProjects();
  }

  try {
    console.log('[DEBUG] Attempting to fetch projects from Notion...');
    const response = await notion.databases.query({
      database_id: projectsDatabaseId,
      // 임시로 필터 제거  
      // filter: {
      //   property: 'Status',
      //   select: {
      //     equals: 'Published',
      //   },
      // },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    console.log('[DEBUG] Projects API response:', {
      resultsCount: response.results.length,
      hasResults: response.results.length > 0,
      firstResult: response.results.length > 0 ? response.results[0] : null
    });

    return response.results.map((page: any) => {
      const properties = page.properties;

      // Extract title
      let title = 'Untitled';
      if (properties.Title?.title) {
        title = properties.Title.title.map((t: any) => t.plain_text).join('') || 'Untitled';
      } else if (properties.Name?.title) {
        title = properties.Name.title.map((t: any) => t.plain_text).join('') || 'Untitled';
      }

      // Extract description
      let description = '';
      if (properties.Description?.rich_text) {
        description = properties.Description.rich_text.map((t: any) => t.plain_text).join('');
      }

      // Extract link
      let link: string | undefined;
      if (properties.Link?.url) {
        link = properties.Link.url || undefined;
      }

      // Extract tags
      let tags: string[] = [];
      if (properties.Tags?.multi_select) {
        tags = properties.Tags.multi_select.map((t: any) => t.name);
      }

      // Extract date
      let date = new Date().toISOString().split('T')[0];
      if (properties.Date?.date?.start) {
        date = properties.Date.date.start;
      }

      return {
        id: page.id,
        title,
        description,
        link,
        tags,
        date,
      };
    });
  } catch (error) {
    console.error('[v0] Error fetching projects from Notion:', error);
    console.error('[DEBUG] Projects error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      databaseId: projectsDatabaseId,
    });
    return getMockProjects();
  }
}

/**
 * Mock projects for when Notion is not configured
 */
function getMockProjects(): Project[] {
  return [
    {
      id: 'project-1',
      title: 'Portfolio Website',
      description: 'Modern portfolio built with Next.js and Tailwind CSS',
      link: 'https://portfolio.example.com',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      date: '2025-01-15',
    },
    {
      id: 'project-2',
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      date: '2025-01-10',
    },
    {
      id: 'project-3',
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates',
      link: 'https://taskapp.example.com',
      tags: ['Vue.js', 'Express', 'Socket.io', 'MongoDB'],
      date: '2025-01-05',
    },
  ];
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
    // Debug: notion 객체 확인
    console.log('Notion client:', notion);
    console.log('Notion databases:', notion.databases);
    
    const response = await notion.databases.query({
      database_id: databaseId,
      // 임시로 필터 제거
      // filter: {
      //   property: 'Status',
      //   select: {
      //     equals: 'Published',
      //   },
      // },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    console.log('[DEBUG] Posts API response:', {
      resultsCount: response.results.length,
      hasResults: response.results.length > 0,
      firstResult: response.results.length > 0 ? {
        id: response.results[0].id,
        properties: Object.keys((response.results[0] as any).properties || {})
      } : null
    });

    return response.results.map((page: any) => {
      console.log('[DEBUG] Processing page:', { 
        id: page.id, 
        url: page.url,
        publicUrl: page.public_url,
        properties: Object.keys(page.properties || {})
      });
      const properties = page.properties;

      // Extract title
      let title = 'Untitled';
      if (properties.Title?.title) {
        title = properties.Title.title.map((t: any) => t.plain_text).join('') || 'Untitled';
      } else if (properties.Name?.title) {
        title = properties.Name.title.map((t: any) => t.plain_text).join('') || 'Untitled';
      }

      // Extract date
      let date = new Date().toISOString().split('T')[0];
      if (properties.Date?.date?.start) {
        date = properties.Date.date.start;
      }

      // Extract description
      let description: string | undefined;
      if (properties.Description?.rich_text) {
        description = properties.Description.rich_text.map((t: any) => t.plain_text).join('');
      }

      // Extract tags
      let tags: string[] | undefined;
      if (properties.Tags?.multi_select) {
        tags = properties.Tags.multi_select.map((t: any) => t.name);
      }

      return {
        id: page.id,
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
 * Notion URL에서 실제 페이지 ID를 추출하는 함수
 */
/**
 * 특정 페이지의 상세 내용을 가져오는 함수
 */
export async function getPostPage(pageId: string) {
  console.log('[DEBUG] getPostPage called with pageId:', pageId);
  
  // Mock 데이터인 경우 에러 방지
  if (pageId.startsWith('mock-')) {
    console.log('[DEBUG] Mock data detected, throwing error');
    throw new Error(`invalid notion pageId "${pageId}"`);
  }
  
  try {
    console.log('[DEBUG] Fetching page content using notionRender.getPage...');
    
    // notion-client의 getPage로 페이지 내용 가져오기
    // 이 방법이 페이지의 실제 블록 콘텐츠를 가져오는 올바른 방법
    const result = await notionRender.getPage(pageId);
    console.log('[DEBUG] Successfully fetched page content');
    return result;
  } catch (error) {
    console.error('[DEBUG] Error fetching page content:', error);
    throw error;
  }
}

/**
 * 특정 프로젝트 페이지의 상세 내용을 가져오는 함수
 */
export async function getProjectPage(pageId: string) {
  console.log('[DEBUG] getProjectPage called with pageId:', pageId);
  
  // Mock 데이터인 경우 에러 방지  
  if (pageId.startsWith('project-')) {
    console.log('[DEBUG] Mock project data detected, throwing error');
    throw new Error(`invalid notion pageId "${pageId}"`);
  }
  
  try {
    console.log('[DEBUG] Fetching project page content using notionRender.getPage...');
    
    // notion-client의 getPage로 페이지 내용 가져오기
    const result = await notionRender.getPage(pageId);
    console.log('[DEBUG] Successfully fetched project page content');
    return result;
  } catch (error) {
    console.error('[DEBUG] Error fetching project page content:', error);
    throw error;
  }
}

/**
 * 특정 페이지의 메타 정보를 가져오는 함수
 */
export async function getPostMeta(pageId: string): Promise<BlogPost | null> {
  console.log('[DEBUG] getPostMeta called with pageId:', pageId);
  
  // Mock 데이터인 경우 mock 메타 정보 반환
  if (pageId.startsWith('mock-')) {
    console.log('[DEBUG] Returning mock meta data');
    const mockPosts = getMockPosts();
    return mockPosts.find(post => post.id === pageId) || null;
  }

  try {
    console.log('[DEBUG] Fetching page meta from Notion API...');
    const page = await notion.pages.retrieve({ page_id: pageId }) as any;
    const properties = page.properties;

    let title = 'Untitled';
    if (properties.Title?.title) {
      title = properties.Title.title.map((t: any) => t.plain_text).join('') || 'Untitled';
    } else if (properties.Name?.title) {
      title = properties.Name.title.map((t: any) => t.plain_text).join('') || 'Untitled';
    }

    let date = new Date().toISOString().split('T')[0];
    if (properties.Date?.date?.start) {
      date = properties.Date.date.start;
    }

    let description: string | undefined;
    if (properties.Description?.rich_text) {
      description = properties.Description.rich_text.map((t: any) => t.plain_text).join('');
    }

    let tags: string[] | undefined;
    if (properties.Tags?.multi_select) {
      tags = properties.Tags.multi_select.map((t: any) => t.name);
    }

    return { id: page.id, title, date, description, tags };
  } catch (error) {
    console.error('[v0] Error fetching post meta:', error);
    return null;
  }
}
