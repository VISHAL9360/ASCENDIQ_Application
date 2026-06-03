import api from './api';

const AIService = {
    generateInterviewQuestions: async (role = 'Software Developer') => {
        const response = await api.get(`/ai/interview/generate?role=${encodeURIComponent(role)}`);
        return typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    },

    evaluateAnswer: async (question, answer) => {
        const response = await api.post('/ai/interview/evaluate', { question, answer });
        return typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    },

    getCareerInsights: async () => {
        const response = await api.get('/ai/career-insights');
        return typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    }
};

export default AIService;
