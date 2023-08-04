import { JiraIssue } from "../models/jira/jira-issue.model";
import { JiraResponse } from "../models/jira/jira-response.model";

export class JiraDataAdapter {
    public static getSprintIssues(jiraData: Partial<JiraResponse>, sprintName: string): JiraIssue[] {
        let issuesIds = jiraData.sprints.find((sprint) => sprint.name === sprintName)?.issuesIds;
        const issues = issuesIds?.map((issueId) => jiraData.issues?.find((issue) => issue.id === issueId));
        return issues?.map((issue) => {
            return {
                id: issue.id,
                key: issue.key,
                typeId: issue.typeId,
                epicId: issue.epicId,
                summary: issue.summary,
                priorityId: issue.priorityId,
                estimateStatistic: issue.estimateStatistic,
                statusId: issue.statusId,
            }
        });
    }
    // TODO: in future need adapter for entity data
}

// TODO: to delete
// const path = require('path');
// const fs = require('fs');
// const bufferData = fs.readFileSync(path.join(__dirname, "../../jira.json"));
// const data = JSON.parse(bufferData.toString());

// console.warn(JiraDataAdapter.getSprintIssues(data, 'Sprint 23'));
