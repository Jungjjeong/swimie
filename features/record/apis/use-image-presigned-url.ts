import { useMutation } from '@tanstack/react-query';

import { ImagePresignedResponse } from './dto';

async function imagePresignedUrl(
  imageNames: string[],
): Promise<ImagePresignedResponse> {
  const res = await fetch(`/api/image/presigned`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageNames }),
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useImagePresignedUrl() {
  return useMutation({
    mutationFn: imagePresignedUrl,
  });
}
