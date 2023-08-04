export interface JiraIssue {
    id: number;
    key: string;
    typeId: string;
    epicId: string;
    summary: string;
    priorityId: string;
    estimateStatistic: {
        statFieldId: string;
        statFieldValue: {
            value: number;
            text: string;
        } | any;
    };
    statusId: string;
}
