import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { NotificationElementProps } from '@/features/notification';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cursorCreatedAt = searchParams.get('cursorCreatedAt');
  const cursorCreatedAtQuery = cursorCreatedAt
    ? `?cursorCreatedAt=${cursorCreatedAt}`
    : '';
  const data = await fetchData<NotificationElementProps[]>(
    `/notification${cursorCreatedAtQuery}`,
    'GET',
  );

  return NextResponse.json(data);
}