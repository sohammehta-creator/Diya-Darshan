interface FeedbackData {
    rating: number;
    comments: string;
}

/**
 * Simulates submitting feedback to a backend server.
 * In a real-world application, this would use `fetch` to POST the data
 * to an API endpoint, which would then save it to a database (e.g., a 'feedback' table in Supabase).
 */
export const submitFeedback = (data: FeedbackData): Promise<{ success: true }> => {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            console.log("--- MOCK API CALL ---");
            console.log("Feedback Submitted:", data);
            console.log("In a real app, this data would be sent to a server.");
            console.log("--------------------");
            resolve({ success: true });
        }, 500);
    });
};
