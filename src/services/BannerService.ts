import { $api, SERVER_URL } from '@/http';

export class BannerService {
  static getBannerURL(userId: string): string {
    return `${SERVER_URL}/widget/${userId}`;
  }

  static async getBannerImage(userId?: string | null) {
    if (!userId) {
      return null;
    }

    try {
      const { data } = await $api.get(`/banner/${userId}`);
      return data;
    } catch (e) {
      return null;
    }
  }
}
