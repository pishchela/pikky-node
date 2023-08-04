export interface JiraResponseSprints {
    id: number;
    sequence: number;
    name: string;
    state: string;
    goal: string;
    autoStartStop: boolean;
    startDate: string;
    endDate: string;
    activatedDate: string;
    completeDate: string;
    canUpdateSprint: boolean;
    canStartStopSprint: boolean;
    canUpdateDates: boolean;
    remoteLinks: any[];
    daysRemaining: number;
    timeRemaining: {
        text: string;
        isFuture: boolean;
    };
    issuesIds: number[];
}
