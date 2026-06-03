import api from './api';

const DriveService = {
    // Get paginated drives using the new enterprise backend endpoint
    getPagedDrives: async (page = 0, size = 10) => {
        const response = await api.get(`/drives/paged?page=${page}&size=${size}`);
        return response.data;
    },

    // Legacy unpaginated drives (deprecated)
    getAllDrives: async () => {
        const response = await api.get('/drives');
        return response.data;
    },

    // Get specific drive by ID
    getDriveById: async (driveId) => {
        const response = await api.get(`/drives/${driveId}`);
        return response.data;
    },

    // Get AI Skill Gap Analysis for a drive
    getSkillGapAnalysis: async (driveId) => {
        const response = await api.get(`/ai/skill-gap?driveId=${driveId}`);
        return response.data;
    }
};

export default DriveService;
