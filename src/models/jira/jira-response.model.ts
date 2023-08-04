import { JiraResponseIssue } from "./jira-response-issue.model";
import { JiraResponseSprints } from "./jira-response-sprints.model";
import { JiraResponseEntityData } from "./jira-response-entity-data.model";

export interface JiraResponse {
    issues: JiraResponseIssue[];
    entityData: JiraResponseEntityData;
    sprints: JiraResponseSprints[];
}
