export interface JiraResponseIssue {
    id: number;
    key: string;
    hidden: boolean;
    done: boolean;
    typeId: string;
    epicId: string;
    summary: string;
    epic: string;
    priorityId: string;
    assignee: string;
    assigneeName: string;
    avatarUrl: string;
    hasCustomUserAvatar: boolean;
    estimateStatisticRequired: boolean;
    estimateStatistic: {
        statFieldId: string;
        statFieldValue: {
            value: number;
            text: string;
        } | any;
    };
    statusId: string;
    fixVersions: number[];
    projectId: number;
}
