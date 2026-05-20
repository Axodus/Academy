import { api } from "../../../services/api";

export const academyApi = {
  async getMe() {
    const { data } = await api.get("/academy/me");
    return data;
  },

  async getEnrolledCourses() {
    const { data } = await api.get("/academy/courses/enrolled");
    return data;
  },

  async getCourseProgress(courseId: string) {
    const { data } = await api.get(`/academy/courses/${courseId}/progress`);
    return data;
  },

  async completeLesson(courseId: string, lessonId: string) {
    const { data } = await api.post(`/academy/courses/${courseId}/lessons/${lessonId}/complete`);
    return data;
  },

  async submitQuizAttempt(courseId: string, quizId: string, score: number) {
    const { data } = await api.post(`/academy/courses/${courseId}/quizzes/${quizId}/attempts`, { score });
    return data;
  },

  async getRewardGates(courseId: string) {
    const { data } = await api.get(`/academy/courses/${courseId}/reward-gates`);
    return data;
  }
};
