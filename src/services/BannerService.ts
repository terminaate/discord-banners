import { $api, SERVER_URL } from '@/http';

export class BannerService {
  static async getBannerImage(userId?: string | null) {
    if (!userId) {
      return null;
    }

    try {
      await $api.get(`/widget/${userId}.png`);
      return `${SERVER_URL}/widget/${userId}.png`;
    } catch (e) {
      return null;
    }
  }
}
