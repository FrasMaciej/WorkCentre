export { }

declare global {
    interface NotificationsDto {
        title: string;
        type: string;
        content: string;
        timestamp: Date;
        _id?: string;
    }

    interface AddNotificationDto {
        title: string;
        type: 'message' | 'applied-for-offer' | 'application-status-changed' | 'new-applicant';
        content: string;
        receiverId: string;
        sender: string;
    }
}