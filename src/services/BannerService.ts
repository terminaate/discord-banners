import { $api, SERVER_URL } from '@/http';

export class BannerService {
  static getBannerURL(userId: string): string {
    return `${SERVER_URL}/banner/${userId}`;
  }

  static async getBannerImage(
    userId?: string | null,
    searchParams?: URLSearchParams,
  ) {
    if (!userId) {
      return null;
    }

    try {
      const { data } = await $api.get(`/banner/${userId}`, {
        params: searchParams,
      });
      return data;
    } catch (e) {
      return null;
    }
  }
}
