export interface JiraResponseEntityData {
    statuses: Record<string, JiraResponseEntityDataStatus>;
    priorities: Record<string, JiraResponseEntityDataPriorities>;
    types: Record<string, JiraResponseEntityDataTypes>;
    epics: Record<string, JiraResponseEntityDataEpics>;
}

interface JiraResponseEntityDataStatus {
    statusUrl: string;
    statusName: string;
    status: {
        id: number;
        name: string;
        description: string;
        iconUrl: string;
        statusCategory: {
            id: string;
            key: string;
            colorName: string;
        };
    };
}

interface JiraResponseEntityDataPriorities {
    priorityName: string;
    priorityUrl: string;
}

interface JiraResponseEntityDataTypes {
    typeUrl: string;
    typeName: string;
}

interface JiraResponseEntityDataEpics {
    epicField: {
        id: string;
        label: string;
        editable: boolean;
        renderer: string;
        epicKey: string;
        epicColor: string;
        text: string;
    };
};
